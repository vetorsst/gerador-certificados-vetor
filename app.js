const ASSETS={logoV:"assets/logo-vertical.png",logoH:"assets/logo-horizontal.png",symbol:"assets/simbolo.png"};
document.getElementById('logo1').src=ASSETS.logoV;
document.getElementById('wm1').src=ASSETS.symbol;
document.getElementById('logo2').src=ASSETS.logoH;

let mode='ind',batch=[],batchIdx=0,page='front';

/* ===== persistência local (empresa/RT/preferências) ===== */
const LS={fields:'vtr_fields'};
const PERSIST=['e-razao','e-cnpj','e-tel','e-end','e-email','e-site','r-nome','r-reg','r-tit','c-cidade','c-inst','c-instrole','c-instcbo'];
const PERSIST_CHK=['c-verso-on','c-inst-on','c-lote-sep'];
function saveFields(){
  const data={};
  PERSIST.forEach(id=>{const e=document.getElementById(id);if(e)data[id]=e.value;});
  PERSIST_CHK.forEach(id=>{const e=document.getElementById(id);if(e)data[id]=e.checked;});
  try{localStorage.setItem(LS.fields,JSON.stringify(data));}catch(_){}
}
function loadFields(){
  let data;try{data=JSON.parse(localStorage.getItem(LS.fields)||'{}');}catch(_){data={};}
  PERSIST.forEach(id=>{const e=document.getElementById(id);if(e&&data[id]!=null)e.value=data[id];});
  PERSIST_CHK.forEach(id=>{const e=document.getElementById(id);if(e&&data[id]!=null)e.checked=data[id];});
}

(function(){
  const sel=document.getElementById('c-nrpick');
  const num=k=>parseInt((k.match(/\d+/)||[999])[0],10);
  Object.keys(TEMPLATES).sort((a,b)=>num(a)-num(b)).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=k+' — '+TEMPLATES[k].curso.slice(0,40)+(TEMPLATES[k].curso.length>40?'…':'');sel.appendChild(o);});
})();

function setMode(m){
  mode=m;
  document.getElementById('tab-ind').classList.toggle('active',m==='ind');
  document.getElementById('tab-lote').classList.toggle('active',m==='lote');
  document.getElementById('form-ind').style.display=m==='ind'?'block':'none';
  document.getElementById('form-lote').style.display=m==='lote'?'block':'none';
  render();
}
function showPage(p){
  page=p;
  document.getElementById('pf-front').classList.toggle('active',p==='front');
  document.getElementById('pf-back').classList.toggle('active',p==='back');
  document.getElementById('cert-front').style.display=p==='front'?'block':'none';
  document.getElementById('cert-back').style.display=p==='back'?'block':'none';
  /* reajusta a fonte do verso só quando ele fica visível (oculto mede altura 0) */
  if(p==='back')fitBody(document.getElementById('v-body'));
}
function v(id){const e=document.getElementById(id);return e?(e.value||'').trim():'';}
function chk(id){return document.getElementById(id).checked;}
function setV(id,val){document.getElementById(id).value=val;}

function applyTemplate(){
  const t=TEMPLATES[v('c-nrpick')];if(!t)return;
  setV('c-curso',t.curso);setV('c-nr',t.nr);setV('c-base',t.baseLegal);
  setV('c-carga',t.carga);setV('c-fecho',t.fecho);setV('c-conteudo',t.conteudo);
  setV('c-vmeses',t.validadeMeses);
  const vm=parseInt(t.validadeMeses,10);
  document.getElementById('model-summary').textContent='Carga '+t.carga+' · '+(vm>0?('validade '+vm+' meses'):'sem validade (não vence)')+' · conteúdo programático incluído';
  render();
}

/* ===== datas ===== */
const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function pad2(n){return String(n).padStart(2,'0');}
function extenso(iso){if(!iso)return '—';const [y,m,d]=iso.split('-');return parseInt(d)+' de '+MESES[parseInt(m)-1]+' de '+y;}
function curto(iso){if(!iso)return '—';const [y,m,d]=iso.split('-');return d+'/'+m+'/'+y;}
/* soma meses com clamp de fim de mês e formatação por componentes locais (sem UTC) */
function addMonths(iso,months){
  if(!iso)return '';const mm=parseInt(months,10);if(!mm)return '';
  const [y,m,d]=iso.split('-').map(Number);
  const tm=m-1+mm,ty=y+Math.floor(tm/12),tmod=((tm%12)+12)%12;
  const lastDay=new Date(ty,tmod+1,0).getDate();
  return ty+'-'+pad2(tmod+1)+'-'+pad2(Math.min(d,lastDay));
}
function dataField(){return mode==='lote'?v('f-data-lote'):v('f-data');}
function validadeISO(){return addMonths(dataField(),v('c-vmeses'));}

/* ===== CPF ===== */
function onlyDigits(s){return (s||'').replace(/\D/g,'');}
function maskCPF(s){const d=onlyDigits(s).slice(0,11);return d.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');}
function isValidCPF(s){
  const c=onlyDigits(s);if(c.length!==11||/^(\d)\1{10}$/.test(c))return false;
  let sum=0;for(let i=0;i<9;i++)sum+=+c[i]*(10-i);let r=(sum*10)%11;if(r>=10)r=0;if(r!==+c[9])return false;
  sum=0;for(let i=0;i<10;i++)sum+=+c[i]*(11-i);r=(sum*10)%11;if(r>=10)r=0;return r===+c[10];
}
function onCPF(){const e=document.getElementById('f-cpf');e.value=maskCPF(e.value);render();}

function onDate(){render();}

function person(){
  if(mode==='lote'&&batch.length)return batch[batchIdx];
  return {nome:v('f-nome')||'Nome do Participante',cpf:v('f-cpf')};
}

/* ===== dados calculados — fonte única p/ preview e impressão ===== */
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function escapeHTML(s){return esc(s);}
/* capitaliza nome próprio mantendo partículas em minúsculas (da, de, dos, e…) */
const PARTICULAS=new Set(['da','de','do','das','dos','e','di','du','del','la','van','von','y']);
function titleCasePT(s){
  return (s||'').toLowerCase().split(/\s+/).map((w,i)=>{
    if(!w)return w;
    if(i>0&&PARTICULAS.has(w))return w;
    return w.charAt(0).toUpperCase()+w.slice(1);
  }).join(' ');
}

function fieldData(p){
  const razao=esc(v('e-razao')),cnpj=esc(v('e-cnpj')),end=esc(v('e-end'));
  const endTxt=end||'<i>[endereço a confirmar]</i>';
  const curso=esc(v('c-curso')),nr=esc(v('c-nr')),base=esc(v('c-base')),carga=esc(v('c-carga'));
  const d=dataField(),dataExt=extenso(d),cidade=esc(v('c-cidade')||'Porto Alegre'),fecho=esc(v('c-fecho'));
  const valid=validadeISO();
  const signs=[sign(p.nome||'Participante','')];
  if(chk('c-inst-on'))signs.push(sign(v('c-inst')||'Instrutor','(INSTRUTOR)'+(v('c-instrole')?'<br>'+esc(v('c-instrole')):'')+(v('c-instcbo')?'<br>'+esc(v('c-instcbo')):'')));
  signs.push(sign(v('r-nome'),'(RESPONSÁVEL TÉCNICO)<br>'+esc(v('r-tit'))+'<br>'+esc(v('r-reg'))));
  return {
    corp:'A <b>'+razao+'</b>, inscrita no <b>CNPJ: '+cnpj+'</b>, e localizada na '+endTxt+' certifica que',
    nome:esc(titleCasePT(p.nome||'Nome do Participante')),
    desc:'inscrito no <b>CPF: '+(esc(p.cpf)||'—')+'</b>, participou do <b>'+curso+'</b> em conformidade com a <b>'+nr+'</b>'+(base?', conforme <b>'+base+'</b>':'')+', realizado em '+dataExt+', com carga horária de <b>'+carga+'</b>, '+fecho+'.',
    place:cidade+', '+dataExt+'.',
    signs:signs.join(''),
    vCurso:curso,
    vSub:'Carga horária total: '+carga+'.  Data: '+curto(d)+(valid?'.  Validade: '+curto(valid):'')+'.',
    vBody:v('c-conteudo')||'(Selecione um modelo de NR.)',
    vInfo:'<b>'+razao+'. CNPJ: '+cnpj+'</b><br><b>Endereço:</b> '+endTxt+'<br><b>Telefone:</b> '+esc(v('e-tel'))+'  <b>E-mail:</b> '+esc(v('e-email'))+'  <b>Site:</b> '+esc(v('e-site'))
  };
}
/* nm/sub já chegam escapados onde vêm do usuário; sign monta só marcação fixa */
function sign(nm,sub){return '<div class="sign"><div class="ln"></div><div class="nm">'+esc((nm||'').toUpperCase())+'</div><div class="rl">'+sub+'</div></div>';}

/* ===== alerta de registro incoerente (CRP em titulação técnica) ===== */
function checkReg(){
  const reg=v('r-reg').toUpperCase(),tit=v('r-tit').toLowerCase();
  const box=document.getElementById('reg-warn');if(!box)return;
  const tecnico=/(técnic|tecnic|engenh|médic|medic)/.test(tit);
  if(/\bCRP\b/.test(reg)&&tecnico){
    box.style.display='block';
    box.innerHTML='⚠ <b>CRP</b> é o registro do Conselho de <b>Psicologia</b> — incompatível com a titulação informada. Para TST o correto costuma ser o <b>registro no MTE/SRTE</b>; Eng. de Segurança → <b>CREA</b>; Médico do Trabalho → <b>CRM</b>. Confirme com o profissional.';
  }else box.style.display='none';
}

/* ===== preview ===== */
function render(){
  document.getElementById('inst-fields').style.display=chk('c-inst-on')?'block':'none';
  document.getElementById('pf-back').style.display=chk('c-verso-on')?'inline-block':'none';
  if(!chk('c-verso-on')&&page==='back')showPage('front');
  const valid=validadeISO();
  document.getElementById('valid-show').textContent=parseInt(v('c-vmeses'),10)>0?(valid?curto(valid):'—'):'não vence';
  const f=fieldData(person());
  document.getElementById('o-corp').innerHTML=f.corp;
  setName(f.nome,document.getElementById('o-nome'));
  document.getElementById('o-desc').innerHTML=f.desc;
  document.getElementById('o-place').textContent=f.place;
  document.getElementById('o-signs').innerHTML=f.signs;
  document.getElementById('v-curso').textContent=f.vCurso;
  document.getElementById('v-sub').textContent=f.vSub;
  const vb=document.getElementById('v-body');vb.textContent=f.vBody;fitBody(vb);
  document.getElementById('v-info').innerHTML=f.vInfo;
  checkReg();
  saveFields();
}
/* nome: encolhe a fonte até caber na largura real do container; régua acompanha */
function setName(name,el){
  el.textContent=name;
  const limit=(el.parentElement&&el.parentElement.clientWidth)||900;
  let s=44;el.style.fontSize=s+'px';
  while(el.scrollWidth>limit&&s>20){s--;el.style.fontSize=s+'px';}
  const rule=el.nextElementSibling;
  if(rule&&rule.classList.contains('name-rule')){rule.style.width=Math.min(el.scrollWidth+24,limit)+'px';rule.style.maxWidth='none';}
}
/* verso: acha o MAIOR tamanho em [min,max] que cabe sem cortar.
   Cresce em listas curtas (ex.: NR-18) e encolhe em conteúdo longo (NR-35).
   Mede com justify-content:flex-start para o flex:1 não mascarar o overflow. */
function fitBody(el){
  const max=22,min=7;let best=min;
  for(let s=max;s>=min;s-=0.5){
    el.style.fontSize=s+'px';
    if(el.scrollHeight<=el.clientHeight){best=s;break;}
  }
  el.style.fontSize=best+'px';
}

/* ===== lote ===== */
function normKey(k){return k.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z]/g,'');}
function mapRow(r){const k={};Object.keys(r).forEach(x=>k[normKey(x)]=r[x]);const nome=k.nome||k.participante||k.aluno||Object.values(r)[0]||'';const cpf=k.cpf||Object.values(r)[1]||'';return {nome:String(nome).trim()||'Sem nome',cpf:maskCPF(String(cpf).trim())};}
function loadBatch(rows){
  batch=rows.filter(r=>Object.values(r).some(x=>String(x).trim()!=='')).map(mapRow);batchIdx=0;
  const info=document.getElementById('batch-info'),nav=document.getElementById('batch-nav');
  if(batch.length){
    const bad=batch.filter(p=>p.nome==='Sem nome'||!isValidCPF(p.cpf)).length;
    info.style.display='block';
    info.innerHTML='<b>'+batch.length+'</b> participante(s). Use ‹ › para conferir.'+(bad?'<br>⚠ <b>'+bad+'</b> com nome/CPF inválido — corrija antes de gerar.':'');
    nav.style.display='flex';updatePos();
  } else{info.style.display='none';nav.style.display='none';}
  render();
}
function parseText(t,cb){
  if(!t.trim()){cb([]);return;}
  const delim=t.includes('\t')?'\t':(t.includes(';')?';':',');
  const hasHeader=/nome|cpf|participante|aluno/i.test(t.split('\n')[0]);
  const res=Papa.parse(t.trim(),{header:hasHeader,delimiter:delim,skipEmptyLines:true});
  cb(hasHeader?res.data:res.data.map(a=>({nome:a[0],cpf:a[1]||''})));
}
function parseBatch(){parseText(document.getElementById('f-batch').value,loadBatch);}
function importFile(e){
  const f=e.target.files[0];if(!f)return;
  const rd=new FileReader();
  rd.onload=ev=>{document.getElementById('f-batch').value=String(ev.target.result||'');parseBatch();};
  rd.readAsText(f);
}
function navBatch(d){batchIdx=(batchIdx+d+batch.length)%batch.length;updatePos();render();}
function updatePos(){const p=batch[batchIdx];const bad=p&&(p.nome==='Sem nome'||!isValidCPF(p.cpf));document.getElementById('batch-pos').textContent=(batchIdx+1)+' / '+batch.length+' · '+(p?.nome||'')+(bad?' ⚠':'');}
function downloadTemplate(){const csv='nome,cpf\nMaria A. da Silva,000.000.000-00\nJoão Pereira,111.111.111-11\n';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='modelo-turma-vetor.csv';a.click();}

/* ===== impressão nativa — texto vetorial, sem html2canvas ===== */
function certFrontHTML(f){
  return '<div class="cert">'+
    '<img class="wm" src="'+ASSETS.symbol+'">'+
    '<div class="cframe"></div>'+
    '<div class="cinner">'+
      '<img class="clogo" src="'+ASSETS.logoV+'">'+
      '<h1 class="ctitle">CERTIFICADO DE CONCLUSÃO</h1>'+
      '<div class="corp">'+f.corp+'</div>'+
      '<div class="name-wrap"><div class="cname">'+f.nome+'</div><div class="name-rule"></div></div>'+
      '<div class="desc">'+f.desc+'</div>'+
      '<div class="place">'+f.place+'</div>'+
      '<div class="signs">'+f.signs+'</div>'+
    '</div>'+
  '</div>';
}
function certBackHTML(f){
  return '<div class="cert">'+
    '<div class="cframe"></div>'+
    '<div class="v-inner">'+
      '<div class="v-title">'+f.vCurso+'</div>'+
      '<div class="v-sub">'+f.vSub+'</div>'+
      '<div class="v-rule"></div>'+
      '<div class="v-h">CONTEÚDO PROGRAMÁTICO DO CURSO</div>'+
      '<div class="v-body">'+escapeHTML(f.vBody)+'</div>'+
      '<div class="v-foot"><img src="'+ASSETS.logoH+'"><div class="info">'+f.vInfo+'</div></div>'+
    '</div>'+
  '</div>';
}

/* validação obrigatória antes de emitir */
function validateForExport(people){
  const errs=[];
  if(!dataField())errs.push('• Informe a data de realização.');
  if(!v('e-end'))errs.push('• Informe o endereço da empresa (obrigatório no certificado).');
  if(!v('r-nome'))errs.push('• Informe o responsável técnico.');
  people.forEach((p,i)=>{
    const who='• Participante '+(i+1)+(p.nome&&p.nome!=='Sem nome'?(' ('+p.nome+')'):'');
    if(!p.nome||p.nome==='Sem nome'||p.nome==='Nome do Participante')errs.push(who+': nome ausente.');
    if(!isValidCPF(p.cpf))errs.push(who+': CPF inválido ou ausente.');
  });
  return errs;
}

function safeName(s){return (s||'').replace(/[\\/:*?"<>|]/g,' ').replace(/\s+/g,' ').trim();}
function fileIndiv(nome,nr){return safeName('Certificado - '+titleCasePT(nome||'Participante').slice(0,60)+' - '+nr);}
function fileLote(nr,courseISO,n){return safeName('Certificados - '+nr+' - '+curto(courseISO).replace(/\//g,'-')+' - turma ('+n+')');}

function exportPDF(){
  const withBack=chk('c-verso-on');
  const people=(mode==='lote'&&batch.length)?batch:[person()];
  const errs=validateForExport(people);
  if(errs.length){alert('Não é possível gerar o PDF. Corrija:\n\n'+errs.join('\n'));return;}
  if(!withBack&&!confirm('O verso (conteúdo programático) está DESATIVADO. O certificado sairá só com a frente, sem conteúdo programático. Gerar mesmo assim?'))return;

  const courseISO=dataField(),nr=v('c-nr')||'NR';
  const separate=(mode==='lote'&&people.length>1&&chk('c-lote-sep'));

  const items=people.map(p=>({p,f:fieldData(p)}));

  const area=document.getElementById('print-area'),oldTitle=document.title;
  const renderSet=its=>{
    let html='';its.forEach(it=>{html+=certFrontHTML(it.f);if(withBack)html+=certBackHTML(it.f);});
    area.innerHTML=html;
    area.querySelectorAll('.cname').forEach(el=>setName(el.textContent,el));
    area.querySelectorAll('.v-body').forEach(el=>fitBody(el));
  };

  whenFontsReady().then(()=>{
    if(separate){
      if(!confirm('Serão gerados '+items.length+' PDFs separados.\nO navegador abrirá uma janela "Salvar como PDF" para cada participante, um de cada vez, já com o nome no arquivo.\n\nContinuar?')){document.title=oldTitle;render();return;}
      /* print() é bloqueante no Chrome/Edge: cada diálogo aparece em sequência */
      items.forEach(it=>{
        renderSet([it]);
        document.title=fileIndiv(it.p.nome,nr);
        window.print();
      });
      document.title=oldTitle;render();
    } else {
      renderSet(items);
      document.title=items.length===1?fileIndiv(items[0].p.nome,nr):fileLote(nr,courseISO,items.length);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{window.print();document.title=oldTitle;render();}));
    }
  });
}

/* ===== escala do preview ===== */
function fit(){const stage=document.querySelector('.stage');const scale=Math.min(1,(stage.clientWidth-60)/1123);const sc=document.getElementById('scaler');sc.style.transform='scale('+scale+')';sc.style.height=(794*scale)+'px';}
function whenFontsReady(){return (document.fonts&&document.fonts.ready)?document.fonts.ready.catch(()=>{}):Promise.resolve();}
window.addEventListener('resize',fit);
window.addEventListener('load',()=>{loadFields();fit();applyTemplate();whenFontsReady().then(render);});
loadFields();fit();applyTemplate();
