// State and rendering checks without a browser. This does not verify visual layout.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function boot(existing) {
  const listeners = {}, elements = new Map(), storage = new Map(existing || []), downloads = [];
  class Element {
    constructor(){this.innerHTML='';this.textContent='';this.value='';this.open=false;this.dataset={};this.classList={add(){},remove(){},toggle(){return false;}};this.events={};}
    addEventListener(event,fn){this.events[event]=fn;}
    setAttribute(){}
    showModal(){this.open=true;}
    close(){this.open=false;}
    focus(){}
    click(){this.clicked=true;}
    append(){}
  }
  const get = key => {if(!elements.has(key))elements.set(key,new Element());return elements.get(key);};
  get('#contextForm').elements={namedItem:k=>get('field-'+k)};
  const document={querySelector:get,getElementById:id=>get('#'+id),querySelectorAll:()=>[],addEventListener:(e,fn)=>listeners[e]=fn,body:new Element(),title:'',createElement:()=>({click(){},remove(){}})};
  const window={addEventListener:(e,fn)=>listeners[e]=fn,scrollTo(){}};
  const context={window,document,location:{hash:'#overview'},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},Date,Math,JSON,Blob,URL:{createObjectURL:blob=>{downloads.push(blob);return 'blob:test';},revokeObjectURL(){}},console,FormData:class {constructor(form){return Object.entries(form.values)[Symbol.iterator]();}}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('docs/content.js','utf8'),context);
  vm.runInContext(fs.readFileSync('docs/knowledge.js','utf8'),context);
  vm.runInContext(fs.readFileSync('docs/app.js','utf8'),context);
  const navigate=hash=>{context.location.hash=hash;listeners.hashchange();};
  const clickAction=(action,id)=>listeners.click({target:{closest:s=>s==='[data-action]'?{dataset:{action,id}}:null},preventDefault(){}});
  const clickTab=tab=>listeners.click({target:{closest:s=>s==='[data-tab]'?{dataset:{tab}}:null}});
  return {get,listeners,storage,navigate,clickAction,clickTab,context,downloads};
}
(async()=>{
  const app=boot(),html=()=>app.get('#main').innerHTML;
  assert.match(html(),/Good research starts/);
  assert.ok(html().indexOf('id="quickTitle"')<html().indexOf('id="journeyTitle"'),'No-context homepage puts starting shortcuts first');
  const phases=app.context.window.PHASES,activities=app.context.window.ACTIVITIES;
  assert.equal(phases.length,7);assert.equal(activities.length,20);
  assert.equal(new Set(activities.map(a=>a.id)).size,activities.length);
  for(const phase of phases){app.navigate('#phase/'+phase.id);assert.ok(html().includes(phase.name));}
  for(const activity of activities){app.navigate('#activity/'+activity.id);assert.ok(html().includes(activity.title));app.clickTab('run');assert.ok(html().includes(activity.steps[0][0]));app.clickTab('capture');assert.ok(html().includes(activity.fields[0][1]));}
  const guides=app.context.window.RESEARCH_GUIDES,templates=app.context.window.RESEARCH_TEMPLATES,difficulties=app.context.window.RESEARCH_DIFFICULTIES;
  assert.equal(guides.length,12);assert.equal(templates.length,12);assert.equal(difficulties.length,13);
  for(const list of [guides,templates,difficulties])assert.equal(new Set(list.map(x=>x.id)).size,list.length);
  for(const g of guides){assert.ok(templates.some(t=>t.id===g.template));for(const id of g.related)assert.ok(guides.some(x=>x.id===id),id);for(const id of g.activities)assert.ok(activities.some(a=>a.id===id),id);app.navigate('#guide/'+g.id);assert.ok(html().includes(g.title));assert.match(html(),/What it cannot establish/);assert.match(html(),/Worked example/);}
  for(const t of templates){assert.ok(guides.some(g=>g.id===t.guide));app.navigate('#template/'+t.id);assert.ok(html().includes(t.title));assert.match(html(),/data-template=/);}
  for(const d of difficulties){assert.ok(guides.some(g=>g.id===d.guide),d.guide);assert.ok(activities.some(a=>a.id===d.activity),d.activity);}
  for(const ph of phases){assert.ok(difficulties.some(d=>d.phases.includes(ph.id)),'Advice is available for '+ph.id);assert.ok(templates.some(t=>t.phases.includes(ph.id)),'A template is available for '+ph.id);app.navigate('#templates/'+ph.id);assert.match(html(),/resource-card/);app.navigate('#help/'+ph.id);assert.match(html(),/What is getting in your way/);}
  for(const category of ['all','collection','analysis','planning']){app.navigate('#library/'+category);assert.match(html(),/Know why. Know how/);}
  app.navigate('#library/analysis');app.get('#guideSearch').events.input({target:{value:'coding'}});assert.match(app.get('#guideResults').innerHTML,/From raw evidence to qualitative insights/);assert.doesNotMatch(app.get('#guideResults').innerHTML,/User interviews/);
  app.navigate('#selector');const selector=app.get('#methodSelector');selector.values={goal:'evaluate',product:'new',access:'none',constraint:'locked'};selector.events.change({currentTarget:selector});assert.match(html(),/no testable material yet/);assert.match(html(),/Requires direct user access/);assert.ok(html().indexOf('href="#guide/existing-evidence"')<html().indexOf('href="#guide/usability"'),'Feasible existing evidence precedes conditional testing');
  app.listeners.change({target:{matches:s=>s==='[data-method]',dataset:{method:'existing-evidence'},checked:true}});assert.match(app.get('#selectedMethodSummary').innerHTML,/1 method/);
  app.navigate('#phase/collect');assert.match(html(),/I cannot reach the intended users/);assert.match(html(),/href="#guide\/existing-evidence"/);assert.match(html(),/href="#template\/evidence-extraction"/);assert.doesNotMatch(html(),/href="#template\/interview-protocol"/);
  app.navigate('#help/analyse');app.listeners.change({target:{matches:s=>s==='[data-issue]',dataset:{issue:'messy-data'},checked:true}});assert.match(app.get('#difficultyAdvice').innerHTML,/Keep the original material/);
  app.navigate('#phase/analyse');assert.match(html(),/The evidence is messy or hard to compare/);app.navigate('#phase/readiness');assert.doesNotMatch(html(),/The evidence is messy or hard to compare/);
  app.navigate('#template/qualitative-evidence-chain');app.listeners.input({target:{matches:s=>s==='[data-template]',dataset:{template:'qualitative-evidence-chain',field:'insights'},value:'Traceable <finding> from sources P01 and P03'}});app.navigate('#template/qualitative-evidence-chain');assert.match(html(),/Traceable &lt;finding&gt;/);app.clickAction('template-download','qualitative-evidence-chain');assert.match(await app.downloads.at(-1).text(),/Traceable <finding>/);
  const context={name:'Prototype QA project',stage:'plan',problem:'A <script>alert(1)</script> must render as text',decision:'Choose the first improvement',users:'New customers',constraint:'locked',access:'none',intent:'evaluate',timing:'Decision in two weeks'};
  app.get('#contextForm').values=context;
  app.get('#contextForm').events.submit({preventDefault(){},target:app.get('#contextForm')});
  app.navigate('#overview');assert.match(html(),/A focused route/);assert.match(html(),/Start here/);
  assert.ok(html().indexOf('id="journeyTitle"')<html().indexOf('id="quickTitle"'),'Context homepage keeps the research journey first');
  app.navigate('#activity/frame-problem');assert.ok(!html().includes('<script>alert(1)</script>'));assert.match(html(),/&lt;script&gt;/);
  app.clickTab('capture');
  app.listeners.input({target:{matches:selector=>selector==='[data-note]',dataset:{id:'frame-problem',note:'problem'},value:'An agreed problem statement'}});
  app.listeners.change({target:{matches:selector=>selector==='[data-check]',dataset:{id:'frame-problem',check:'0'},checked:true}});
  app.clickAction('complete','frame-problem');assert.match(html(),/Completed · mark as open/);
  const reloaded=boot([...app.storage]);reloaded.navigate('#activity/frame-problem');reloaded.clickTab('capture');assert.match(reloaded.get('#main').innerHTML,/An agreed problem statement/);assert.match(reloaded.get('#progressText').textContent,/1 \/ 20/);
  reloaded.clickAction('workshop','frame-problem');assert.match(reloaded.get('#main').innerHTML,/FACILITATION MODE/);
  reloaded.listeners.input({target:{matches:selector=>selector==='[data-note]',dataset:{id:'frame-problem',note:'session'},value:'Scratchpad survives the session'}});
  for(let i=0;i<8;i++)reloaded.clickAction('next-slide');
  assert.match(reloaded.get('#main').innerHTML,/Capture what the team agrees/);
  const saved=JSON.parse(reloaded.storage.get('research-compass-v1'));
  assert.equal(saved.projects[0].notes['frame-problem'].session,'Scratchpad survives the session');
  reloaded.get('#downloadBackup').events.click();
  const exported=await reloaded.downloads.at(-1).text();
  const file={size:Buffer.byteLength(exported),text:async()=>exported};
  await reloaded.get('#importFile').events.change({target:{files:[file],value:'backup.json'}});
  const restored=JSON.parse(reloaded.storage.get('research-compass-v1'));
  assert.equal(restored.projects.length,2);assert.notEqual(restored.projects[0].id,restored.projects[1].id);assert.deepEqual(restored.projects[0].notes['frame-problem'],restored.projects[1].notes['frame-problem']);assert.deepEqual(restored.projects[0].context,restored.projects[1].context);
  assert.deepEqual(restored.projects[0].checks['frame-problem'],restored.projects[1].checks['frame-problem']);assert.deepEqual(restored.projects[0].done,restored.projects[1].done);
  const fresh=boot();
  fresh.get('#importButton').events.click();assert.equal(fresh.get('#importFile').clicked,true,'Import is directly accessible');
  await fresh.get('#importFile').events.change({target:{files:[file],value:'project.json'}});
  const imported=JSON.parse(fresh.storage.get('research-compass-v1')).projects.at(-1);
  assert.deepEqual(imported.context,saved.projects[0].context);assert.deepEqual(imported.notes['frame-problem'],saved.projects[0].notes['frame-problem']);assert.deepEqual(imported.checks['frame-problem'],[0]);assert.deepEqual(imported.done,['frame-problem']);assert.deepEqual(imported.selectedMethods,['existing-evidence']);assert.deepEqual(imported.issues,['messy-data']);assert.equal(imported.methodSelection.product,'new');assert.equal(imported.templateNotes['qualitative-evidence-chain'].insights,'Traceable <finding> from sources P01 and P03');fresh.navigate('#template/qualitative-evidence-chain');assert.match(fresh.get('#main').innerHTML,/Traceable &lt;finding&gt;/);
  for(const id of ['brief-team','assess-readiness'])fresh.clickAction('complete',id);
  fresh.navigate('#overview');
  assert.match(fresh.get('#main').innerHTML,/completion-summary/);assert.match(fresh.get('#main').innerHTML,/phase-card completed/);assert.match(fresh.get('#main').innerHTML,/3 of 20 activities complete/);
  assert.match(fresh.get('#phaseNav').innerHTML,/phase-nav\s+completed/);assert.match(fresh.get('#phaseNav').innerHTML,/Completed · 2\/2/);
  fresh.clickAction('complete','brief-team');fresh.navigate('#overview');assert.match(fresh.get('#phaseNav').innerHTML,/In progress · 1\/2/);
  const beforeInvalid=fresh.storage.get('research-compass-v1');await fresh.get('#importFile').events.change({target:{files:[{size:10,text:async()=>'not json'}],value:'bad.json'}});assert.equal(fresh.storage.get('research-compass-v1'),beforeInvalid,'Invalid imports preserve saved projects');
  const legacy=JSON.parse(exported);for(const key of ['selectedMethods','issues','templateNotes','methodSelection'])delete legacy.project[key];const legacyApp=boot();await legacyApp.get('#importFile').events.change({target:{files:[{size:1000,text:async()=>JSON.stringify(legacy)}],value:'legacy.json'}});assert.deepEqual(JSON.parse(legacyApp.storage.get('research-compass-v1')).projects.at(-1).selectedMethods,[],'Earlier project backups remain compatible');
  for(const path of ['docs/knowledge.js','docs/app.js','docs/index.html','docs/content.js','README.md','research-compass.html'])assert.doesNotMatch(fs.readFileSync(path,'utf8'),/figjam|figma\.com/i,'No source-board references: '+path);
  reloaded.get('#jumpSearch').value='archive';reloaded.get('#jumpSearch').events.input();assert.match(reloaded.get('#jumpResults').innerHTML,/Archive research for reuse/);
  console.log('PASS: 12 guide/template routes and links, method prerequisites, stage-scoped advice, escaped and portable template drafts, legacy backups, stage/activity flows, conditional homepage order, visible completion, real file export/import in a fresh session, retained context/notes/checklists/progress, invalid-import protection, source-link removal and search.');
})().catch(e=>{console.error(e);process.exit(1);});
