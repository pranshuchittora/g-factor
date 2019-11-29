import * as fs from "fs";
import * as path from "path";
import * as index from "../index";

/**
 *
 * @param { filelist, allFiles }: any
 * @param dir
 */
const showFiles = ({ filelist, allFiles }: any, dir: fs.PathLike) => {
  filelist = filelist || [];
  allFiles = allFiles || [];
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    // console.log("ERR_ACCESS_DENIED", e);
    return { filelist };
  }
  files.forEach(function(file) {
    try {
      const fileStats = fs.statSync(dir + "/" + file);
      const absPath = path.resolve(dir + "/" + file);
      const fileLstat = fs.statSync(absPath);
      const fileSize = fileLstat.size;
      let SIZE_Num = parseInt(process.env.SIZE);
      SIZE_Num += fileSize;
      process.env.SIZE = SIZE_Num.toString();
      if (fileStats.isDirectory()) {
        const dirFiles = fs.readdirSync(absPath);

        return showFiles({ filelist: dirFiles, allFiles }, absPath);
      } else {
        allFiles.push(absPath);
      }
    } catch (e) {
      // console.log("ERR_LOCATION_NOT_FOUND", e);
    }
  });
  return { filelist, allFiles };
};

export default showFiles;
