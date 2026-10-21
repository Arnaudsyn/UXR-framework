# Research Compass: start here

Before continuing framework work, read [the session handoff](framework/session-handoff.md), then [the framework workspace](framework/README.md). Consult the linked vision, specifications, backlog and decision log for the work being undertaken. This repository is the durable project workspace across chats.

## User direction and reference hierarchy

- The user's explicit instructions have the final word. Record new clarifications in the decision log and update affected specifications.
- `UXR-Framework-reference.pdf` is the main reference for what each framework step is and should do: purpose, inputs, outputs, conditions, branches and return loops. The other supplied PDFs are supporting resources.
- If doubt remains after checking that reference and the user's instructions, ask the user before committing the ambiguous interpretation. Continue unrelated work where possible.
- Local PDF locations are recorded in `.local/framework-references.md`, which is deliberately excluded from Git. If unavailable, locate the supplied reference material or ask for the missing source; do not reconstruct uncertain step behaviour from memory.

## Product scope and release state

- The English-language product helps UX designers work with product teams, from launching a project properly through research and decisions. Users may enter at any stage.
- Keep guided activities central. The v0.5 direction combines checkable outcomes, a useful next action, contextual routes and escalation, and a research builder whose selected work forms a tailored plan with guides, templates and tips.
- v0.3.4 is the implemented baseline at this handoff. v0.5 specifications and backlog items are proposals, not shipped behaviour. Update the handoff when this changes.
- Keep confirmed direction, proposed design choices and unresolved questions distinct. Preserve dated audits as historical evidence.

## Repository and delivery

- GitHub repository: `Arnaudsyn/UXR-framework`; active branch: `github-main`, tracking `origin/main` at the handoff. Inspect the current branch/status before edits and preserve unrelated work.
- GitHub Pages serves `docs/`. The root page redirects there. `research-compass.html` is the generated portable copy; update it with `node build-standalone.cjs` when application source changes.
- GitHub Pages is the current host. The former GPT Sites deployment is historical; do not deploy updates there as part of this project.
- Framework planning lives in `framework/`. Keep its index, backlog, decisions and handoff consistent as work advances.
- Reference PDFs and screenshots containing browser/project state stay local. Never add credentials, visitor project exports or identifiable participant evidence to this public repository.
- Preserve JSON project portability and older backups, user notes/drafts, reset/Undo, completion visibility and independent guide/template navigation. Keep source-board backlinks out of the visitor interface.
- Source or template changes need appropriate syntax checks, `node build-standalone.cjs` and `node check-flow.cjs`; visually verify UI changes. Documentation-only changes need link and diff checks.
- `node framework/audits/audit-v0.3.4.cjs` reproduces baseline gaps. Its passing assertions confirm those old behaviours, not successful v0.5 implementation. Adapt or replace it as fixes land.

At session end, update the handoff with what actually changed, validation, unresolved questions and the next concrete task. Keep machine-specific paths and local evidence in `.local/` rather than public documentation.
