// State and rendering checks without a browser. This does not verify visual layout.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function boot(existing) {
  const listeners = {}, elements = new Map(), storage = new Map(existing || []);
  class Element {
    constructor(){this.innerHTML='';this.textContent='';this.value='';this.open=false;this.dataset={};this.classList={add(){},remove(){},toggle(){return false;}};this.events={};}
    addEventListener(event,fn){this.events[event]=fn;}
    setAttribute(){}
    showModal(){this.open=true;}
    close(){this.open=false;}
    focus(){}
    append(){}
  }
  const get = key => {if(!elements.has(key))elements.set(key,new Element());return elements.get(key);};
  get('#contextForm').elements={namedItem:k=>get('field-'+k)};
  const document={querySelector:get,getElementById:id=>get('#'+id),querySelectorAll:()=>[],addEventListener:(e,fn)=>listeners[e]=fn,body:new Element(),title:'',createElement:()=>({click(){},remove(){}})};
  const window={addEventListener:(e,fn)=>listeners[e]=fn,scrollTo(){}};
  const context={window,document,location:{hash:'#overview'},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},Date,Math,JSON,Blob,URL,console,FormData:class {constructor(form){return Object.entries(form.values)[Symbol.iterator]();}}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('docs/content.js','utf8'),context);
  vm.runInContext(fs.readFileSync('docs/app.js','utf8'),context);
  const navigate=hash=>{context.location.hash=hash;listeners.hashchange();};
  const clickAction=(action,id)=>listeners.click({target:{closest:s=>s==='[data-action]'?{dataset:{action,id}}:null},preventDefault(){}});
  const clickTab=tab=>listeners.click({target:{closest:s=>s==='[data-tab]'?{dataset:{tab}}:null}});
  return {get,listeners,storage,navigate,clickAction,clickTab,context};
}
(async()=>{
  const app=boot(),html=()=>app.get('#main').innerHTML;
  assert.match(html(),/Good research starts/);
  const phases=app.context.window.PHASES,activities=app.context.window.ACTIVITIES;
  assert.equal(phases.length,7);assert.equal(activities.length,20);
  assert.equal(new Set(activities.map(a=>a.id)).size,activities.length);
  for(const phase of phases){app.navigate('#phase/'+phase.id);assert.ok(html().includes(phase.name));}
  for(const activity of activities){app.navigate('#activity/'+activity.id);assert.ok(html().includes(activity.title));app.clickTab('run');assert.ok(html().includes(activity.steps[0][0]));app.clickTab('capture');assert.ok(html().includes(activity.fields[0][1]));}
  const context={name:'Prototype QA project',stage:'plan',problem:'A <script>alert(1)</script> must render as text',decision:'Choose the first improvement',users:'New customers',constraint:'locked',access:'none',intent:'evaluate',timing:'Decision in two weeks'};
  app.get('#contextForm').values=context;
  app.get('#contextForm').events.submit({preventDefault(){},target:app.get('#contextForm')});
  app.navigate('#overview');assert.match(html(),/A focused route/);assert.match(html(),/Start here/);
  app.navigate('#activity/frame-problem');assert.ok(!html().includes('<script>alert(1)</script>'));assert.match(html(),/&lt;script&gt;/);
  app.clickTab('capture');
  app.listeners.input({target:{matches:()=>true,dataset:{id:'frame-problem',note:'problem'},value:'An agreed problem statement'}});
  app.listeners.change({target:{matches:()=>true,dataset:{id:'frame-problem',check:'0'},checked:true}});
  app.clickAction('complete','frame-problem');assert.match(html(),/Completed · mark as open/);
  const reloaded=boot([...app.storage]);reloaded.navigate('#activity/frame-problem');reloaded.clickTab('capture');assert.match(reloaded.get('#main').innerHTML,/An agreed problem statement/);assert.match(reloaded.get('#progressText').textContent,/1 \/ 20/);
  reloaded.clickAction('workshop','frame-problem');assert.match(reloaded.get('#main').innerHTML,/FACILITATION MODE/);
  reloaded.listeners.input({target:{matches:()=>true,dataset:{id:'frame-problem',note:'session'},value:'Scratchpad survives the session'}});
  for(let i=0;i<8;i++)reloaded.clickAction('next-slide');
  assert.match(reloaded.get('#main').innerHTML,/Capture what the team agrees/);
  const saved=JSON.parse(reloaded.storage.get('research-compass-v1'));
  assert.equal(saved.projects[0].notes['frame-problem'].session,'Scratchpad survives the session');
  const file={size:1000,text:async()=>JSON.stringify({format:'research-compass-project',version:1,project:saved.projects[0]})};
  await reloaded.get('#importFile').events.change({target:{files:[file],value:'backup.json'}});
  const restored=JSON.parse(reloaded.storage.get('research-compass-v1'));
  assert.equal(restored.projects.length,2);assert.notEqual(restored.projects[0].id,restored.projects[1].id);assert.deepEqual(restored.projects[0].notes['frame-problem'],restored.projects[1].notes['frame-problem']);assert.deepEqual(restored.projects[0].context,restored.projects[1].context);
  reloaded.get('#jumpSearch').value='archive';reloaded.get('#jumpSearch').events.input();assert.match(reloaded.get('#jumpResults').innerHTML,/Archive research for reuse/);
  console.log('PASS: 7 stages / 20 activities, context routing, escaped content, note persistence, completion, workshop capture, backup restore and search.');
})().catch(e=>{console.error(e);process.exit(1);});
