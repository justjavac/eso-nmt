import { parse } from "csv";

type LangItem = {
  ID: string;
  Unknown: string;
  Index: string;
  Offset: string;
  Text: string;
};

const columns = ["ID", "Unknown", "Index", "Offset", "Text"];

async function cut(lang: "en" | "zh") {
  const content = await Deno.readTextFile(`./gamedata/lang/${lang}.lang.csv`);
  const data = parse(content, {
    skipFirstRow: true,
    columns,
  }) as LangItem[];
  await Deno.writeTextFile(
    `./gamedata/lang/${lang}.txt`,
    data.map((x) => x.Text).join("\n"),
  );
}

if (import.meta.main) {
  await Promise.all([cut("en"), cut("zh")]);
}
