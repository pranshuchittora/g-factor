import getSize from "./lib/getFilesAndSize";
import convertBytes from "./lib/convertBytes";

export default function(filePath) {
  process.env.SIZE = "0";
  getSize({ filelist: [] }, filePath);

  const SIZE_Number = parseInt(process.env.SIZE);
  const SIZE_Parsed = convertBytes(SIZE_Number);
  return { SIZE_Parsed, SIZE_Number };
}
