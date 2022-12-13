const en = await Deno.readTextFile("./gamedata/lang/tok.en");
const zh = await Deno.readTextFile("./gamedata/lang/tok.zh");

const enLines = en.split("\n");
const zhLines = zh.split("\n");

const options = {
  create: true,
  write: true,
};

const testEn = await Deno.open("./gamedata/lang/test.en", options);
const testZh = await Deno.open("./gamedata/lang/test.zh", options);
const trainEn = await Deno.open("./gamedata/lang/train.en", options);
const trainZh = await Deno.open("./gamedata/lang/train.zh", options);
const validEn = await Deno.open("./gamedata/lang/valid.en", options);
const validZh = await Deno.open("./gamedata/lang/valid.zh", options);

for (let i = 0; i < enLines.length; i++) {
  const enLine = enLines[i];
  const zhLine = zhLines[i];

  const rand = Math.random();
  if (rand < 0.05) {
    await Deno.write(testEn.rid, new TextEncoder().encode(enLine + "\n"));
    await Deno.write(testZh.rid, new TextEncoder().encode(zhLine + "\n"));
  } else if (rand < 0.1) {
    await Deno.write(validEn.rid, new TextEncoder().encode(enLine + "\n"));
    await Deno.write(validZh.rid, new TextEncoder().encode(zhLine + "\n"));
  } else {
    await Deno.write(trainEn.rid, new TextEncoder().encode(enLine + "\n"));
    await Deno.write(trainZh.rid, new TextEncoder().encode(zhLine + "\n"));
  }
}

Deno.close(testEn.rid);
Deno.close(testZh.rid);
Deno.close(trainEn.rid);
Deno.close(trainZh.rid);
Deno.close(validEn.rid);
Deno.close(validZh.rid);
