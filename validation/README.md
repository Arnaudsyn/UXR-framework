# Prototype validation / Vérification du prototype

Run `node check-flow.cjs` for the current regression checks.

Run `node validation/audit-v0.3.4.cjs` to reproduce ten historical v0.3.4 scenario groups. Its passing assertions demonstrate old limitations, not successful implementation of future outcome routing. It writes `validation/v0.3.4-observations.json`.

Lancer `node check-flow.cjs` pour les vérifications actuelles. Le diagnostic historique reproduit dix groupes de scénarios de la v0.3.4 ; son succès ne prouve pas les futurs parcours. Adapter les assertions quand les limites sont corrigées.

Project context, historical audit narrative, decisions and acceptance scenarios are maintained in [Notion](https://app.notion.com/p/40bda503184980b99270ef9032fc8df8). Do not maintain a second planning backlog here.
