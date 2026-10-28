import * as THREE from './vendor/three.module.min.js';

const palettes = [
  { fog: '#120f0a', ground:'#1c160e', light:'#efb96a', sun:'#e5ba76', power:1.3 },
  { fog: '#090f1e', ground:'#121d29', light:'#acc9ff', sun:'#c9dcff', power:1.1 },
  { fog: '#102b32', ground:'#17383c', light:'#e5c699', sun:'#f0d9a7', power:1.3 },
  { fog: '#261b10', ground:'#46301a', light:'#ffe1a5', sun:'#ffd38b', power:1.6 },
  { fog: '#180f21', ground:'#231325', light:'#b47a9c', sun:'#bc6880', power:0.85 },
  { fog: '#392919', ground:'#574329', light:'#ffdda2', sun:'#fff1cf', power:2.4 },
  { fog: '#1c2630', ground:'#293a42', light:'#ffd8aa', sun:'#ffe4b8', power:1.7 },
  { fog: '#101724', ground:'#19283b', light:'#b6d9ff', sun:'#d5e6ff', power:1.7 }
];

export async function createScene(canvas) {
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches, paused = false, activeChapter = 0, time = 0, frame = 0;
  let width = innerWidth, height = innerHeight, pointerX = 0, pointerY = 0;
  let transition = 1, desiredCameraZ = 11.5, angelType = 'serafins';
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias: innerWidth > 700, powerPreference:'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth <= 700 ? 1.35 : 1.7));
  renderer.setSize(width,height,false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(palettes[0].fog, .042);
  const camera = new THREE.PerspectiveCamera(43,width/height,.1,120);
  camera.position.set(0,.35,11.5);
  camera.lookAt(0,.2,0);
  const ambient = new THREE.HemisphereLight(0xd5e4ff,0x251508,1.1); scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffd394,4.5);key.position.set(-3,6,5);scene.add(key);
  const rim = new THREE.PointLight(0xe9b56d,40,35,1.4);rim.position.set(4,3,-2);scene.add(rim);
  const blue = new THREE.DirectionalLight(0x677eaa,1.15);blue.position.set(4,2,1);scene.add(blue);
  const fill = new THREE.PointLight(0xffe7c3,5,10,2);fill.position.set(3,0,5);scene.add(fill);
  const stage = new THREE.Group();scene.add(stage);
  const scenery = new THREE.Group();stage.add(scenery);
  const gold = new THREE.MeshStandardMaterial({color:0xa98246,metalness:.67,roughness:.42});
  const lightGold = new THREE.MeshStandardMaterial({color:0xc8b48a,metalness:.56,roughness:.5});
  const darkGold = new THREE.MeshStandardMaterial({color:0x4c3925,metalness:.4,roughness:.7});
  const glowMaterial = new THREE.MeshBasicMaterial({color:0xffe0a2,transparent:true,opacity:.8});

  // The grain follows the length of the timber rather than flattening it into a picture.
  const grainCanvas = document.createElement('canvas');grainCanvas.width=128;grainCanvas.height=512;
  const grainCtx=grainCanvas.getContext('2d');
  grainCtx.fillStyle='#78603f';grainCtx.fillRect(0,0,128,512);
  let seed=19;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  for(let i=0;i<230;i++){const x=random()*128;grainCtx.strokeStyle=`rgba(${random()>.5?'203,169,110':'20,16,10'},${random()*.22})`;grainCtx.lineWidth=.3+random()*1.3;grainCtx.beginPath();grainCtx.moveTo(x,0);grainCtx.bezierCurveTo(x+random()*8,160,x-random()*8,320,x+random()*4,512);grainCtx.stroke();}
  const woodTexture = new THREE.CanvasTexture(grainCanvas);woodTexture.colorSpace=THREE.SRGBColorSpace;woodTexture.wrapS=woodTexture.wrapT=THREE.RepeatWrapping;
  const wood = new THREE.MeshStandardMaterial({map:woodTexture,color:0xb9aa8d,metalness:.23,roughness:.79,bumpMap:woodTexture,bumpScale:.035});
  function beam(w,h,d){const shape=new THREE.Shape();shape.moveTo(-w/2,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2);shape.lineTo(-w/2,h/2);shape.closePath();const g=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:.045,bevelThickness:.045,bevelSegments:3,steps:1,curveSegments:1});g.translate(0,0,-d/2);return new THREE.Mesh(g,wood);}
  const cross = new THREE.Group();cross.rotation.set(-.025,-.28,.035);cross.position.y=.3;scenery.add(cross);
  cross.add(beam(.32,4.3,.26));const arm=beam(2.55,.3,.25);arm.position.set(0,.8,.012);cross.add(arm);
  const join=new THREE.Mesh(new THREE.BoxGeometry(.33,.31,.015),darkGold);join.position.set(0,.8,.177);cross.add(join);
  for(const [x,y] of [[0,.8],[-.85,.8],[.85,.8],[0,-1.3]]){const n=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),darkGold);n.scale.z=.25;n.position.set(x,y,.18);cross.add(n);}
  const titulus=new THREE.Mesh(new THREE.BoxGeometry(.51,.18,.045),darkGold);titulus.position.set(0,1.64,.17);titulus.rotation.z=.03;cross.add(titulus);
  const crossBase=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshStandardMaterial({color:0x302719,roughness:1,metalness:0}));crossBase.scale.set(1.12,.4,.8);crossBase.position.y=-2.05;cross.add(crossBase);

  const terrainMaterial = new THREE.MeshStandardMaterial({color:palettes[0].ground,roughness:1,metalness:.05});
  const groundGeo=new THREE.PlaneGeometry(62,58,90,90);groundGeo.rotateX(-Math.PI/2);
  const gp=groundGeo.attributes.position;
  for(let i=0;i<gp.count;i++){const x=gp.getX(i),z=gp.getZ(i);const h=Math.sin(x*.29+z*.13)*.5+Math.sin(x*.65-z*.19)*.19+Math.cos(z*.42)*.2;gp.setY(i,h-.25);}
  groundGeo.computeVertexNormals();const ground=new THREE.Mesh(groundGeo,terrainMaterial);ground.position.set(0,-2.4,-12);scene.add(ground);
  // Distant silhouettes anchor the camera's forward movement.
  const mountains=[];
  for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.ConeGeometry(4+i*.6,2.2+i*.27,5,1),new THREE.MeshStandardMaterial({color:0x1e2430,roughness:1}));m.position.set(-11+i*4.7,-2.6,-21-(i%2)*6);m.scale.z=.8;m.rotation.y=i*.7;scene.add(m);mountains.push(m);}
  for(let i=0;i<28;i++){const rock=new THREE.Mesh(new THREE.IcosahedronGeometry(.12+random()*.35,0),terrainMaterial);rock.position.set((random()-.5)*14,-2.25+random()*.2,-random()*10);rock.scale.y=.3+random()*.3;rock.rotation.set(random(),random(),random());scenery.add(rock);}

  const haloMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uColor:{value:new THREE.Color(palettes[0].sun)},uOpacity:{value:.5}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 vUv;uniform vec3 uColor;uniform float uOpacity;void main(){float d=length(vUv-.5)*2.;float a=exp(-d*d*5.)*.33+exp(-d*d*70.)*.2;gl_FragColor=vec4(uColor,a*uOpacity);}' });
  const halo=new THREE.Mesh(new THREE.PlaneGeometry(17,17),haloMaterial);halo.position.set(1.2,2,-6);stage.add(halo);
  const beamShader=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{uColor:{value:new THREE.Color(palettes[0].light)},uOpacity:{value:.1}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 vUv;uniform vec3 uColor;uniform float uOpacity;void main(){float center=pow(max(0.,1.-abs(vUv.x-.5)*2.),2.);float along=sin(vUv.y*3.14159);gl_FragColor=vec4(uColor,center*along*uOpacity);}' });
  const rays=new THREE.Group();stage.add(rays);
  for(let i=0;i<7;i++){const b=new THREE.Mesh(new THREE.PlaneGeometry(.3+random()*.5,17),beamShader);b.position.set(-2.8+i*.85,4,-4-random()*2);b.rotation.z=-.35+(i-3)*.035;rays.add(b);}
  const dustGeo=new THREE.BufferGeometry(),dustPositions=new Float32Array(520*3),dustSizes=new Float32Array(520);
  for(let i=0;i<520;i++){dustPositions[i*3]=(random()-.5)*24;dustPositions[i*3+1]=(random()-.5)*13;dustPositions[i*3+2]=random()*20-12;dustSizes[i]=random();}
  dustGeo.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));dustGeo.setAttribute('aSize',new THREE.BufferAttribute(dustSizes,1));
  const dustMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uTime:{value:0},uColor:{value:new THREE.Color(0xd6be83)}},vertexShader:'attribute float aSize;uniform float uTime;varying float vAlpha;void main(){vec3 p=position;p.x+=sin(uTime*.14+p.y)*.15;p.y+=sin(uTime*.08+p.x)*.2;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=min(5.,(1.+aSize*2.)*14./-mv.z);vAlpha=.12+aSize*.45;}',fragmentShader:'uniform vec3 uColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(uColor,pow(1.-d*2.,2.)*vAlpha);}' });
  const dust=new THREE.Points(dustGeo,dustMaterial);scene.add(dust);
  const starsGeo=new THREE.BufferGeometry();const starPositions=new Float32Array(170*3);for(let i=0;i<170;i++){starPositions[i*3]=(random()-.5)*65;starPositions[i*3+1]=random()*20+1;starPositions[i*3+2]=-22-random()*30;}starsGeo.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
  const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xdce6ff,size:.035,transparent:true,opacity:0,depthWrite:false}));scene.add(stars);

  const nativity=new THREE.Group();nativity.visible=false;scenery.add(nativity);
  const starCore=new THREE.Mesh(new THREE.OctahedronGeometry(.16,0),glowMaterial);starCore.position.set(0,2.45,-1);nativity.add(starCore);
  const starRays=new THREE.Group();starRays.position.copy(starCore.position);nativity.add(starRays);
  for(let i=0;i<4;i++){const q=new THREE.Mesh(new THREE.ConeGeometry(.025,i%2?.7:1.1,4),glowMaterial);q.rotation.z=i*Math.PI/2;q.position.set(-Math.sin(i*Math.PI/2)*(i%2?.34:.54),Math.cos(i*Math.PI/2)*(i%2?.34:.54),0);starRays.add(q);}
  const houseMat=new THREE.MeshStandardMaterial({color:0x38404b,roughness:.9});
  for(let i=0;i<20;i++){const w=.2+random()*.35,h=.15+random()*.5;const house=new THREE.Mesh(new THREE.BoxGeometry(w,h,.45),houseMat);house.position.set((random()-.5)*8,-2.1+h/2,-3-random()*3);nativity.add(house);const roof=new THREE.Mesh(new THREE.ConeGeometry(w*.8,.2,4),houseMat);roof.rotation.y=Math.PI/4;roof.position.copy(house.position);roof.position.y+=h/2+.1;nativity.add(roof);}

  const water=new THREE.Mesh(new THREE.PlaneGeometry(52,45,65,65),new THREE.MeshStandardMaterial({color:0x1a454b,metalness:.58,roughness:.28,transparent:true,opacity:.96}));water.geometry.rotateX(-Math.PI/2);water.position.set(0,-2,-12);water.visible=false;scene.add(water);const waterTime = { value:0 };
  water.material.onBeforeCompile = shader => { shader.uniforms.uTime = waterTime; shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader.replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = normalize(vec3(-.0245*cos(position.x*.7+uTime*.7),1.,.0325*sin(position.z*1.3+uTime*.5)));').replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.y += sin(position.x*.7+uTime*.7)*.035+cos(position.z*1.3+uTime*.5)*.025;'); };
  water.material.customProgramCacheKey = () => 'cinematic-water-v1';
  const boat=new THREE.Group();boat.visible=false;scenery.add(boat);boat.position.set(.2,-1.68,.1);boat.rotation.y=-.22;
  const hullGeo=new THREE.SphereGeometry(1,20,10,0,Math.PI*2,0,Math.PI/2);const hull=new THREE.Mesh(hullGeo,new THREE.MeshStandardMaterial({color:0x594631,roughness:.85,side:THREE.DoubleSide}));hull.scale.set(.65,.24,1.8);hull.rotation.x=Math.PI;boat.add(hull);
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,2.3,8),darkGold);mast.position.set(0,1,0);boat.add(mast);
  const sailShape=new THREE.Shape();sailShape.moveTo(.05,.15);sailShape.lineTo(.05,2.1);sailShape.quadraticCurveTo(1.1,1.1,.85,.4);sailShape.closePath();const sail=new THREE.Mesh(new THREE.ShapeGeometry(sailShape),new THREE.MeshStandardMaterial({color:0xc6b696,side:THREE.DoubleSide,roughness:.9}));sail.rotation.y=.5;boat.add(sail);

  const tomb=new THREE.Group();tomb.visible=false;scenery.add(tomb);tomb.position.set(0,-1.5,-.2);
  const tombRock=new THREE.Mesh(new THREE.DodecahedronGeometry(1.55,1),new THREE.MeshStandardMaterial({color:0x74644c,roughness:1}));tombRock.scale.set(1.25,.9,.8);tombRock.position.y=.15;tomb.add(tombRock);
  const opening=new THREE.Mesh(new THREE.CircleGeometry(.72,48),new THREE.MeshBasicMaterial({color:0x0c0a07}));opening.position.set(-.17,.12,1.19);tomb.add(opening);
  const portalGlow=new THREE.Mesh(new THREE.CircleGeometry(.61,48),new THREE.MeshBasicMaterial({color:0xffe9bc,transparent:true,opacity:.32,blending:THREE.AdditiveBlending}));portalGlow.position.set(-.17,.12,1.2);tomb.add(portalGlow);
  const tombStone=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,.32,32),new THREE.MeshStandardMaterial({color:0x8e7c5d,roughness:.91}));tombStone.rotation.x=Math.PI/2;tombStone.position.set(1.52,-.24,1.02);tombStone.rotation.z=-.2;tomb.add(tombStone);

  const angel = new THREE.Group();angel.visible=false;angel.position.y=.1;scenery.add(angel);
  const featherMat=new THREE.MeshStandardMaterial({color:0xd1c6ac,metalness:.46,roughness:.48,side:THREE.DoubleSide});
  const featherShadow=new THREE.MeshStandardMaterial({color:0x83745a,metalness:.5,roughness:.58,side:THREE.DoubleSide});
  const featherShape=new THREE.Shape();featherShape.moveTo(0,0);featherShape.bezierCurveTo(.3,.15,.95,.17,1.35,0);featherShape.bezierCurveTo(.85,-.09,.3,-.09,0,0);const featherGeo=new THREE.ExtrudeGeometry(featherShape,{depth:.025,bevelEnabled:true,bevelSize:.012,bevelThickness:.009,bevelSegments:1,steps:1,curveSegments:8});
  function wing(side=1,length=1){const group=new THREE.Group();for(let i=0;i<15;i++){const feather=new THREE.Mesh(featherGeo,i%4===0?featherShadow:featherMat);const p=i/14;feather.position.set(.05+p*.52, -.13+p*.42,Math.sin(p*Math.PI)*.07);feather.rotation.z=-.8+p*1.12;feather.rotation.y=.12+p*.12;feather.scale.set((.5+Math.sin(p*Math.PI*.75)*.7)*length,.75+p*.3,1);group.add(feather);}const bones=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),lightGold);bones.scale.set(.8,.13,.11);bones.position.set(.5,.07,-.03);bones.rotation.z=.23;group.add(bones);group.scale.x=side;return group;}
  const wingAnimations=[], angelCache=new Map();
  function clearAngel(){while(angel.children.length){const c=angel.children[0];angel.remove(c);}wingAnimations.length=0;ringAnimations.length=0;}
  function addWing(side,y,angle,length,depth=0){const w=wing(side,length);w.position.set(side*.13,y,depth);w.rotation.z=side*angle;angel.add(w);wingAnimations.push({obj:w,side,base:angle,phase:y*3});return w;}
  function luminousHeart(){const heart=new THREE.Mesh(new THREE.IcosahedronGeometry(.2,2),glowMaterial);heart.scale.y=1.8;heart.position.y=.25;angel.add(heart);const gl=halo.clone();gl.material=haloMaterial.clone();gl.material.uniforms.uOpacity.value=.58;gl.scale.setScalar(.28);gl.position.set(0,.25,-.9);angel.add(gl);}
  function eye(x,y,z,size=.1,parent=angel){const eyeGroup=new THREE.Group();eyeGroup.position.set(x,y,z);const white=new THREE.Mesh(new THREE.SphereGeometry(size,14,10),lightGold);white.scale.set(1.5,.72,.4);eyeGroup.add(white);const pupil=new THREE.Mesh(new THREE.SphereGeometry(size*.4,12,8),new THREE.MeshStandardMaterial({color:0x1b2430,metalness:.4,roughness:.23}));pupil.position.z=size*.36;eyeGroup.add(pupil);parent.add(eyeGroup);return eyeGroup;}
  const ringAnimations=[];
  function makeRings(){ringAnimations.length=0;for(let r=0;r<3;r++){const g=new THREE.Group();g.rotation.set(r*Math.PI/3,r*Math.PI/3+.25,r*.23);const ring=new THREE.Mesh(new THREE.TorusGeometry(1.38+r*.12,.045,10,100),gold);g.add(ring);const inner=new THREE.Mesh(new THREE.TorusGeometry(1.29+r*.12,.01,6,100),lightGold);g.add(inner);for(let i=0;i<20;i++){const a=i*Math.PI/10;const e=eye(Math.cos(a)*(1.38+r*.12),Math.sin(a)*(1.38+r*.12),.03,.055,g);e.rotation.z=a-Math.PI/2;}angel.add(g);ringAnimations.push(g);}luminousHeart();}
  function makeAngel(type){clearAngel();ringAnimations.length=0;
    if(type==='rodas'){makeRings();return;}
    if(type==='serafins'){
      luminousHeart();
      addWing(-1,.55,.72,.84,.09);addWing(1,.55,.72,.84,.09);
      addWing(-1,.16,.06,1.3,0);addWing(1,.16,.06,1.3,0);
      addWing(-1,-.55,-.42,.83,.14);addWing(1,-.55,-.42,.83,.14);
      return;
    }
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.25,.48,1.65,18,1,true),new THREE.MeshStandardMaterial({color:0xc2b7a0,metalness:.18,roughness:.82,side:THREE.DoubleSide}));body.position.y=-.32;angel.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.225,20,16),lightGold);head.position.y=.76;angel.add(head);
    // Human forms remain deliberately symbolic: scripture gives no portrait of Gabriel or Michael.
    if(type==='mensageiros'){
      const hood=new THREE.Mesh(new THREE.SphereGeometry(.26,20,16,0,Math.PI*2,0,Math.PI*.68),featherMat);hood.position.set(0,.81,-.045);hood.rotation.x=-.17;angel.add(hood);
      for(const side of [-1,1]){const arm=new THREE.Mesh(new THREE.CylinderGeometry(.09,.13,.85,12),featherMat);arm.position.set(side*.32,.1,0);arm.rotation.z=side*.22;angel.add(arm);const hand=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),lightGold);hand.position.set(side*.42,-.32,.02);angel.add(hand);}
      const staff=new THREE.Mesh(new THREE.CylinderGeometry(.018,.023,2.8,10),gold);staff.position.set(.6,.2,.02);angel.add(staff);
      return;
    }
    addWing(-1,.35,.25,1.12,-.03);addWing(1,.35,.25,1.12,-.03);addWing(-1,-.1,-.65,.94,-.2);addWing(1,-.1,-.65,.94,-.2);
    for(let f=0;f<4;f++){const face=new THREE.Group();face.position.y=.78;face.rotation.y=f*Math.PI/2;const mask=new THREE.Mesh(new THREE.SphereGeometry(.21,16,12),f===0?lightGold:gold);mask.scale.set(.75,1,.7);mask.position.z=.17;face.add(mask);const nose=new THREE.Mesh(f===3?new THREE.ConeGeometry(.085,.23,4):new THREE.SphereGeometry(.075,12,8),lightGold);nose.position.set(0,f===3?-.03:0,.34);nose.rotation.x=Math.PI/2;if(f===1)nose.scale.set(1.4,.7,.8);face.add(nose);if(f===2){for(const s of [-1,1]){const horn=new THREE.Mesh(new THREE.ConeGeometry(.045,.24,8),gold);horn.position.set(s*.16,.18,.16);horn.rotation.z=-s*.4;face.add(horn);}}angel.add(face);}
    for(let i=0;i<2;i++){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.055,.07,.8,8),gold);leg.position.set((i%2?1:-1)*.19,-1.5,-.03);angel.add(leg);}
  }
  // Keep one model per description: changing tabs reuses the same GPU resources.
  function activateAngel(type){
    const cached=angelCache.get(type);
    if(cached){clearAngel();cached.children.forEach(child=>angel.add(child));wingAnimations.push(...cached.wings);ringAnimations.push(...cached.rings);}
    else{makeAngel(type);angelCache.set(type,{children:[...angel.children],wings:[...wingAnimations],rings:[...ringAnimations]});}
  }
  activateAngel(angelType);

  const paletteColors = palettes.map(p=>({fog:new THREE.Color(p.fog),light:new THREE.Color(p.light),sun:new THREE.Color(p.sun),ground:new THREE.Color(p.ground)}));
  const currentFog=new THREE.Color(palettes[0].fog),currentLight=new THREE.Color(palettes[0].light),currentSun=new THREE.Color(palettes[0].sun),currentGround=new THREE.Color(palettes[0].ground);
  let disposed=false,last=performance.now();
  let renderedWidth=width,renderedHeight=height;
  function requestRender(){
    if(disposed||frame||document.hidden)return;
    last=performance.now();frame=requestAnimationFrame(animate);
  }
  function resize(){
    width=Math.max(1,canvas.clientWidth||innerWidth);height=Math.max(1,canvas.clientHeight||innerHeight);
    const mobile=width<=700,seaChapter=activeChapter===2,dpr=Math.min(devicePixelRatio||1,mobile?1.35:1.7);
    if(renderer.getPixelRatio()!==dpr)renderer.setPixelRatio(dpr);
    if(width!==renderedWidth||height!==renderedHeight){renderer.setSize(width,height,false);renderedWidth=width;renderedHeight=height;}
    camera.aspect=width/height;camera.updateProjectionMatrix();
    stage.position.set(mobile?(activeChapter===7?.22:.5):(width/height>1.2?2.8:1.85),mobile&&!seaChapter?1.9:0,0);stage.scale.setScalar(mobile&&!seaChapter?.6:1);
    requestRender();
  }
  resize();
  const onPointer=(e)=>{pointerX=(e.clientX/innerWidth-.5);pointerY=(e.clientY/innerHeight-.5);};
  addEventListener('pointermove',onPointer,{passive:true});addEventListener('resize',resize,{passive:true});
  const onVisibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestRender();};
  document.addEventListener('visibilitychange',onVisibility);
  function animate(now){
    frame=0;if(disposed||document.hidden)return;
    const dt=Math.min((now-last)/1000,.05);last=now;
    const motion=!paused&&!reduced;
    if(motion)time+=dt;
    const smooth=motion?1-Math.exp(-dt*2.2):1,p=palettes[activeChapter],pc=paletteColors[activeChapter];transition=motion?Math.min(1,transition+dt*.75):1;
    currentFog.lerp(pc.fog,smooth);currentLight.lerp(pc.light,smooth);currentSun.lerp(pc.sun,smooth);currentGround.lerp(pc.ground,smooth);
    scene.fog.color.copy(currentFog);terrainMaterial.color.copy(currentGround);haloMaterial.uniforms.uColor.value.copy(currentSun);beamShader.uniforms.uColor.value.copy(currentLight);key.color.copy(currentLight);rim.color.copy(currentSun);dustMaterial.uniforms.uColor.value.copy(currentLight);
    if(!paused){
      if(reduced)camera.position.set(0,.35,desiredCameraZ);
      else{
        camera.position.z=THREE.MathUtils.lerp(camera.position.z,desiredCameraZ+Math.sin(transition*Math.PI)*1.2,smooth*1.4);
        camera.position.x=THREE.MathUtils.lerp(camera.position.x,pointerX*.16,smooth);camera.position.y=THREE.MathUtils.lerp(camera.position.y,.35-pointerY*.12,smooth);
      }
      camera.lookAt(0,.15,0);
    }
    cross.rotation.y=-.3+Math.sin(time*.14)*.035;cross.rotation.z=.035+Math.sin(time*.11)*.006;
    cross.visible=[0,3,4,6].includes(activeChapter);nativity.visible=activeChapter===1;water.visible=boat.visible=activeChapter===2;tomb.visible=activeChapter===5;angel.visible=activeChapter===7;
    waterTime.value=time;
    if(water.visible && motion){boat.rotation.z=Math.sin(time*.6)*.018;boat.position.y=-1.68+Math.sin(time*.75)*.035;}
    angel.position.y=.15+Math.sin(time*.45)*.07;angel.rotation.y=Math.sin(time*.13)*.12;
    if(activeChapter===7){for(const w of wingAnimations)w.obj.rotation.z=w.side*(w.base+Math.sin(time*.7+w.phase)*.022);for(let i=0;i<ringAnimations.length;i++){ringAnimations[i].rotation.y=time*(i%2?-.07:.06)+i*Math.PI/3+.25;ringAnimations[i].rotation.x=i*Math.PI/3+Math.sin(time*.15)*.15;}}
    starCore.rotation.y=time*.25;starCore.rotation.z=time*.1;
    const starTarget=(activeChapter===1||activeChapter===7)?.65:activeChapter===4?.25:.05;stars.material.opacity=THREE.MathUtils.lerp(stars.material.opacity,starTarget,smooth);
    haloMaterial.uniforms.uOpacity.value=THREE.MathUtils.lerp(haloMaterial.uniforms.uOpacity.value,activeChapter===5?.95:activeChapter===4?.25:.5,smooth);
    beamShader.uniforms.uOpacity.value=THREE.MathUtils.lerp(beamShader.uniforms.uOpacity.value,activeChapter===5?.19:activeChapter===7?.15:.075,smooth);
    rim.intensity=THREE.MathUtils.lerp(rim.intensity,24*p.power,smooth);key.intensity=THREE.MathUtils.lerp(key.intensity,2.8*p.power,smooth);
    dustMaterial.uniforms.uTime.value=time;dust.rotation.y=time*.007;renderer.render(scene,camera);
    if(motion)frame=requestAnimationFrame(animate);
  }
  return {
    setChapter(index){activeChapter=Math.max(0,Math.min(7,Math.round(Number(index)||0)));transition=paused||reduced?1:0;desiredCameraZ=activeChapter===7?10.8:activeChapter===5?11.9:11.5;resize();},
    setAngel(type){if(type===angelType||!['serafins','querubins','rodas','mensageiros'].includes(type))return;angelType=type;activateAngel(type);requestRender();},
    setReducedMotion(value){reduced=!!value;requestRender();},setPaused(value){paused=!!value;requestRender();},resize,
    dispose(){
      disposed=true;cancelAnimationFrame(frame);frame=0;
      removeEventListener('resize',resize);removeEventListener('pointermove',onPointer);document.removeEventListener('visibilitychange',onVisibility);
      const geometries=new Set(),materials=new Set();
      const collect=o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));};
      scene.traverse(collect);angelCache.forEach(model=>model.children.forEach(child=>child.traverse(collect)));
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());woodTexture.dispose();angelCache.clear();renderer.dispose();
    }
  };
}



