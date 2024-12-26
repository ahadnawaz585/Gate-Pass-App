import * as fs from "fs";

export const getLogoDataURL = (filePath: string): string => {
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};
