import fs from "fs";
import path from "path";

const DIR_PATH = path.resolve(__dirname);
const DIR_CACHE = DIR_PATH + "/.cache";

interface ICacheSearch {
  path: String;
  mTime: String;
}

interface ICachedObject {
  path: String;
  mTime: String;
  size: number;
}
export class Cached {
  constructor() {
    this.checkCache = this.checkCache.bind(this);
    this.checkCache();
  }
  setupCache() {
    fs.mkdirSync(DIR_CACHE, { recursive: true });
    fs.writeFileSync(
      DIR_CACHE + "/cached.json",
      `{
          "cachedData": [],
          "lastUpdated": ""
        }`,
    );
  }
  checkCache() {
    if (fs.existsSync(DIR_CACHE + "/cached.json")) {
      try {
        const cacheFile = require(DIR_CACHE + "/cached.json");
      } catch (e) {
        this.setupCache();
      }
    } else {
      this.setupCache();
    }
  }
  writeCache(newCacheData: ICachedObject) {
    let cacheFile = require(DIR_CACHE + "/cached.json");
    cacheFile.cachedData.push(newCacheData);

    fs.writeFileSync(DIR_CACHE + "/cached.json", JSON.stringify(cacheFile));
  }
  findInCache(findCacheData: ICacheSearch) {
    let cacheFile = require(DIR_CACHE + "/cached.json");
    let elmIdx = -1;

    for (let i = 0; i < cacheFile.cachedData.length; i++) {
      const elmObj = cacheFile.cachedData[i];
      if (
        (elmObj.path === findCacheData.path,
        elmObj.mTime === findCacheData.mTime)
      ) {
        elmIdx = i;
        break;
      }
    }
    if (elmIdx !== -1) return cacheFile.cachedData[elmIdx];
    else return -1;
  }
}

export default new Cached();
// cahcedInstance.checkCache();
// cahcedInstance.writeCache({ path: "PC", mTime: "1", size: "34343434" });
// console.log(cahcedInstance.findInCache({ path: "PC", mTime: "12" }));
/**
 *
 * JSON Cache schema
 * {
 *  "cached":[{
 *              "path":"/xyz/ghghgh/jy/jyj",
 *              "size":"100KB",
 *              "modifiedTIme":"time",
 *            },{},{}
 *           ]
 *  "lastUpdated":"",
 * }
 */
