# Session handoff

Updated 21 October 2026. **Status: session ready to close; v0.5 planning recorded, implementation not started.**

## Resume in a new session

1. Read this page and the repository's [agent instructions](../AGENTS.md).
2. Read [product direction](vision.md), [decisions](decisions.md) and the relevant [backlog](backlog.md) entries.
3. Inspect the current Git branch, status and remote head. Preserve unrelated edits.
4. For framework semantics, consult `UXR-Framework-reference.pdf` first, with the user's explicit direction taking precedence. Ask the user if doubt remains. Local source locations are in the ignored `.local/framework-references.md` file.
5. The recommended next task is **FW-01: map the primary reference into outcomes and decision rules**. Use the new-session request to determine whether to continue that task or another part of the backlog.

No recap from the user is needed for the context below. Open design questions remain questions, not assumptions already approved.

## Current product and source

- Product: Research Compass, an English-language UX project/research framework for UX designers facilitating with product teams.
- Repository: [Arnaudsyn/UXR-framework](https://github.com/Arnaudsyn/UXR-framework).
- Live site: [Research Compass v0.3.4](https://arnaudsyn.github.io/UXR-framework/docs/?v=0.3.4).
- Current application baseline: **v0.3.4**, source commit `1fd0686e1f374844b652c024dd11019cf9fca0f8`.
- Later commits add the framework workspace, planning documents and reference rules. They do not implement v0.5 or change the visitor interface.
- GitHub Pages publishes `docs/`. The root page redirects there, preserving section/query navigation. The portable single-file copy is generated from the same source.
- The former GPT Sites deployment is historical. GitHub is the active project source and host.

## What already works

- Seven stages, twenty activities, thirteen methodology guides and thirteen editable templates.
- Guided activities and facilitation mode: steps, prompts, optional timer, scratchpad and capture/check screens. The user particularly values this feature.
- Context: common and custom problems, user profiles/personas with separate population/reachable/target counts, finish date, intent, access and constraints.
- Context-dependent objective text, method suggestions, advice cards and a provisional weekday timeline.
- Project notes, activity checks, completion indicators and multiple projects.
- JSON export/import, including legacy project files; Markdown briefs and template downloads.
- Context reset that preserves activity/template work; project deletion; confirmation and session Undo.
- A seven-section UX framing canvas adapted from the supplied framing PDF, with section navigation, tips and explicit copying of context into empty fields for review.
- No source-board backlinks in the visitor interface. Guidance and templates remain independently browsable.

## Confirmed direction for v0.5

The product should help someone get a useful next step whether they are starting, joining midway or close to a decision. It should cover launching a UX project properly, including crucial context and agreements, as well as research execution.

For a newcomer, provide a broad starting basket/checklist of what to consider and how to proceed. Existing work should count after review. The relevant outcomes should be checkable; guides and templates support achieving them.

Research planning is the key builder experience: users select useful work into a basket and receive an editable, tailored research plan with guides, templates, tips and the preparation/analysis/decision work needed around the selection. Keep the user's choices and manual edits when context changes.

Context should meaningfully affect scope and feasibility. Short time, unavailable users or unsuitable material must change the proposed work and its claims. Missing purpose, access or ownership should lead to a visible check, action or escalation appropriate to the situation.

Guided activities remain central to carrying out the proposed work. Their closeout should support reviewing outputs and updating the next step.

**Reference hierarchy:** the user's explicit direction takes precedence; `UXR-Framework-reference.pdf` is the main reference for each step's purpose and behaviour; other PDFs add detail. Ask if uncertainty remains after consulting both the main reference and the user's direction.

## Audit: why the framework needs structural work

The [audit](audits/2026-10-21-v0.3.4.md) records eight findings, supported by ten reproducible scenario groups:

- The recommended stage repeats the declared stage and does not advance with completed work.
- Objectives lead to reading but have no recorded outcome state. Activity checks and completion are independent.
- All twenty activities count towards progress, including conditional work that may not apply.
- A short deadline produces the same method suggestions as a long deadline.
- Missing purpose is not detected automatically; access warnings disappear at some stages; escalation has no persistent workflow state.
- Advice ordering can hide a warning behind two ordinary advice cards.
- Completed template drafts and existing outputs cannot be explicitly reviewed and linked to outcome progress.
- Timeline allocation ignores completed work.

The reference framework already contains branches, limited routes, stop/escalation and return loops. The central task is to make those decisions executable and coherent.

## Suggested next work: FW-01

Produce a reviewable mapping of the primary reference's steps. For each step, record:

- Stable ID, name, purpose and relevant project context.
- Required inputs and expected output/outcome.
- Entry/readiness checks and what counts as already achieved.
- Whether it is essential, conditional or optional, and why.
- Decision branches, next steps, return loops and stop/escalation conditions.
- Supporting activities, guides/templates and the source section used.
- Any explicit user override or unresolved ambiguity.

Validate the map against newcomer, mid-project, urgent/constrained and decision-blocked examples. Ask about unresolved step meaning before treating the map as agreed. This is proposed implementation preparation; the user has not approved every row of such a map yet.

Then progress through the linked backlog: outcome assessment and next action, applicability and blockers, basket and research-plan assembly, feasibility, guided closeout, portability and verification. All thirteen backlog items are currently **Proposed**.

## Open design questions

See [Q-01 through Q-07](decisions.md): essential versus conditional launch outcomes; basket naming; one shared basket versus a separate research selection; escalation roles; minimal feasibility inputs; readable plan exports; representative projects for validation.

Ask these when needed for the relevant work. Do not require the user to answer the whole list before useful independent progress.

## Saved documentation and evidence

- [Workspace index](README.md)
- [Product direction](vision.md)
- [Project launch specification](project-launch.md)
- [Research builder specification](research-builder.md)
- [Backlog and release scenarios](backlog.md)
- [Confirmed direction, proposed choices and questions](decisions.md)
- [Historical audit](audits/2026-10-21-v0.3.4.md)
- [Diagnostic script](audits/audit-v0.3.4.cjs) and [recorded observations](audits/v0.3.4-observations.json)

The supplied PDFs and browser screenshot evidence remain local and are not in the public repository. All four supplied PDFs were available at session close. Machine-specific locations and publishing notes are in `.local/framework-references.md`.

## Validation at this handoff

The existing state/rendering regression suite passed and the diagnostic reproduced all ten baseline scenario groups. Markdown file links and diff formatting were checked. Application code is unchanged by the handoff.

The diagnostic's assertions deliberately describe v0.3.4 shortcomings. As behaviour is fixed, replace those assertions with the v0.5 acceptance scenarios; do not preserve a bug merely to keep the old diagnostic green.

Preserve existing backups, activity history, notes, templates, context reset and Undo while adding new state. Old activity completion must not silently certify every newly introduced outcome.
