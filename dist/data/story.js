// Biblical text: Bíblia Portuguesa Mundial (BPM), eBible.org, public domain.
// BPM is a translation draft still under review. Editorial summaries and
// contextual readings below are distinct from the quoted biblical text.
const bible = 'https://ebible.org/porbrbsl/';

export const story = [
  {
    id: 'verbo',
    kicker: 'UMA JORNADA PELAS ESCRITURAS',
    title: 'Jesus Cristo.',
    subtitle: 'A luz que atravessa a eternidade.',
    body: [
      'Uma vida que atravessou a história. Palavras que ainda encontram o coração. Entre na narrativa dos Evangelhos e descubra quem é Jesus, o que ele ensinou e por que sua presença permanece no centro da fé cristã.'
    ],
    reference: 'João 1:1–14',
    scripture: 'A luz brilha nas trevas, e as trevas não a venceram.',
    source: bible + 'JHN01.htm#V5',
    label: 'O princípio'
  },
  {
    id: 'nascimento',
    kicker: '01 / O NASCIMENTO',
    title: 'O eterno entrou no tempo.',
    subtitle: 'De Belém a Nazaré. Uma vida entre nós.',
    body: [
      'Os Evangelhos apresentam Jesus como um homem judeu, nascido de Maria e criado em Nazaré, na Galileia. Lucas narra seu nascimento em Belém: uma criança envolta em panos e deitada numa manjedoura.',
      'Para a fé cristã, é o mistério da encarnação: o Filho de Deus assumiu a condição humana. João expressa essa proximidade com uma imagem inesquecível: o Verbo habitou entre nós.'
    ],
    reference: 'Lucas 2:1–20 · João 1:14',
    scripture: 'O Verbo se fez carne e viveu entre nós.',
    source: bible + 'JHN01.htm#V14',
    label: 'O nascimento'
  },
  {
    id: 'ministerio',
    kicker: '02 / O MINISTÉRIO',
    title: 'À margem do mar, um chamado.',
    subtitle: 'Mestre. Filho do Homem. O Cristo.',
    body: [
      'Jesus percorre a Galileia e a Judeia anunciando o Reino de Deus. Chama discípulos, ensina em sinagogas e casas, partilha a mesa e, segundo os Evangelhos, cura enfermos e acolhe pessoas à margem da sociedade.',
      'Sua identidade se torna a pergunta central da narrativa. “Cristo” significa Ungido, o Messias. Para os cristãos, Jesus é o Filho de Deus e Salvador; sua autoridade aparece ligada à compaixão, ao serviço e à reconciliação.'
    ],
    reference: 'Lucas 4:16–21, 38–44 · Marcos 8:27–29',
    scripture: 'Mas e vocês, quem dizem que eu sou?',
    source: bible + 'MRK08.htm#V29',
    label: 'O chamado'
  },
  {
    id: 'palavras',
    kicker: '03 / AS PALAVRAS',
    title: 'Palavras que fazem viver.',
    subtitle: 'Um Reino que começa no coração.',
    body: [
      'Nas bem-aventuranças, nas parábolas e nas conversas pelo caminho, Jesus anuncia misericórdia, justiça, perdão e amor ao próximo. Ele ensina a orar e chama seus ouvintes a praticar aquilo que escutam.',
      'Suas palavras também confrontam: amar os inimigos, renunciar ao próprio ego, cuidar dos pobres. Explore as falas registradas nas Escrituras, separadas por livro, capítulo e tema, sempre com a referência para ler o contexto.'
    ],
    reference: 'Mateus 5–7 · João 6:63',
    scripture: 'As palavras que eu lhes digo são espírito e são vida.',
    source: bible + 'JHN06.htm#V63',
    label: 'As palavras'
  },
  {
    id: 'cruz',
    kicker: '04 / A CRUZ',
    title: 'O amor foi até o fim.',
    subtitle: 'Gólgota. A entrega e o silêncio.',
    body: [
      'A narrativa da paixão conduz a Jerusalém: a última ceia, a oração no jardim, a prisão e a condenação sob a autoridade de Pôncio Pilatos. Jesus é crucificado no lugar chamado Gólgota e depois sepultado.',
      'Os cristãos reconhecem nessa morte a entrega de Cristo pela humanidade: reconciliação, perdão e amor que atravessa o sofrimento. A cruz passa a ocupar o centro da memória e da esperança cristãs.'
    ],
    reference: 'João 19:16–42 · Marcos 10:45',
    scripture: 'Está consumado!',
    source: bible + 'JHN19.htm#V30',
    label: 'A cruz'
  },
  {
    id: 'ressurreicao',
    kicker: '05 / A RESSURREIÇÃO',
    title: 'A pedra não teve a última palavra.',
    subtitle: 'O primeiro dia. Uma nova criação.',
    body: [
      'Ao amanhecer do primeiro dia da semana, as mulheres encontram o sepulcro vazio. Os Evangelhos narram o anúncio da ressurreição e os encontros do Ressuscitado com seus discípulos, entre medo, dúvida, reconhecimento e alegria.',
      'Essa é a proclamação que sustenta a fé cristã: Jesus vive. Na ressurreição, os cristãos veem a vitória de Deus sobre a morte e a promessa de uma vida renovada.'
    ],
    reference: 'Lucas 24:1–49 · Mateus 28:1–10',
    scripture: 'Ele não está aqui, mas ressuscitou.',
    source: bible + 'LUK24.htm#V6',
    label: 'A vida'
  },
  {
    id: 'presenca',
    kicker: '06 / A PRESENÇA',
    title: 'Uma história que continua.',
    subtitle: 'Quem ele é. Por que ele importa.',
    body: [
      'Para os cristãos, Jesus é o caminho para o Pai, a revelação do amor de Deus e o Senhor vivo. Sua importância não se resume à memória de um mestre: está na salvação que a fé reconhece em sua vida, morte e ressurreição.',
      'Seu chamado atravessa as gerações: amar como ele amou, servir, perdoar e anunciar as boas-novas. A jornada dos Evangelhos termina com uma missão e uma promessa de presença.'
    ],
    reference: 'João 14:6 · Mateus 28:18–20',
    scripture: 'Eis que estou com vocês sempre, até o fim dos tempos.',
    source: bible + 'MAT28.htm#V20',
    label: 'A presença'
  },
  {
    id: 'celestiais',
    kicker: '07 / ALÉM DO VISÍVEL',
    title: 'O céu nas palavras dos profetas.',
    subtitle: 'Contemple. Leia. Descubra o contexto.',
    body: [
      'As Escrituras descrevem mensageiros de Deus e visões extraordinárias: os serafins de Isaías, os querubins e as rodas de Ezequiel. Cada relato apresenta uma linguagem e uma cena próprias.',
      'As formas em 3D são interpretações artísticas desses textos. As passagens não oferecem uma anatomia completa, e nem toda criatura das visões é chamada de anjo. Escolha uma descrição e compare a imagem com a referência bíblica.'
    ],
    reference: 'Isaías 6 · Ezequiel 1 e 10 · Lucas 24:4, 23',
    scripture: 'Toda a terra está cheia da sua glória!',
    source: bible + 'ISA06.htm#V3',
    label: 'O invisível'
  }
];

export const angels = [
  {
    id: 'serafins',
    name: 'Serafins',
    eyebrow: 'A VISÃO DE ISAÍAS',
    description: 'Acima do trono, proclamam a santidade do Senhor. Um deles leva uma brasa do altar até os lábios do profeta.',
    appearance: 'Seis asas: duas cobrem o rosto, duas cobrem os pés e duas servem para voar.',
    limitation: 'Isaías não descreve rodas, vários rostos ou olhos espalhados pelo corpo dos serafins. A luz, os materiais e o movimento desta cena são escolhas artísticas.',
    reference: 'Isaías 6:1–7',
    source: bible + 'ISA06.htm',
    quote: 'Santo, santo, santo é o SENHOR dos Exércitos!'
  },
  {
    id: 'querubins',
    name: 'Querubins',
    eyebrow: 'A VISÃO DE EZEQUIEL',
    description: 'Ezequiel identifica como querubins os seres viventes vistos junto ao rio Quebar. Eles aparecem associados à manifestação da glória de Deus.',
    appearance: 'Quatro rostos e quatro asas; mãos de homem debaixo das asas. Em Ezequiel 1, os rostos são de homem, leão, boi e águia. Ezequiel 10 menciona rosto de querubim, homem, leão e águia.',
    limitation: 'A representação reúne elementos das visões de Ezequiel 1 e 10. O texto não descreve bebês alados e não apresenta essas figuras como um retrato de todos os anjos.',
    reference: 'Ezequiel 1:5–14 · 10:12–22',
    source: bible + 'EZK10.htm',
    quote: 'Cada um tinha quatro rostos, e cada um quatro asas.'
  },
  {
    id: 'rodas',
    name: 'As rodas',
    eyebrow: 'RODA DENTRO DE RODA',
    description: 'Ao lado dos seres viventes, Ezequiel vê rodas que se movem com eles, sem precisar se virar. Seus aros são altos e cheios de olhos.',
    appearance: 'Brilho semelhante ao berilo; uma roda dentro de outra; aros cheios de olhos ao redor.',
    limitation: 'Essas rodas são frequentemente chamadas de “ofanim”, palavra hebraica para rodas. A passagem não as identifica explicitamente como uma classe independente de anjos. A geometria dos anéis é uma interpretação visual.',
    reference: 'Ezequiel 1:15–21 · 10:9–17',
    source: bible + 'EZK01.htm',
    quote: 'Os aros das quatro estavam cheios de olhos ao redor.'
  },
  {
    id: 'mensageiros',
    name: 'Mensageiros',
    eyebrow: 'A BOA NOTÍCIA',
    description: 'Gabriel anuncia a Maria o nascimento de Jesus. No relato do sepulcro, Lucas descreve dois homens em roupas resplandecentes; mais adiante, o mesmo capítulo os identifica como anjos.',
    appearance: 'Forma humana e vestes luminosas em Lucas 24. Mateus 28 descreve o aspecto do anjo como um relâmpago e suas vestes brancas como a neve.',
    limitation: 'Essas passagens não mencionam asas. A Bíblia não fornece um retrato físico completo de Gabriel ou Miguel; qualquer rosto definido seria uma escolha artística.',
    reference: 'Lucas 1:19, 26–38 · 24:4, 23 · Mateus 28:2–3',
    source: bible + 'LUK24.htm',
    quote: 'Por que vocês buscam entre os mortos aquele que vive?'
  }
];

export const namedAngels = [
  {
    id: 'gabriel',
    name: 'Gabriel',
    title: 'O mensageiro',
    description: 'Apresenta-se a Zacarias como aquele que está na presença de Deus e é enviado a Maria para anunciar o nascimento de Jesus. Lucas o chama de anjo; não o chama de arcanjo.',
    reference: 'Lucas 1:19, 26–38',
    source: bible + 'LUK01.htm',
    appearance: 'O texto não fornece uma descrição física completa.'
  },
  {
    id: 'miguel',
    name: 'Miguel',
    title: 'O arcanjo',
    description: 'Judas o chama explicitamente de arcanjo. Em Apocalipse, Miguel e seus anjos combatem o dragão. A Bíblia descreve sua ação, sem oferecer um retrato de seu rosto, armadura ou número de asas.',
    reference: 'Judas 1:9 · Apocalipse 12:7–9',
    source: bible + 'JUD01.htm',
    appearance: 'A armadura e as asas de representações tradicionais não são especificadas nessas passagens.'
  }
];

export const difficult = [
  {
    id: 'inimigos',
    title: 'Amar quem nos fere',
    quote: 'Mas eu lhes digo: amem os seus inimigos',
    reference: 'Mateus 5:43–48',
    context: 'No Sermão do Monte, Jesus rompe o ciclo da retribuição e pede amor e oração também por quem persegue. O contexto apresenta o Pai como modelo de generosidade. Amar não significa chamar o mal de bem: o chamado é responder sem reproduzir o ódio.',
    source: bible + 'MAT05.htm#V44',
    category: 'Amor'
  },
  {
    id: 'cruz',
    title: 'Negar a si mesmo',
    quote: 'Se alguém quiser vir após mim, negue-se a si mesmo, tome a sua cruz e siga-me.',
    reference: 'Marcos 8:31–38',
    context: 'Jesus acaba de anunciar sua própria paixão. Segui-lo envolve renunciar à ambição de preservar poder e prestígio a qualquer custo. A cruz aponta para fidelidade e entrega; o sofrimento, por si só, não é apresentado como um fim a ser procurado.',
    source: bible + 'MRK08.htm#V34',
    category: 'Discipulado'
  },
  {
    id: 'familia',
    title: 'Uma palavra sobre a família',
    quote: 'Quem não carrega a sua própria cruz e não me segue não pode ser meu discípulo.',
    reference: 'Lucas 14:25–33 · Mateus 10:37',
    context: 'Em Lucas 14:26, a linguagem de “desprezar” a família é deliberadamente radical. Uma leitura cristã comum entende a frase como prioridade de lealdade a Jesus, à luz de Mateus 10:37 e do mandamento de honrar pai e mãe. O restante da passagem manda calcular o custo de segui-lo.',
    source: bible + 'LUK14.htm#V27',
    category: 'Discipulado'
  },
  {
    id: 'riqueza',
    title: 'O camelo e a agulha',
    quote: 'É mais fácil um camelo passar pelo olho de uma agulha do que um rico entrar no Reino de Deus.',
    reference: 'Mateus 19:16–26',
    context: 'A imagem vem depois do encontro com um jovem que não consegue se separar de suas posses. Jesus expõe o poder da riqueza sobre o coração. À pergunta espantada dos discípulos, responde que a salvação impossível aos homens é possível para Deus.',
    source: bible + 'MAT19.htm#V24',
    category: 'Riqueza'
  },
  {
    id: 'olho',
    title: 'Uma imagem que choca',
    quote: 'Se o seu olho direito o faz tropeçar, arranque-o e jogue-o fora.',
    reference: 'Mateus 5:27–30',
    context: 'Esta imagem extrema aparece no ensino sobre desejo e fidelidade. É lida na tradição cristã como hipérbole: uma convocação a romper com aquilo que alimenta o pecado, não uma instrução para ferir o corpo.',
    source: bible + 'MAT05.htm#V29',
    category: 'Santidade'
  },
  {
    id: 'pao',
    title: 'Comer sua carne?',
    quote: 'Quem come a minha carne e bebe o meu sangue permanece em mim, e eu nele.',
    reference: 'João 6:35–69',
    context: 'Depois da multiplicação dos pães, Jesus se apresenta como o pão da vida. O discurso une sua entrega pela vida do mundo e a comunhão com ele. Tradições cristãs interpretam a linguagem de formas sacramentais e simbólicas diferentes; todas devem considerar a relação entre fé, vida e a pessoa de Cristo no capítulo.',
    source: bible + 'JHN06.htm#V56',
    category: 'Vida eterna'
  },
  {
    id: 'blasfemia',
    title: 'O pecado sem perdão',
    quote: 'Mas quem blasfemar contra o Espírito Santo nunca terá perdão',
    reference: 'Marcos 3:22–30',
    context: 'Marcos informa o motivo da advertência: seus adversários atribuíam a um espírito impuro a obra de libertação realizada por Jesus. A passagem trata de uma oposição que chama o agir do Espírito de maligno. A relação entre essa advertência e o arrependimento é discutida de modos distintos nas tradições cristãs.',
    source: bible + 'MRK03.htm#V29',
    category: 'Discernimento'
  },
  {
    id: 'senhor',
    title: 'Dizer não é praticar',
    quote: 'Nem todo o que me diz: “Senhor, Senhor”, entrará no Reino dos Céus',
    reference: 'Mateus 7:15–27',
    context: 'O final do Sermão do Monte contrasta aparência religiosa e obediência. A advertência é seguida pela imagem de duas casas: a que permanece é a de quem ouve as palavras de Jesus e as pratica. O foco é a coerência da vida diante do Pai.',
    source: bible + 'MAT07.htm#V21',
    category: 'Discipulado'
  },
  {
    id: 'perdao',
    title: 'Quantas vezes perdoar?',
    quote: 'Eu não lhe digo até sete vezes, mas até setenta vezes sete.',
    reference: 'Mateus 18:21–35',
    context: 'Pedro procura um limite para o perdão, e Jesus responde com uma abundância que ultrapassa a contagem. A parábola seguinte liga o perdão recebido ao perdão oferecido. O próprio capítulo também ensina a confrontar o erro e buscar reconciliação com responsabilidade.',
    source: bible + 'MAT18.htm#V22',
    category: 'Perdão'
  },
  {
    id: 'caminho',
    title: 'O caminho para o Pai',
    quote: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.',
    reference: 'João 14:1–11',
    context: 'Jesus fala aos discípulos inquietos com sua partida. À pergunta de Tomé sobre o caminho, responde apontando para si mesmo e para sua comunhão com o Pai. A afirmação está no centro da fé cristã na mediação e na identidade de Cristo.',
    source: bible + 'JHN14.htm#V6',
    category: 'Identidade'
  }
];

export const sources = [
  { title: 'Texto bíblico e licença — Bíblia Portuguesa Mundial', url: 'https://ebible.org/bible/details.php?id=porbrbsl' },
  { title: 'Quem é Jesus — João 1', url: bible + 'JHN01.htm' },
  { title: 'Nascimento — Lucas 2', url: bible + 'LUK02.htm' },
  { title: 'Ministério — Lucas 4', url: bible + 'LUK04.htm' },
  { title: 'Sermão do Monte — Mateus 5–7', url: bible + 'MAT05.htm' },
  { title: 'Crucificação — João 19', url: bible + 'JHN19.htm' },
  { title: 'Ressurreição — Lucas 24', url: bible + 'LUK24.htm' },
  { title: 'Missão e presença — Mateus 28', url: bible + 'MAT28.htm' },
  { title: 'Serafins — Isaías 6', url: bible + 'ISA06.htm' },
  { title: 'Seres viventes e rodas — Ezequiel 1', url: bible + 'EZK01.htm' },
  { title: 'Querubins — Ezequiel 10', url: bible + 'EZK10.htm' },
  { title: 'Gabriel — Lucas 1', url: bible + 'LUK01.htm' },
  { title: 'Miguel — Judas 1:9', url: bible + 'JUD01.htm' }
];

export const editorialNote = 'Uma experiência cristã baseada nas Escrituras. As citações seguem a Bíblia Portuguesa Mundial (BPM), em domínio público e ainda em revisão. Os resumos, comentários e reconstruções em 3D são interpretações editoriais e artísticas; não substituem a leitura das passagens completas. Os Evangelhos registram palavras de Jesus, mas não afirmam conter tudo o que ele disse ou fez (João 21:25).';
