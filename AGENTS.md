# Research Compass prototype

## Start with the project context

Project purpose, journeys, feature documentation, decisions, draft specifications and backlog now live in the bilingual [UXR - Framework Notion workspace](https://app.notion.com/p/40bda503184980b99270ef9032fc8df8). Read the relevant Notion records before implementation. Do not reconstruct them from old Git planning files or maintain a competing backlog here. Notion is the project source of truth; this repository contains the prototype and technical validation only.

## Reference hierarchy

The user's explicit instructions have the final word. UXR-Framework-reference.pdf is the primary reference for step meaning and branch behaviour; supporting PDFs add detail. Consult the Notion reference register and ask if the required original is unavailable or ambiguity remains. Method packages and sample targets are adaptable recommendations. The limited route rejoins applicable preparation, collection and analysis with limitations kept visible. These confirmed directions do not mean v0.5 has shipped.

## Delivery

- Current app baseline: v0.3.4. Keep implemented behaviour distinct from future proposals.
- GitHub Pages publishes docs/. Root index.html redirects there; research-compass.html is the generated portable copy. Do not publish to the historical GPT Sites host.
- Preserve project JSON portability and older backups, notes/drafts, completion visibility, reset/Undo and independent guide/template navigation. Keep source-board backlinks out of the visitor UI.
- For app/template changes run syntax checks, node build-standalone.cjs and node check-flow.cjs; visually verify UI changes. Documentation-only changes need link and diff checks.
- validation/audit-v0.3.4.cjs reproduces historical gaps. Passing it is not v0.5 success; update assertions as fixes land.
- Never commit credentials, browser project exports, reference PDFs or identifiable participant evidence to this public repository.
- Inspect Git status and preserve unrelated edits. Update the linked Notion feature, backlog or decision record when delivery changes them.

## Guild workflow / Fonctionnement guilde

Les informations projet font référence dans Notion. Le dépôt contient le prototype et les vérifications techniques. Documenter les évolutions dans les fiches liées, en distinguant existant, proposition et livraison vérifiée.
