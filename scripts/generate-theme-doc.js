import fs from "fs";
import { themes } from "../themes/index.js";

const TARGET_FILE = "./themes/README.md";
const REPO_CARD_LINKS_FLAG = "<!-- REPO_CARD_LINKS -->";
const STAT_CARD_LINKS_FLAG = "<!-- STATS_CARD_LINKS -->";

const STAT_CARD_TABLE_FLAG = "<!-- STATS_CARD_TABLE -->";
const REPO_CARD_TABLE_FLAG = "<!-- REPO_CARD_TABLE -->";

const THEME_TEMPLATE = `## Temas Disponibles

<!-- NO EDITE ESTE ARCHIVO DIRECTAMENTE -->

Con los temas incorporados, puedes personalizar el aspecto de la tarjeta sin hacer ninguna personalización manual.

Usa los parámetros \`?theme=NOMBRE_DEL_TEMA\` y \`&locale=es\` de esta forma:

\`\`\`md
![Estadísticas de GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&theme=shadow_red&locale=es)
\`\`\`

## Estadísticas

> Estos temas funcionan con nuestras cinco tarjetas: Tarjeta de Estadísticas, Tarjeta de Repositorio, Tarjeta de Gist, Tarjeta de Lenguajes Principales y Tarjeta de WakaTime.

| | | |
| :--: | :--: | :--: |
${STAT_CARD_TABLE_FLAG}

## Tarjeta de Repositorio

> Estos temas funcionan con nuestras cinco tarjetas: Tarjeta de Estadísticas, Tarjeta de Repositorio, Tarjeta de Gist, Tarjeta de Lenguajes Principales y Tarjeta de WakaTime.

| | | |
| :--: | :--: | :--: |
${REPO_CARD_TABLE_FLAG}

${STAT_CARD_LINKS_FLAG}

${REPO_CARD_LINKS_FLAG}
`;

const createRepoMdLink = (theme) => {
  return `\n[${theme}_repo]: https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3&repo=dev-readme-stats&cache_seconds=86400&theme=${theme}`;
};
const createStatMdLink = (theme) => {
  return `\n[${theme}]: https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide=issues,prs&cache_seconds=86400&theme=${theme}`;
};

const generateLinks = (fn) => {
  return Object.keys(themes)
    .map((name) => fn(name))
    .join("");
};

const createTableItem = ({ link, label, isRepoCard }) => {
  if (!link || !label) {
    return "";
  }
  return `\`${label}\` ![${link}][${link}${isRepoCard ? "_repo" : ""}]`;
};

const generateTable = ({ isRepoCard }) => {
  const rows = [];
  const themesFiltered = Object.keys(themes).filter(
    (name) => name !== (isRepoCard ? "dark" : "dracula"),
  );

  for (let i = 0; i < themesFiltered.length; i += 3) {
    const one = themesFiltered[i];
    const two = themesFiltered[i + 1];
    const three = themesFiltered[i + 2];

    let tableItem1 = createTableItem({ link: one, label: one, isRepoCard });
    let tableItem2 = createTableItem({ link: two, label: two, isRepoCard });
    let tableItem3 = createTableItem({ link: three, label: three, isRepoCard });

    rows.push(`| ${tableItem1} | ${tableItem2} | ${tableItem3} |`);
  }

  return rows.join("\n");
};

const buildReadme = () => {
  return THEME_TEMPLATE.split("\n")
    .map((line) => {
      if (line.includes(REPO_CARD_LINKS_FLAG)) {
        return generateLinks(createRepoMdLink);
      }
      if (line.includes(STAT_CARD_LINKS_FLAG)) {
        return generateLinks(createStatMdLink);
      }
      if (line.includes(REPO_CARD_TABLE_FLAG)) {
        return generateTable({ isRepoCard: true });
      }
      if (line.includes(STAT_CARD_TABLE_FLAG)) {
        return generateTable({ isRepoCard: false });
      }
      return line;
    })
    .join("\n");
};

fs.writeFileSync(TARGET_FILE, buildReadme());
