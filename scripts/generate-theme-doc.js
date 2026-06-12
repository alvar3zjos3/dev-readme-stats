import fs from "fs";
import { themes } from "../themes/index.js";

const TARGET_FILE = "./themes/README.md";

// Flags
const REPO_CARD_LINKS_FLAG = "<!-- REPO_CARD_LINKS -->";
const STAT_CARD_LINKS_FLAG = "<!-- STATS_CARD_LINKS -->";
const LANG_CARD_LINKS_FLAG = "<!-- LANG_CARD_LINKS -->";
const WAKA_CARD_LINKS_FLAG = "<!-- WAKA_CARD_LINKS -->";

const STAT_CARD_TABLE_FLAG = "<!-- STATS_CARD_TABLE -->";
const REPO_CARD_TABLE_FLAG = "<!-- REPO_CARD_TABLE -->";
const LANG_CARD_TABLE_FLAG = "<!-- LANG_CARD_TABLE -->";
const WAKA_CARD_TABLE_FLAG = "<!-- WAKA_CARD_TABLE -->";

const THEME_TEMPLATE = `## Temas Disponibles

<!-- NO EDITE ESTE ARCHIVO DIRECTAMENTE -->

Con los temas incorporados, puedes personalizar el aspecto de la tarjeta sin hacer ninguna personalización manual.

Usa los parámetros \`?theme=NOMBRE_DEL_TEMA\` de esta forma:

\`\`\`md
![Estadísticas de GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&theme=shadow_red)
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

## Lenguajes Principales

> Estos temas funcionan con nuestras cinco tarjetas: Tarjeta de Estadísticas, Tarjeta de Repositorio, Tarjeta de Gist, Tarjeta de Lenguajes Principales y Tarjeta de WakaTime.

| | | |
| :--: | :--: | :--: |
${LANG_CARD_TABLE_FLAG}

## WakaTime

> Estos temas funcionan con nuestras cinco tarjetas: Tarjeta de Estadísticas, Tarjeta de Repositorio, Tarjeta de Gist, Tarjeta de Lenguajes Principales y Tarjeta de WakaTime.

| | | |
| :--: | :--: | :--: |
${WAKA_CARD_TABLE_FLAG}

${STAT_CARD_LINKS_FLAG}

${REPO_CARD_LINKS_FLAG}

${LANG_CARD_LINKS_FLAG}

${WAKA_CARD_LINKS_FLAG}
`;

// ─── Link generators ─────────────────────────────────────────────────────────

const createStatMdLink = (theme) =>
  `\n[${theme}]: https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide=issues,prs&cache_seconds=86400&theme=${theme}`;

const createRepoMdLink = (theme) =>
  `\n[${theme}_repo]: https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3&repo=dev-readme-stats&cache_seconds=86400&theme=${theme}`;

const createLangMdLink = (theme) =>
  `\n[${theme}_lang]: https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&layout=compact&cache_seconds=86400&theme=${theme}`;

const createWakaMdLink = (theme) =>
  `\n[${theme}_waka]: https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3&cache_seconds=86400&theme=${theme}`;

const generateLinks = (fn) =>
  Object.keys(themes)
    .map((name) => fn(name))
    .join("");

// ─── Table generator ─────────────────────────────────────────────────────────

const createTableItem = ({ link, label, suffix }) => {
  if (!link || !label) {
    return "";
  }
  return `\`${label}\` ![${link}][${link}${suffix}]`;
};

const generateTable = ({ exclude, suffix }) => {
  const rows = [];
  const themesFiltered = Object.keys(themes).filter((name) => name !== exclude);

  for (let i = 0; i < themesFiltered.length; i += 3) {
    const [one, two, three] = themesFiltered.slice(i, i + 3);
    rows.push(
      `| ${createTableItem({ link: one, label: one, suffix })} ` +
        `| ${createTableItem({ link: two, label: two, suffix })} ` +
        `| ${createTableItem({ link: three, label: three, suffix })} |`,
    );
  }

  return rows.join("\n");
};

// ─── Build README ─────────────────────────────────────────────────────────────

const EXCLUDED_THEMES = ["default", "default_repocard"];

const buildReadme = () => {
  return THEME_TEMPLATE.split("\n")
    .map((line) => {
      if (line.includes(STAT_CARD_TABLE_FLAG)) {
        return generateTable({ exclude: EXCLUDED_THEMES, suffix: "" });
      }
      if (line.includes(REPO_CARD_TABLE_FLAG)) {
        return generateTable({ exclude: EXCLUDED_THEMES, suffix: "_repo" });
      }
      if (line.includes(LANG_CARD_TABLE_FLAG)) {
        return generateTable({ exclude: EXCLUDED_THEMES, suffix: "_lang" });
      }
      if (line.includes(WAKA_CARD_TABLE_FLAG)) {
        return generateTable({ exclude: EXCLUDED_THEMES, suffix: "_waka" });
      }
      if (line.includes(STAT_CARD_LINKS_FLAG)) {
        return generateLinks(createStatMdLink);
      }
      if (line.includes(REPO_CARD_LINKS_FLAG)) {
        return generateLinks(createRepoMdLink);
      }
      if (line.includes(LANG_CARD_LINKS_FLAG)) {
        return generateLinks(createLangMdLink);
      }
      if (line.includes(WAKA_CARD_LINKS_FLAG)) {
        return generateLinks(createWakaMdLink);
      }
      return line;
    })
    .join("\n");
};

fs.writeFileSync(TARGET_FILE, buildReadme());
