# Research builder and working basket

Draft specification for v0.5. Confirmed direction: users select relevant work into a basket and get a tailored research plan with guides, templates and tips. Detailed interactions and rules below are proposals.

## What the user gets

An editable research plan for their question, intended decision and constraints. It explains what to do, why, in which order, what to prepare, what to capture and where to get help. Include preparation, collection, analysis and the resulting decision rather than stopping at a list of collection methods.

## Build the basket

1. Reuse project context and existing work. Ask for missing research questions, evidence, access, material or timing only when those answers affect the proposal.
2. Show relevant activities and methods with their contribution, prerequisites, likely work and limits. Present a suggested starting selection with an explanation.
3. Let the user add, remove and adjust items. Distinguish suggested items from items the user has selected; adding the same item twice must not create duplicate work accidentally.
4. For each selection, identify necessary preparation, analysis and decision work. Propose those dependencies with a reason for review; do not silently expand the commitment.
5. Review scope and feasibility, resolve critical gaps, and assemble the plan. Keep useful alternatives available when a prerequisite is blocked.
6. Return to the basket as the situation changes, preserving manual edits and completed work.

## What each plan item contains

| Part | Purpose |
| --- | --- |
| Question / outcome | Which uncertainty or project outcome the work addresses |
| Rationale | Why it belongs in this project's plan |
| Inputs and dependencies | Required context, evidence, material, access or earlier work |
| Expected output | The artefact or qualified finding to produce |
| Guided activity | A direct way to carry out the work |
| Supporting guide | Method explanation, limitations and examples |
| Template | A relevant editable starting structure |
| Contextual tips | Advice, caveats and warnings relevant to this item |
| Delivery details | Owner, order, timing/effort assumptions and current state |
| Completion review | Criteria and an explicit link to the outcome assessment |

Resource references should point to canonical guides, templates and activities, avoiding duplicate copies of their content. Completing an activity, saving a template and meeting an outcome remain distinct records.

## Tailored plan contents

- Problem, users, question, intended decision and scope.
- Existing evidence to reuse and the gaps it leaves.
- Selected activities/methods, rationale and expected evidence.
- Coverage/recruitment and access arrangements where relevant.
- Protocol, pilot and capture arrangements appropriate to the work.
- Analysis approach, measures where relevant and traceability requirements.
- Dependencies, responsible roles, timing assumptions and limitations.
- Expected outputs, decision/restitution and follow-up.
- Links to the selected guides, templates, tips and guided activities.

An item with missing essentials can remain in the draft basket with its limitation visible. The plan must not present an unresolved dependency as ready to execute.

## Context and feasibility

Time, effort, user access, evidence availability, product material and the intended claim should change the proposal. A short deadline can favour reusing suitable evidence and narrowing the question. It must not create a promise of population-level findings when the necessary work cannot fit. Quantitative evidence is not excluded simply because a project is small; an existing descriptive measure may be useful.

Keep manually chosen methods visible when conditions change. Explain new conflicts and offer an alternative, an access/scope action or escalation. Differentiate an optional enhancement from a prerequisite for a defensible claim.

## Illustrative example

A designer wants to understand a slow workflow. They add user interviews to the basket. The builder proposes checking existing workflow evidence, confirming relevant profiles and access, preparing/piloting an interview guide, collecting traceable reports, analysing patterns and sharing qualified findings for a decision. Each proposed addition states why it is useful; the designer reviews the selection.

If access is unavailable, the basket shows that dependency and offers an access action or a limited review of existing evidence. It does not describe that review as direct user validation. This example illustrates the interaction, not a mandatory method sequence for every workflow project.

## Portability and updates

The basket, plan edits, selections, references, outcomes and blocker state must be saved with the project and included in JSON export/import. Offer a readable plan export with useful resource links and context. Exact export formats and whether the basket also spans work outside research remain open decisions.

Changing context should offer a review of affected items, not replace the plan without explanation. Preserve previous completion and manual wording. Keep external participant evidence in its approved repository.

## Acceptance examples

- Selecting a method adds one editable plan item, with the appropriate resources and proposed dependencies.
- Removing an item identifies affected dependencies and preserves any existing notes/drafts.
- A short deadline changes the proposed work, not only the warning text.
- A blocked prerequisite remains visible with a concrete response and proposed responsible role.
- User selections and edits survive regeneration, reload, export and import.
- The assembled plan includes how evidence will be interpreted and used for a decision.
- A guided activity closes with an output review and an updated next step.

Delivery work: [FW-06 through FW-11](backlog.md).
