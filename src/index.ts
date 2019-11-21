import getSize from "./lib/getFilesAndSize";
import convertBytes from "./lib/convertBytes";

export default function(filePath) {
  process.env.SIZE = "0";
  getSize({ filelist: [] }, filePath);

  const SIZE_String = process.env.SIZE;
  const SIZE_Number = convertBytes(parseInt(SIZE_String));
  return { SIZE_Number, SIZE_String };
}
