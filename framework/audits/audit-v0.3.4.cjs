// Reproduce current framework gaps without changing the application or real browser projects.
// These assertions describe v0.3.4, not the desired v0.5 behaviour.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
process.chdir(path.resolve(__dirname,'../..'));
const harness=fs.readFileSync('check-flow.cjs','utf8').split('(async()=>{')[0];
const boot=new Function('require',harness+'\nreturn boot;')(require);
const KEY='research-compass-v1',now='2026-10-21T12:00:00Z';
const baseline=JSON.parse(boot(undefined,now).storage.get(KEY)).projects[0];
const fixture=overrides=>({...JSON.parse(JSON.stringify(baseline)),id:'audit-project',hasContext:true,...overrides,context:{...baseline.context,name:'Audit fixture',stage:'plan',decision:'Choose which workflow problem to address',users:'Current users',access:'direct',...overrides?.context}});
const launch=p=>boot([[KEY,JSON.stringify({version:1,activeId:p.id,projects:[p]})]],now);
const state=a=>{const db=JSON.parse(a.storage.get(KEY));return db.projects.find(p=>p.id===db.activeId);};
const page=(a,hash)=>{a.navigate(hash);return a.get('#main').innerHTML;};
const findings=[];
function observe(id,title,fn){const evidence=fn();findings.push({id,title,evidence});}
observe('A01','Stage recommendation does not advance when work is complete',()=>{
 const a=launch(fixture({context:{stage:'readiness'}}));
 const before=page(a,'#overview');
 a.clickAction('complete','brief-team');a.clickAction('complete','assess-readiness');
 const after=page(a,'#overview');
 for(const html of [before,after])assert.match(html,/<a class="button quiet" href="#phase\/readiness">Go to suggested starting point/);
 assert.match(after,/1 of 7 stages completed/);
 assert.doesNotMatch(after,/class="tiny-tag">Start here/);
 return 'Both readiness activities completed: the homepage CTA still points to readiness, while the journey has no Start here card.';
});
observe('A02','Completion and moving-on checks are independent',()=>{
 const a=launch(fixture());a.clickAction('complete','frame-problem');
 assert.ok(state(a).done.includes('frame-problem'));assert.deepEqual(state(a).checks,{});assert.deepEqual(state(a).notes,{});
 const b=launch(fixture());const checks=b.context.window.ACTIVITIES.find(x=>x.id==='frame-problem').checks;
 checks.forEach((_,i)=>b.listeners.change({target:{matches:s=>s==='[data-check]',dataset:{id:'frame-problem',check:String(i)},checked:true}}));
 assert.equal(state(b).checks['frame-problem'].length,checks.length);assert.deepEqual(state(b).done,[]);
 return 'An empty activity can be marked completed; checking every moving-on criterion does not complete it or produce a next action. No override rationale is recorded.';
});
observe('A03','Conditional activities prevent route-specific completion',()=>{
 const a=launch(fixture({context:{stage:'kickoff',constraint:'open'}}));
 a.clickAction('complete','frame-problem');a.clickAction('complete','design-mandate');
 const html=page(a,'#phase/kickoff');assert.match(html,/#activity\/align-constraints/);
 assert.match(a.get('#phaseNav').innerHTML,/Not started|In progress/);assert.match(a.get('#phaseNav').innerHTML,/2\/3/);
 const b=launch(fixture({context:{stage:'share'}}));b.clickAction('complete','prepare-story');b.clickAction('complete','facilitate-decisions');page(b,'#phase/share');assert.match(b.get('#phaseNav').innerHTML,/2\/3/);
 return 'An open project remains at 2/3 kickoff activities until constrained alignment is completed. Sharing remains at 2/3 without resolving a blocker, even if no blocker exists. There is no not-applicable status.';
});
observe('A04','Deadlines do not change method recommendations or the activity route',()=>{
 const common={stage:'plan',intent:'measure',access:'direct',constraint:'open'};
 const short=launch(fixture({context:{...common,finishDate:'2026-10-22'}})),long=launch(fixture({context:{...common,finishDate:'2026-12-18'}}));
 const cards=html=>html.match(/<div class="method-results">([\s\S]*?)<div class="selected-methods"/)[1];
 assert.equal(cards(page(short,'#selector')),cards(page(long,'#selector')));
 const shortPlan=page(short,'#phase/plan');assert.match(shortPlan,/Only 2 weekdays/);
 const rows=html=>html.match(/<div class="activity-list">([\s\S]*?)<div class="phase-footer">/)[1];
 assert.equal(rows(shortPlan),rows(page(long,'#phase/plan')));
 return 'A two-weekday deadline and a long deadline produce byte-identical method cards and planning activities. The short-time warning does not alter the recommended work.';
});
observe('A05','Missing decision is not automatically detected',()=>{
 const a=launch(fixture({context:{stage:'collect',decision:''}}));
 const html=page(a,'#phase/collect');assert.doesNotMatch(html,/<h3>The question or decision is unclear<\/h3>/);
 assert.match(html,/#guide\/interviews/);assert.match(html,/#activity\/run-sessions/);
 const help=page(a,'#help/collect');assert.doesNotMatch(help,/value="unclear-question"|data-issue="unclear-question"/);
 return 'With no decision recorded, collection still presents direct-user guides and sessions. The unclear-question difficulty is neither inferred nor offered for that stage.';
});
observe('A06','Access blocker disappears in kickoff and sharing advice',()=>{
 const a=launch(fixture({context:{access:'none'}}));
 assert.match(page(a,'#phase/plan'),/<h3>I cannot reach the intended users<\/h3>/);
 assert.doesNotMatch(page(a,'#phase/kickoff'),/<h3>I cannot reach the intended users<\/h3>/);
 assert.doesNotMatch(page(a,'#phase/share'),/<h3>I cannot reach the intended users<\/h3>/);
 assert.doesNotMatch(page(a,'#overview'),/I cannot reach the intended users/);
 return 'The same no-access state shows a warning in planning, but not kickoff, sharing or the homepage. A generic focused-route label is not a persistent escalation.';
});
observe('A07','Advice order can hide a warning behind two advice cards',()=>{
 const a=launch(fixture({context:{access:'none'},issues:['stale-evidence','unclear-question']}));
 const html=page(a,'#phase/plan'),advice=html.match(/<section class="stage-advice"[\s\S]*?<\/section>/)[0];
 assert.match(advice,/I cannot tell whether earlier research still applies/);assert.match(advice,/The question or decision is unclear/);
 assert.doesNotMatch(advice,/I cannot reach the intended users/);assert.match(advice,/See all 3 relevant advice cards/);
 return 'Two earlier advice entries take the visible slots; the no-user-access warning is behind See all 3 relevant advice cards. No severity or decision-impact sorting occurs.';
});
observe('A08','Template work is disconnected from outcome and activity progress',()=>{
 const a=launch(fixture({context:{stage:'kickoff'}}));const t=a.context.window.RESEARCH_TEMPLATES.find(x=>x.id==='ux-framing-canvas');
 for(const [field] of t.sections)a.listeners.input({target:{matches:s=>s==='[data-template]',dataset:{template:t.id,field},value:'Audit test draft'}});
 assert.deepEqual(state(a).done,[]);assert.deepEqual(state(a).checks,{});
 const html=page(a,'#phase/kickoff');assert.match(html,/#guide\/project-framing/);assert.doesNotMatch(html,/Audit test draft/);
 return 'A fully populated framing draft leaves all activity checks and completion unchanged. This is not evidence that the draft is valid; the missing capability is an explicit review-and-link action.';
});
observe('A09','Timeline ignores completed work',()=>{
 const a=launch(fixture({context:{stage:'readiness',finishDate:'2026-12-18'},done:baseline.done}));
 const before=page(a,'#phase/plan').match(/<div class="timeline-list">[\s\S]*?<p class="planning-note">This is a planning sketch/)[0];
 for(const item of a.context.window.ACTIVITIES)a.clickAction('complete',item.id);
 const after=page(a,'#phase/plan').match(/<div class="timeline-list">[\s\S]*?<p class="planning-note">This is a planning sketch/)[0];assert.equal(before,after);
 return 'Completing every activity leaves the same readiness-through-sharing schedule. The timeline uses the declared stage, not remaining work.';
});
observe('A10','Objectives have no outcome controls and activities have no applicability state',()=>{
 const a=launch(fixture()),html=page(a,'#phase/plan');const objectives=html.match(/<div class="objective-list">[\s\S]*?<p class="objective-template-note">/)[0];
 assert.doesNotMatch(objectives,/<input|data-action=/);assert.match(objectives,/#guide\//);
 const p=state(a);for(const key of ['outcomes','escalations','activityStatus','route'])assert.equal(key in p,false);
 assert.doesNotMatch(fs.readFileSync('docs/app.js','utf8'),/data-action="(?:skip-activity|mark-not-applicable|escalate|resolve-escalation)"/);
 return 'Objectives contain guide links only. The stored project has no outcome, escalation, route or multi-status activity record; none of the related actions exist.';
});
const report={reviewedVersion:'0.3.4',reviewedCommit:'1fd0686e1f374844b652c024dd11019cf9fca0f8',fixtureDate:now,kind:'Current-state diagnostic; passing assertions reproduce gaps, not v0.5 acceptance tests',observations:findings};
fs.writeFileSync(path.join(__dirname,'v0.3.4-observations.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Reproduced ${findings.length} current-state scenario groups.`);findings.forEach(f=>console.log(`${f.id}: ${f.title}`));
