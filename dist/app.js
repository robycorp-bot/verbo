import {story, angels, namedAngels, difficult, sources, editorialNote} from './data/story.js';
import {createScene} from './scene.js';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
const safeURL = url => /^https:\/\//.test(url||'') ? escapeHTML(url) : '#';
let scene, chapter=0, transitioning=false, paused=false, angel='serafins', lastWheel=0;
let wordsData, gospelsData, dataPromise, readerTab='words', lastFocus;
let search='', theme='Todos os temas', book='Todos os livros', resultsPage=0;
let gospelBook=0, gospelChapter=1, highlightVerse=0;
let soundOn=false, audioContext, masterGain, oscillators=[];
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
const progress=$('#journey-progress');
const reader=$('#reader');
const titles=['Jesus<br><em>Cristo.</em>','O eterno<br>entrou <em>no tempo.</em>','À margem do mar,<br><em>um chamado.</em>','Palavras que<br><em>fazem viver.</em>','O amor foi<br><em>até o fim.</em>','A pedra não teve<br><em>a última palavra.</em>','Uma história<br><em>que continua.</em>','Além<br><em>do visível.</em>'];
const captions=['NO PRINCÍPIO ERA O VERBO','UMA LUZ SOBRE BELÉM','JUNTO AO MAR DA GALILEIA','ESPÍRITO E VIDA','O AMOR PERMANECE','POR QUE BUSCAM ENTRE OS MORTOS?','ATÉ O FIM DOS TEMPOS','SANTO, SANTO, SANTO'];
const captionRefs=['JOÃO 1:1','LUCAS 2:1–20','MARCOS 1:16–20','JOÃO 6:63','JOÃO 19:30','LUCAS 24:5–6','MATEUS 28:20','ISAÍAS 6:3'];

story.forEach((item,index)=>{
  const b=document.createElement('button');b.className='progress-step';b.setAttribute('aria-label',`${index+1}. ${item.label}`);b.title=item.label;b.addEventListener('click',()=>go(index));progress.append(b);
  const m=document.createElement('button');m.className='chapter-option';m.innerHTML=`<small>${String(index+1).padStart(2,'0')}</small><span>${escapeHTML(item.label)}</span><em>↗</em>`;m.addEventListener('click',()=>{closeMenu();go(index)});$('#menu-list').append(m);
});
angels.forEach(item=>{
  const b=document.createElement('button');b.textContent=item.name;b.dataset.angel=item.id;b.addEventListener('click',()=>chooseAngel(item.id));$('.angel-tabs').append(b);
});

function renderChapter(){
  const item=story[chapter];document.body.dataset.chapter=chapter;
  $('#story-kicker').textContent=chapter===0?'O CAMINHO. A VERDADE. A VIDA.':item.kicker;
  $('#story-title').innerHTML=titles[chapter];
  $('#story-subtitle').innerHTML=chapter===0?'A Palavra que se fez carne.<br>Uma história que continua viva.':escapeHTML(item.subtitle);
  $('#chapter-body').innerHTML=chapter===0?'':item.body.map(p=>`<p>${escapeHTML(p)}</p>`).join('');
  $('#chapter-index').textContent=String(chapter+1).padStart(2,'0');
  $('#scene-caption').textContent=captions[chapter];$('#scene-reference').textContent=captionRefs[chapter];
  $('#scripture-quote').textContent=`“${item.scripture}”`;$('#scripture-ref').innerHTML=`${escapeHTML(item.reference.toUpperCase())} <span>↗</span>`;
  $('#primary-action>span').textContent=chapter===0?'Iniciar a jornada':chapter===3?'Explorar as palavras':chapter===7?'Ler as descrições':chapter===6?'Contemplar os céus':chapter===5?'A história continua':'Continuar a jornada';
  $('#secondary-action').innerHTML=chapter===0?'Conhecer suas palavras <span>→</span>':chapter===7?'Voltar ao princípio <span>↺</span>':'Ler nas Escrituras <span>↗</span>';
  $('#previous').disabled=chapter===0;$('#next').disabled=chapter===7;$('#next-hint').textContent=chapter===7?'O CÉU DECLARA A GLÓRIA':'AVANCE NA HISTÓRIA';
  $$('.progress-step').forEach((b,i)=>{b.classList.toggle('active',i===chapter);b.classList.toggle('visited',i<chapter);i===chapter?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current')});
  $$('.chapter-option').forEach((b,i)=>b.classList.toggle('active',i===chapter));
  $('#angel-controls').hidden=chapter!==7;
  if(chapter===7)chooseAngel(angel);
}
async function go(index,{immediate=false}={}){
  index=Math.max(0,Math.min(story.length-1,index));
  if((index===chapter&&!immediate)||transitioning)return;
  transitioning=true;
  if(!immediate){$('#story-content').classList.add('changing');await wait(motionQuery.matches?0:300)}
  chapter=index;scene?.setChapter(chapter);renderChapter();
  history.replaceState(null,'',`#${story[chapter].id}`);
  $('#chapter-announcement').textContent=`Capítulo ${chapter+1} de 8. ${story[chapter].title}`;
  requestAnimationFrame(()=>$('#story-content').classList.remove('changing'));
  await wait(motionQuery.matches?0:700);transitioning=false;
}
function chooseAngel(id){
  angel=id;const a=angels.find(a=>a.id===id)||angels[0];
  $$('.angel-tabs button').forEach(b=>{b.classList.toggle('active',b.dataset.angel===id);b.setAttribute('aria-pressed',b.dataset.angel===id?'true':'false')});
  $('#angel-note').innerHTML=`${escapeHTML(a.appearance)} <span class="angel-ref">${escapeHTML(a.reference)}.</span> Interpretação artística.`;
  if(chapter===7){$('#story-subtitle').textContent=a.name;$('#chapter-body').innerHTML=`<p>${escapeHTML(a.description)}</p><p>${escapeHTML(a.limitation)}</p>`;$('#scene-caption').textContent=a.eyebrow;$('#scene-reference').textContent=a.reference.toUpperCase();scene?.setAngel(id)}
}
function openMenu(){lastFocus=document.activeElement;$('#chapter-menu').hidden=false;$('#menu-toggle').setAttribute('aria-expanded','true');$('#menu-close').focus()}
function closeMenu(){if($('#chapter-menu').hidden)return;$('#chapter-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');lastFocus?.focus()}
$('#menu-toggle').addEventListener('click',openMenu);$('#menu-close').addEventListener('click',closeMenu);
$('#home').addEventListener('click',()=>go(0));$('#previous').addEventListener('click',()=>go(chapter-1));$('#next').addEventListener('click',()=>go(chapter+1));
$('#words-link').addEventListener('click',()=>openReader('words'));$('#heavens-link').addEventListener('click',()=>go(7));
$('#primary-action').addEventListener('click',()=>chapter===3?openReader('words'):chapter===7?openReader('angels'):go(chapter+1));
$('#secondary-action').addEventListener('click',()=>chapter===0?openReader('words'):chapter===7?go(0):readStoryPassage());
$('#scripture-link').addEventListener('click',readStoryPassage);
document.addEventListener('keydown',e=>{
  if(reader.open)return;
  if(!$('#chapter-menu').hidden){if(e.key==='Escape')closeMenu();if(e.key==='Tab')trapFocus(e,$('#chapter-menu'));return}
  if(e.target.matches('input,select,textarea'))return;
  if(['ArrowRight','ArrowDown','PageDown'].includes(e.key)){e.preventDefault();go(chapter+1)}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(chapter-1)}
  if(e.key==='Home'){e.preventDefault();go(0)}
  if(e.key==='End'){e.preventDefault();go(7)}
});
window.addEventListener('wheel',e=>{
  if(reader.open||!$('#chapter-menu').hidden)return;
  if(Math.abs(e.deltaY)<25||Date.now()-lastWheel<1400)return;
  lastWheel=Date.now();go(chapter+(e.deltaY>0?1:-1));
},{passive:true});
let touchStart;
$('#experience').addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
$('#experience').addEventListener('touchend',e=>{
  if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy))go(chapter+(dx<0?1:-1));else if(Math.abs(dy)>80)go(chapter+(dy<0?1:-1));touchStart=null;
},{passive:true});
function trapFocus(e,container){const items=$$('button:not(:disabled),a[href],input,select',container).filter(x=>x.offsetParent!==null);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}

async function ensureData(){
  if(wordsData&&gospelsData)return;
  if(!dataPromise)dataPromise=Promise.all(['words','gospels'].map(n=>fetch(`./data/${n}.json`).then(r=>{if(!r.ok)throw Error('Não foi possível carregar o texto bíblico.');return r.json()}))).then(([w,g])=>{wordsData=w;gospelsData=g}).catch(err=>{dataPromise=null;throw err});
  await dataPromise;
}
async function openReader(tab='words'){
  if(!reader.open){lastFocus=document.activeElement;reader.showModal()}
  scene?.setPaused(true);readerTab=tab;
  $$('.reader-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===readerTab));
  $('#reader-title').textContent=tab==='gospels'?'Leia. Permaneça. Descubra.':tab==='difficult'?'Palavras que nos desafiam.':tab==='angels'?'Os céus nas Escrituras.':tab==='sources'?'Uma experiência com fundamento.':'Palavras que permanecem.';
  const view=$('#reader-view');view.scrollTop=0;
  if(tab==='difficult'){renderDifficult();return}if(tab==='sources'){renderSources();return}if(tab==='angels'){renderAngels();return}
  view.innerHTML='<p class="loading-state" role="status">Abrindo as Escrituras…</p>';
  try{await ensureData();if(!reader.open||readerTab!==tab)return;if(tab==='gospels')renderGospels();else renderWords()}
  catch(error){view.innerHTML=`<div class="reader-error">${escapeHTML(error.message)} <button class="reader-small-button" id="retry-data">Tentar novamente</button><p>Você também pode ler a <a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Bíblia Portuguesa Mundial na fonte ↗</a>.</p></div>`;$('#retry-data').addEventListener('click',()=>openReader(tab))}
}
$('#reader-close').addEventListener('click',()=>reader.close());reader.addEventListener('close',()=>{scene?.setPaused(paused||document.hidden);lastFocus?.focus()});
reader.addEventListener('click',e=>{if(e.target===reader){const r=reader.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)reader.close()}});
const angelTab=document.createElement('button');angelTab.dataset.tab='angels';angelTab.textContent='Seres celestiais';$('.reader-tabs').insertBefore(angelTab,$('[data-tab="sources"]'));
$$('.reader-tabs button').forEach(b=>b.addEventListener('click',()=>openReader(b.dataset.tab)));
function dataEntries(){return wordsData.entries||[]}
function entryTheme(e){return Array.isArray(e.theme)?e.theme.join(' · '):e.theme||e.category||'Ensinamentos'}
function renderWords(){
  const entries=dataEntries();const themes=[...new Set(entries.flatMap(e=>Array.isArray(e.theme)?e.theme:[entryTheme(e)]))].sort((a,b)=>a.localeCompare(b,'pt'));const books=[...new Set(entries.map(e=>e.book))];
  $('#reader-view').innerHTML=`<p class="reader-intro"><strong>612 partes. 12 temas. Uma Palavra que permanece.</strong> Explore os trechos identificados pela marcação de fala da Bíblia Portuguesa Mundial, organizados por assunto e livro. Leia a passagem ao redor para compreender cada encontro.</p><div class="filters"><label class="search-label">BUSCAR PALAVRA OU REFERÊNCIA<input id="word-search" type="search" placeholder="Amor, perdão, caminho…" value="${escapeHTML(search)}" autocomplete="off"></label><label>POR TEMA<select id="theme-filter"><option>Todos os temas</option>${themes.map(t=>`<option${theme===t?' selected':''}>${escapeHTML(t)}</option>`).join('')}</select></label><label>POR LIVRO<select id="book-filter"><option>Todos os livros</option>${books.map(b=>`<option${book===b?' selected':''}>${escapeHTML(b)}</option>`).join('')}</select></label></div><div id="word-results" aria-live="polite"></div>`;
  $('#word-search').addEventListener('input',e=>{search=e.target.value;resultsPage=0;renderWordResults()});$('#theme-filter').addEventListener('change',e=>{theme=e.target.value;resultsPage=0;renderWordResults()});$('#book-filter').addEventListener('change',e=>{book=e.target.value;resultsPage=0;renderWordResults()});renderWordResults();
}
function renderWordResults(){
  const query=normalize(search).trim();const filtered=dataEntries().filter(e=>(book==='Todos os livros'||e.book===book)&&(theme==='Todos os temas'||entryTheme(e).includes(theme))&&(!query||normalize([e.text,e.title,e.reference,e.book,entryTheme(e)].join(' ')).includes(query)));
  const size=24,totalPages=Math.max(1,Math.ceil(filtered.length/size));resultsPage=Math.max(0,Math.min(resultsPage,totalPages-1));const slice=filtered.slice(resultsPage*size,(resultsPage+1)*size);
  $('#word-results').innerHTML=`<p class="results-count">${filtered.length.toLocaleString('pt-BR')} trechos ${query||book!=='Todos os livros'||theme!=='Todos os temas'?'encontrados':'nas Escrituras'} · ${escapeHTML(wordsData.translation||'Bíblia Portuguesa Mundial')}</p>${slice.length?slice.map((e,i)=>`<article class="word-entry"><div class="word-reference">${escapeHTML(e.reference)}<span>${escapeHTML(entryTheme(e))}</span></div><div>${e.title&&e.title!==e.reference?`<h3>${escapeHTML(e.title)}</h3>`:''}<blockquote>${escapeHTML(e.text)}</blockquote>${e.context?`<p class="word-context">${escapeHTML(e.context)}</p>`:''}<button class="read-context" data-result="${i}">Ler no contexto <span>↗</span></button></div></article>`).join(''):'<p class="empty-state">Nenhum trecho encontrado. Experimente outra palavra ou remova um filtro.</p>'}<div class="pagination"><button id="words-prev"${resultsPage===0?' disabled':''}>← Anteriores</button><span>${resultsPage+1} / ${totalPages}</span><button id="words-next"${resultsPage>=totalPages-1?' disabled':''}>Próximos →</button></div>`;
  $$('[data-result]').forEach(b=>b.addEventListener('click',()=>readEntry(slice[Number(b.dataset.result)])));
  $('#words-prev').addEventListener('click',()=>{resultsPage--;renderWordResults();$('#reader-view').scrollTop=0});$('#words-next').addEventListener('click',()=>{resultsPage++;renderWordResults();$('#reader-view').scrollTop=0});
}
function bookName(b){return b.name||b.book||''}
async function readEntry(e){
  const idx=gospelsData.books.findIndex(b=>normalize(bookName(b))===normalize(e.book));
  if(idx>=0){gospelBook=idx;gospelChapter=e.chapter||1;highlightVerse=e.start||e.verse||1;await openReader('gospels')}
  else{const ref=e.source||e.sourceUrl||e.url;$('#reader-view').innerHTML=`<div class="source-prose"><h3>${escapeHTML(e.reference)}</h3><p>${escapeHTML(e.text)}</p><p>Este trecho está fora dos quatro Evangelhos. Leia o capítulo completo na edição de referência.</p><a href="${safeURL(ref||wordsData.sourceUrl||'https://ebible.org/porbrbsl/')}" target="_blank" rel="noopener noreferrer">Abrir passagem na Bíblia Portuguesa Mundial ↗</a><p><button class="reader-small-button" id="back-words">← Voltar às palavras</button></p></div>`;$('#back-words').addEventListener('click',()=>openReader('words'))}
}
function chapterVerses(b,c){const ch=b.chapters[c-1];return Array.isArray(ch)?ch:ch?.verses||[]}
function renderGospels(){
  const books=gospelsData.books;if(!books[gospelBook])gospelBook=0;gospelChapter=Math.max(1,Math.min(gospelChapter,books[gospelBook].chapters.length));
  const b=books[gospelBook];
  $('#reader-view').innerHTML=`<p class="reader-intro">Os quatro Evangelhos, na íntegra. O texto inclui a narração, as falas de Jesus e as falas de outras pessoas. <strong>Bíblia Portuguesa Mundial · domínio público · tradução em revisão.</strong></p><div class="filters"><label>EVANGELHO<select id="gospel-book">${books.map((x,i)=>`<option value="${i}"${i===gospelBook?' selected':''}>${escapeHTML(bookName(x))}</option>`).join('')}</select></label><label>CAPÍTULO<select id="gospel-chapter">${b.chapters.map((_,i)=>`<option value="${i+1}"${i+1===gospelChapter?' selected':''}>Capítulo ${i+1}</option>`).join('')}</select></label></div><div class="gospel-heading"><h3>${escapeHTML(bookName(b))} ${gospelChapter}</h3><a class="reader-small-button" href="${safeURL(gospelURL(b,gospelChapter))}" target="_blank" rel="noopener noreferrer">Fonte ↗</a></div><div class="verses">${chapterVerses(b,gospelChapter).map((v,i)=>`<p class="verse${highlightVerse===i+1?' highlight':''}" id="verse-${i+1}"><sup>${i+1}</sup>${escapeHTML((typeof v==='string'?v:v.text)||gospelsData.verseNotes?.[`${b.code}:${gospelChapter}:${i+1}`]||'Texto não disponível nesta posição na edição de referência.')}</p>`).join('')}</div><div class="pagination"><button id="gospel-prev"${gospelBook===0&&gospelChapter===1?' disabled':''}>← Capítulo anterior</button><span>${escapeHTML(bookName(b))} ${gospelChapter}</span><button id="gospel-next"${gospelBook===books.length-1&&gospelChapter===b.chapters.length?' disabled':''}>Próximo capítulo →</button></div>`;
  $('#gospel-book').addEventListener('change',e=>{gospelBook=Number(e.target.value);gospelChapter=1;highlightVerse=0;renderGospels()});$('#gospel-chapter').addEventListener('change',e=>{gospelChapter=Number(e.target.value);highlightVerse=0;renderGospels()});
  $('#gospel-prev').addEventListener('click',()=>{if(gospelChapter>1)gospelChapter--;else{gospelBook--;gospelChapter=books[gospelBook].chapters.length}highlightVerse=0;renderGospels();$('#reader-view').scrollTop=0});
  $('#gospel-next').addEventListener('click',()=>{if(gospelChapter<b.chapters.length)gospelChapter++;else{gospelBook++;gospelChapter=1}highlightVerse=0;renderGospels();$('#reader-view').scrollTop=0});
  if(highlightVerse)requestAnimationFrame(()=>$('#verse-'+highlightVerse)?.scrollIntoView({block:'center'}));
}
function gospelURL(b,c){const codes={Mateus:'MAT',Marcos:'MRK',Lucas:'LUK','João':'JHN'};return `https://ebible.org/porbrbsl/${b.code||codes[bookName(b)]||'MAT'}${String(c).padStart(2,'0')}.htm`}
async function readStoryPassage(){
  const match=story[chapter].source.match(/(MAT|MRK|LUK|JHN)(\d+)\.htm(?:#V(\d+))?/);
  if(!match){await openReader(chapter===7?'angels':'sources');return}
  await ensureData().catch(()=>{});if(!gospelsData){openReader('gospels');return}
  const names={MAT:'Mateus',MRK:'Marcos',LUK:'Lucas',JHN:'João'};gospelBook=gospelsData.books.findIndex(b=>bookName(b)===names[match[1]]);gospelChapter=Number(match[2]);highlightVerse=Number(match[3]||1);openReader('gospels');
}
function renderDifficult(){
  $('#reader-view').innerHTML=`<p class="reader-intro">Algumas palavras consolam. Outras nos obrigam a parar. Os comentários abaixo oferecem contexto e leituras cristãs comuns; há diferenças de interpretação entre tradições. A passagem completa permanece como referência.</p>${difficult.map((d,i)=>`<article class="difficult-entry"><span>${String(i+1).padStart(2,'0')}</span><div><h3>${escapeHTML(d.title)}</h3><blockquote>“${escapeHTML(d.quote)}”</blockquote><small>${escapeHTML(d.reference)}</small><p>${escapeHTML(d.context)}</p><a class="read-context" href="${safeURL(d.source)}" target="_blank" rel="noopener noreferrer">Ler a passagem completa ↗</a></div></article>`).join('')}`;
}
function renderAngels(){
  $('#reader-view').innerHTML=`<p class="reader-intro"><strong>O que o texto descreve. O que a arte imagina.</strong> As representações em 3D interpretam visões bíblicas. Cor, escala, materiais, rostos e movimentos são escolhas artísticas; as passagens não fornecem modelos anatômicos completos.</p><div class="source-prose">${angels.map(a=>`<h3>${escapeHTML(a.name)}</h3><p>${escapeHTML(a.description)}</p><p><strong>Descrição bíblica:</strong> ${escapeHTML(a.appearance)}</p><p>${escapeHTML(a.limitation)}</p><a href="${safeURL(a.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(a.reference)} ↗</a>`).join('')}<h3>Anjos nomeados</h3>${namedAngels.map(a=>`<article><h3>${escapeHTML(a.name)} <span style="font-size:19px;color:#939f86">/ ${escapeHTML(a.title)}</span></h3><p>${escapeHTML(a.description)}</p><p>${escapeHTML(a.appearance)}</p><a href="${safeURL(a.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(a.reference)} ↗</a></article>`).join('')}<p>Gabriel e Miguel são os anjos nomeados aqui conforme os livros compartilhados entre as tradições cristãs. Rafael aparece no livro de Tobias, que integra as Bíblias católicas e ortodoxas; a composição do cânon varia entre tradições.</p></div>`;
}
function renderSources(){
  $('#reader-view').innerHTML=`<div class="source-prose"><p>${escapeHTML(editorialNote)}</p><h3>Quem foi. Quem é.</h3><p>A narrativa percorre a vida de Jesus apresentada nos Evangelhos e explica sua identidade e importância na fé cristã. Expressões sobre encarnação, salvação e ressurreição apresentam a confissão cristã e o testemunho dos textos bíblicos.</p><h3>As palavras registradas</h3><p>A biblioteca reúne todos os trechos identificados como falas de Jesus pelos marcadores editoriais de fala da Bíblia Portuguesa Mundial. Esses marcadores são uma escolha da edição, não existiam nos manuscritos antigos e podem incluir atribuições discutidas. As falas são agrupadas em partes temáticas, com livro, capítulo e versículos, preservando o texto disponível nessa edição. Os filtros de tema são classificações editoriais para exploração.</p><p>“Todas as palavras” significa as falas registradas e marcadas nesta edição das Escrituras. Não é uma alegação de que conhecemos tudo o que Jesus disse em sua vida. O próprio Evangelho de João reconhece que sua narrativa não registra tudo (João 21:25).</p><h3>Tradução e licença</h3><p>Bíblia Portuguesa Mundial (BPM), disponibilizada pelo eBible.org em domínio público. A tradução está em revisão; a edição e sua marcação editorial podem mudar. Os quatro Evangelhos foram incluídos na íntegra para a leitura em contexto.</p><h3>Referências</h3><ul>${sources.map(s=>`<li><a href="${safeURL(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.title)} ↗</a></li>`).join('')}</ul><h3>Uma experiência de contemplação</h3><p>As cenas são reconstruções artísticas em 3D: não pretendem reproduzir com precisão arqueológica os lugares ou oferecer retratos históricos. Use “Pausar movimento” para contemplar sem animação e o botão de som para escolher um ambiente instrumental suave.</p></div>`;
}

async function toggleSound(){
  try{
    if(!audioContext){audioContext=new(window.AudioContext||window.webkitAudioContext)();masterGain=audioContext.createGain();masterGain.gain.value=0;masterGain.connect(audioContext.destination);[130.8128,196,261.6256,329.6276].forEach((frequency,i)=>{const osc=audioContext.createOscillator();const gain=audioContext.createGain();osc.type='sine';osc.frequency.value=frequency;osc.detune.value=i%2?3:-3;gain.gain.value=[.22,.13,.1,.06][i];osc.connect(gain);gain.connect(masterGain);osc.start();oscillators.push(osc)})}
    await audioContext.resume();soundOn=!soundOn;masterGain.gain.setTargetAtTime(soundOn?.11:0,audioContext.currentTime,.8);$('#sound').setAttribute('aria-pressed',String(soundOn));$('#sound').setAttribute('aria-label',soundOn?'Desativar ambiente sonoro':'Ativar ambiente sonoro');$('#sound svg').innerHTML=soundOn?'<path d="M11 5 6 9H3v6h3l5 4V5ZM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>':'<path d="M11 5 6 9H3v6h3l5 4V5ZM16 9l5 6m0-6-5 6"/>';
  }catch{$('#sound').setAttribute('aria-label','Áudio indisponível neste navegador')}
}
$('#sound').addEventListener('click',toggleSound);
function updateMotion(){scene?.setPaused(paused||reader.open||document.hidden);$('#motion').setAttribute('aria-pressed',String(paused));$('#motion').innerHTML=paused?'Retomar movimento <span>▷</span>':'Pausar movimento <span>Ⅱ</span>'}
$('#motion').addEventListener('click',()=>{paused=!paused;updateMotion()});motionQuery.addEventListener('change',e=>scene?.setReducedMotion(e.matches));
document.addEventListener('visibilitychange',()=>{updateMotion();if(audioContext&&soundOn)masterGain.gain.setTargetAtTime(document.hidden?0:.11,audioContext.currentTime,.5)});
window.addEventListener('hashchange',()=>{const i=story.findIndex(s=>s.id===location.hash.slice(1));if(i>=0)go(i)});

async function init(){
  const started=performance.now();renderChapter();
  try{scene=await createScene($('#scene'));scene.setReducedMotion(motionQuery.matches);document.body.dataset.webgl='ready'}catch(error){document.body.dataset.webgl='unavailable';$('#scene-unavailable').hidden=false;console.warn('Representação 3D indisponível:',error)}
  const initial=story.findIndex(s=>s.id===location.hash.slice(1));if(initial>0){chapter=initial;scene?.setChapter(chapter);renderChapter()}
  await wait(Math.max(0,1400-(performance.now()-started)));$('#loader').classList.add('done');document.body.classList.remove('booting');
  window.__verboReady=true;
}
init();
