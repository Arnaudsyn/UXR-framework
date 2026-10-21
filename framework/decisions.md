# Decisions and open questions

Updated 21 October 2026. **Confirmed direction** records explicit user requests. **Proposed** records a design recommendation to review. A record does not imply implementation or approved organisational policy.

## Confirmed direction

| ID | Date | Decision / direction | Basis |
| --- | --- | --- | --- |
| D-01 | 2026-10-21 | Keep a framework organisation workspace in the Git repository, usable locally through editable files | User requested a Notion-like organisation folder stored with Git |
| D-02 | 2026-10-21 | Help start a UX project properly, covering crucial project information as well as research | User clarified the broader project-launch purpose |
| D-03 | 2026-10-21 | Give newcomers a broad basket of how to proceed, with relevant checks and a first useful action | User described the starting-from-nothing experience |
| D-04 | 2026-10-21 | Make research planning a builder: selected work enters a basket and yields a tailored plan with guides, templates and tips | User described the key research-planning use case |
| D-05 | 2026-10-21 | Support entry at the beginning, middle or end; context should shape the route and expose escalation needs | User's v0.5 goals and audit request |
| D-06 | 2026-10-21 | Retain guided activities as a central execution feature | User explicitly highlighted their value |

## Proposed design choices

| ID | Proposal | Why it helps | Related work |
| --- | --- | --- | --- |
| P-01 | Separate stable outcomes, activity execution, selected plan items, resource references and blockers | Prevent guide visits or activity counts from standing in for project readiness | FW-01, FW-02, FW-04 |
| P-02 | Use one shared assessment to feed next action, stage progress, advice and planning | Keep the experience consistent as context changes | FW-03, FW-05, FW-13 |
| P-03 | Propose dependencies for explicit review when an item is added to the basket | Build a complete plan without silently expanding the user's commitment | FW-06, FW-07 |
| P-04 | Mark unknown inputs for checking and confirmed blockers for a response/escalation | Avoid both premature certainty and unnecessary hard stops | FW-05, FW-08 |
| P-05 | Preserve manual choices and output history when the proposal changes | Make the basket useful throughout a real project | FW-07, FW-09, FW-10 |

## Open questions

| ID | Question | Needed for |
| --- | --- | --- |
| Q-01 | Which launch outcomes are essential, conditional or optional for the first v0.5 route? | FW-01 |
| Q-02 | What should the interface call the basket: basket, plan or another term? | FW-06, FW-12 |
| Q-03 | Does one basket span project launch and research, or is the research plan a distinct working selection? | FW-06, FW-07 |
| Q-04 | Which roles can resolve purpose, access, scope and methodological blockers in the target organisation? | FW-05 |
| Q-05 | What is the smallest useful input for available effort, project impact and intended strength of claim? | FW-08 |
| Q-06 | Which readable plan export is needed beyond the existing JSON backup and Markdown? | FW-10 |
| Q-07 | Which representative real projects should validate the branch rules before implementation? | FW-01, FW-11 |

Resolve questions as the relevant work becomes ready. Record the answer and rationale, then update linked specifications and acceptance cases.
