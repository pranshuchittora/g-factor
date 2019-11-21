import * as fs from "fs";
import * as path from "path";

let size = 0;
export const showFiles = ({ filelist, allFiles }: any, dir) => {
  filelist = filelist || [];
  allFiles = allFiles || [];
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("ERR_ACCESS_DENIED", e);
    return { filelist };
  }
  files.forEach(function(file) {
    try {
      const fileStats = fs.statSync(dir + "/" + file);
      const absPath = path.resolve(dir + "/" + file);
      const fileLstat = fs.statSync(absPath);
      const fileSize = fileLstat.size;
      size += fileSize;
      if (fileStats.isDirectory()) {
        const dirFiles = fs.readdirSync(absPath);

        return showFiles({ filelist: dirFiles, allFiles }, absPath);
      } else {
        allFiles.push(absPath);
        // console.log(fileLstat.size);
      }
      //   if (fileStats.isDirectory() && file === "node_modules") {
      //     const fileMTime: any = fileStats.mtime;
      //     const timeCurrent: any = new Date();
      //     const timeDiff = timeCurrent - fileMTime;
      //     // Dir is valid as per the config

      //     // console.log(fileDetailsObj);
      //   } else if (fileStats.isDirectory()) {
      //     filelist = showFiles(dir + "/" + file, { filelist }).filelist;
      //   }
    } catch (e) {
      console.log("ERR_LOCATION_NOT_FOUND", e);
    }
  });
  return { filelist, allFiles };
};

const convertBytes = function(bytes: any) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes == 0) {
    return "n/a";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  if (i == 0) {
    return bytes + " " + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};
showFiles({ filelist: [] }, "./");
console.log(convertBytes(size));
