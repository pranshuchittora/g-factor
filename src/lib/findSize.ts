import fs from "fs";
async function getStatsAsync() {
  return await fs.stat("./package.json", (e, r) => {
    console.log(e);
    return r;
  });
}

getStatsAsync().then(r => {
  console.log({ r });
});
