import fs from "fs";
import path from "path";

import getSize from "./lib/getFilesAndSize";
import convertBytes from "./lib/convertBytes";
import internalCache from "./lib/cache/cacheFile";

export { convertBytes };

export default function(filePath) {
  process.env.SIZE = "0";
  const absPath = path.resolve(filePath);
  const fileStats = fs.statSync(absPath);

  const fileDetails = parseDetailsObjest(absPath, fileStats);
  const foundInCache = internalCache.findInCache(fileDetails);

  let SIZE_Number = 0;
  if (foundInCache === -1) {
    getSize({ filelist: [] }, fileDetails.path);
    SIZE_Number = parseInt(process.env.SIZE);

    const fileDetailsWithSize = { ...fileDetails, size: SIZE_Number };
    internalCache.writeCache(fileDetailsWithSize);
  } else {
    SIZE_Number = foundInCache.size;
  }
  let SIZE_Parsed = convertBytes(SIZE_Number);

  return { SIZE_Parsed, SIZE_Number };
}

function parseDetailsObjest(absFilePath: string, stats: fs.Stats) {
  return {
    path: absFilePath,
    mTime: stats.mtime.toString(),
  };
}
