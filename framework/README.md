# Framework workspace

A repository-based workspace for organising Research Compass: product direction, specifications, work to do, decisions and evidence. Open the Markdown files locally or browse them on GitHub. Git keeps the history; no separate Notion workspace or service is needed.

**Current application:** v0.3.4. **Next planned release:** v0.5. Specifications here describe planned behaviour unless explicitly marked implemented.

## Start here

**Returning in a new session? Read the [session handoff](session-handoff.md) first.** It records the implemented baseline, confirmed direction, validation and next concrete task.

| Page | Purpose | Status |
| --- | --- | --- |
| [Session handoff](session-handoff.md) | Resume without reconstructing the conversation | Current at session close |
| [Product direction](vision.md) | Who we help, project launch scope and the basket concept | Direction confirmed; design to refine |
| [Project launch](project-launch.md) | Starting from zero and checking crucial information | Draft specification |
| [Research builder](research-builder.md) | Select work and assemble a tailored research plan with support | Draft specification |
| [Backlog](backlog.md) | Priorities, dependencies, acceptance and delivery status | Planned |
| [Decisions and questions](decisions.md) | Confirmed direction, proposals and unresolved choices | Living record |
| [v0.3.4 audit](audits/2026-10-21-v0.3.4.md) | Eight findings and ten reproducible scenario groups | Baseline recorded |

## Reference and clarification rules

1. **The user's explicit direction has the final word.** Apply their latest clarification when it differs from a reference or an earlier proposal, and record the decision.
2. **UXR-Framework-reference.pdf is the main framework reference.** Consult it to establish what a step is, its purpose, inputs, outputs, conditions and connections to other steps. The other supplied PDFs add detail and practical helpers.
3. **Ask the user when uncertainty remains.** Check the main reference and the user's instructions first. If a step's meaning or behaviour is still ambiguous, ask before committing that interpretation; unrelated work can continue.

These rules also apply when refining the draft specifications and backlog. Keep the reference PDF outside this public repository.

## Keeping this useful

- Put the intended experience in the brief/specifications, the delivery work in the backlog, and the reason for a choice in the decision log. Link between them.
- Use stable task IDs such as `FW-03`; track status as Proposed, Ready, In progress, Blocked or Done. A document existing does not make its feature Done.
- Keep confirmed user direction separate from implementation proposals. Resolve an open question by adding a dated decision and updating the affected specification.
- Mark a task Done only with implementation and verification evidence. Record what changed and which scenarios passed.
- Preserve audits as historical baselines. Add a new dated review when behaviour changes; update the backlog rather than rewriting an old finding as if it never existed.
- Keep private reference PDFs, participant evidence, credentials and visitor project exports outside this public repository. Use generic descriptions and approved evidence references.

The application source remains in the repository's website directory. This folder organises the work on the framework; it does not alter the visitor experience by itself.
