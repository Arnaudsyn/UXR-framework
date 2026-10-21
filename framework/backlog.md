# v0.5 backlog

Updated 21 October 2026. All implementation items below are **Proposed**; none is marked shipped by this planning update. Owners are unassigned. P1 establishes the framework and builder; P2 improves presentation and planning once the shared rules exist.

Flow: Proposed → Ready → In progress → Done. Use Blocked with the reason and next action. Before moving to Ready, resolve the relevant product questions and make acceptance concrete.

| ID | Priority | Work | Depends on | Acceptance / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| FW-01 | P1 | Map project launch and source branch points to stable outcomes, prerequisites and applicability | — | Review newcomer, mid-project and late-project examples; include limited routes, return loops and stop/escalation conditions | Proposed |
| FW-02 | P1 | Record outcome assessment and acknowledge existing work | FW-01 | Check outcomes from the stage view; existing outputs can count after review; states/references survive reload | Proposed |
| FW-03 | P1 | Calculate the next useful action from outcomes and blockers | FW-01, FW-02 | Completed stages advance; analysis-ready users reach analysis; missing prerequisites produce a focused action and reason | Proposed |
| FW-04 | P1 | Derive progress from relevant outcomes and activity applicability | FW-01, FW-02 | No required constrained alignment on an open project, blocker resolution without a blocker, or analysis irrelevant to the evidence | Proposed |
| FW-05 | P1 | Add persistent blocker and escalation handling | FW-01, FW-03 | Purpose/access/ownership gaps produce appropriate checks or escalation; unresolved critical items stay visible with response, owner/review state | Proposed |
| FW-06 | P1 | Build the selection basket and preserve user choices | FW-01, FW-02 | Add/remove/adjust work; distinguish suggestions from selections; prevent accidental duplicates; preserve existing notes | Proposed |
| FW-07 | P1 | Assemble an editable research plan with dependencies and resources | FW-03, FW-06 | Plan covers preparation, evidence, analysis and decision; selected items expose guides/templates/tips and proposed dependencies | Proposed |
| FW-08 | P1 | Make feasibility change the plan and method proposal | FW-05, FW-07 | Short time, blocked access and unsuitable material change proposed work and claims; retain manual choices with conflicts visible | Proposed |
| FW-09 | P1 | Connect guided activities and canvas review to outcomes and plan items | FW-02, FW-07 | Closeout reviews the output explicitly, captures gaps and returns to an updated next action; reading/filling alone never certifies an outcome | Proposed |
| FW-10 | P1 | Preserve project portability and migrate old project files | FW-02, FW-05, FW-07 | JSON round-trip retains the basket, plan edits, assessments and blockers; v1 notes/drafts/activity history survive without invented achievements | Proposed |
| FW-11 | P1 | Verify framework and research-builder journeys | FW-03 through FW-10 | All release scenarios below pass; keep existing persistence, escaping, export/import and reset/Undo checks | Proposed |
| FW-12 | P2 | Put checks, blockers and next action before supporting reading | FW-03, FW-05, FW-07 | Main action is clear; guides/templates remain accessible; critical warnings cannot be displaced by ordinary advice | Proposed |
| FW-13 | P2 | Make the remaining-work timeline consistent with the plan | FW-04, FW-07, FW-08 | Completed/unneeded work receives no allocation; missing capacity/recruitment assumptions remain explicit | Proposed |

## Release scenarios

- [ ] Starting from nothing: broad launch checklist, missing essentials and a clear first action, without premature method selection.
- [ ] Joining mid-project: acknowledge existing framing/plan and address only relevant gaps.
- [ ] Analysis-ready: use existing evidence and propose interpretation/coverage work without restarting.
- [ ] Decision blocked: identify the specific blocker and response, with ownership and review.
- [ ] Open project: conditional alignment and blocker-resolution work do not prevent completion.
- [ ] Urgent project: scope and proposed work adapt to feasibility; quantitative claims remain bounded.
- [ ] No user access or a critical missing profile: persistent, relevant response and an honest evidence limitation.
- [ ] No baseline for an improvement claim: establish a comparison or qualify the claim.
- [ ] Research selection: adding a method assembles relevant resources and proposed preparation/analysis dependencies for review.
- [ ] Plan changes: remove or change work, explain consequences and retain manual edits/history.
- [ ] Guided closeout: output review updates the outcome and next action without automatically certifying quality.
- [ ] All relevant outcomes met: coherent completion, closeout/reuse and remaining-work timeline.
- [ ] Portability: new and v1 project files preserve work across reload/import/export and reset/Undo.

## Audit traceability

| Baseline evidence | Delivery items |
| --- | --- |
| A01 next action repeats stage; A09 timeline ignores completion | FW-03, FW-13 |
| A02 independent checks/completion; A10 missing outcome model | FW-01, FW-02, FW-04, FW-09 |
| A03 universal activity denominator | FW-04 |
| A04 deadline-independent suggestions | FW-08 |
| A05 missing-purpose detection; A06 disappearing access warning | FW-05 |
| A07 warning hidden behind ordinary advice | FW-05, FW-12 |
| A08 disconnected template work | FW-02, FW-09 |
| New user direction: broader project launch and research basket | FW-01, FW-06, FW-07, FW-10 |

See the [baseline audit](audits/2026-10-21-v0.3.4.md), [product direction](vision.md) and [open decisions](decisions.md).
