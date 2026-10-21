# Research Compass · UXR framework

A practical UX research methodology guide and toolkit for UX designers working with a product team. Originally prototyped on GPT Sites; this repository contains the portable HTML, CSS and JavaScript source.

## What it does

- Seven research stages: UX readiness, kickoff and framing, planning, data collection, analysis, restitution and decisions, retrospective and reuse.
- Context-driven objectives in every stage, with supporting guides nested beneath each objective. Intent, user access, constraints, selected methods and recorded difficulties shape the suggested objectives. Templates are reached through their guides or the dedicated menu.
- Twelve methodology guides covering collection, qualitative and quantitative analysis, evidence confidence, sampling and research design. Each includes what to collect, practical steps, limitations and an illustrative example.
- A method chooser based on the decision, available material, user access and constraints; options explain their prerequisites.
- Twelve editable templates with autosaved drafts and Markdown downloads.
- Stage-specific advice for thirteen common difficulties, including missing users, messy or conflicting evidence and unsupported improvement claims.
- Twenty practical activities with preparation guidance, agendas, questions and expected outputs.
- Direct navigation and activity search, with every section available immediately.
- A short project-context form carried into each activity, with rule-based starting-point suggestions.
- Standard and constrained project routes, explicit evidence limitations and decision checkpoints.
- Workshop mode with a discussion timer, session notes, output capture and completion checks.
- Multiple projects with visible JSON export and import controls, plus Markdown briefs. Project files include context, notes, checklists, session scratchpads, completion status, method selections, difficulties and template drafts, and can restore work in a fresh browser.

## Publish with GitHub Pages

In this repository, open **Settings → Pages** and choose:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Save the settings. GitHub will publish the contents of `docs/`. Publishing from **main → /(root)** also works: the root `index.html` forwards to `docs/` and preserves section links and query parameters. The project-site address is expected to be:

https://arnaudsyn.github.io/UXR-framework/

That address becomes usable after Pages is enabled and the first deployment succeeds. Subsequent changes to `docs/` on `main` are published automatically. There is no installation or build step. Asset paths are relative so the site works under the repository's URL path.

See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Run locally

From the repository root:

```sh
python3 -m http.server 4173 --directory docs
```

Open http://localhost:4173. For a portable offline copy, open `research-compass.html` directly in a browser. Browser storage behaviour for local files can vary; export a backup before moving or replacing a local copy.

## Move saved projects from GPT Sites

Project data is stored in the visitor's browser, separately for each site address. Moving the website source does not transfer saved projects automatically.

1. Open the existing GPT Sites version in the browser where your project is saved.
2. Choose **Export project → Export project (.json)** and save the JSON file.
3. Open the GitHub Pages version.
4. Choose **Import project** and select that file.

Restore each project you want to bring across. A restore adds a separate project and preserves existing work. The old GPT Sites deployment is not removed by this migration.

## Edit and check

The deployed source lives in:

```text
docs/index.html   Page structure and dialogs
docs/styles.css   Layout, colours and responsive styles
docs/content.js   Stages and activity content
docs/knowledge.js Method guides, templates and contextual advice
docs/app.js       Navigation, project storage, workshop mode and exports
```

Run the existing state and rendering checks with Node.js:

```sh
node --check docs/app.js
node --check docs/content.js
node --check docs/knowledge.js
node build-standalone.cjs
node check-flow.cjs
```

The checks cover stage / activity rendering, conditional homepage order, visible completion, context routing, escaped user content, saved notes, workshop capture, actual file export / import in a fresh session, invalid-import handling, context-driven objectives and nested guide hierarchy, guide and template links, method prerequisites, stage-scoped advice, saved template drafts and resource search. They do not verify browser layout or end-to-end accessibility.

The standalone `research-compass.html` is a snapshot of the current version. If editing the source, use `docs/` as the source of truth; run `node build-standalone.cjs` before distributing an updated copy.

## Data and access

The toolkit has no backend, shared database, AI service or team synchronisation. Project details, notes and progress stay in browser local storage unless the visitor exports them. Keep identifiable participant evidence in an approved research repository and link to it in the toolkit.

This GitHub repository is public. A public GitHub Pages deployment does not inherit the owner-only access controls of the original GPT Sites deployment. Publishing the toolkit does not publish visitors' browser-stored projects.

No GPT Sites credentials, hosting identifiers, `.openai` metadata, browser data or project exports are included in this repository.

## Methodology and facilitation guidance

Guides and template structures were developed from the supplied UXR Creator, UXR-activities and UXR-Framework-reference PDFs. The private reference files are not included in this public repository. Maze’s UX research guide is linked as further reading. Examples are illustrative, not findings from a real project.

Method suggestions are deterministic guidance based on explicit choices. They do not analyse project evidence or certify a study design. Advice appears from recorded difficulties and project constraints; update those inputs as the study changes. Session timings, agendas, measures and templates should be adapted to the question, the team, the decision and the applicable research practices.
