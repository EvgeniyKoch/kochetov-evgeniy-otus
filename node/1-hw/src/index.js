import path from "path";
import fs from "fs";

const ident = (depth, tab = 2) => " ".repeat(depth * tab);

const dirParent = "├───";
const dirChild = "└───";

const isFile = (path) => {
  try {
    var stat = fs.lstatSync(path, { throwIfNoEntry: false });
    return stat.isFile();
  } catch (e) {
    return false;
  }
};

const drawTree = (files, fullPath, dir, depth) => {
  const iter = (files, pathToTarget, depth, str, isChild = false, count) => {
    if (!files || depth === 0) {
      return str;
    }

    return files.reduce((acc, file) => {
      const pathToFile = path.join(pathToTarget, file);
      const space = isChild ? `│${ident(count)}` : "";
      const node = isChild ? dirChild : dirParent;
      const valueIdent = isChild ? count + 1 : 1;
      const depthForDir = isFile(pathToFile) ? depth : depth - 1;
      const fileList = isFile(pathToFile) ? null : fs.readdirSync(pathToFile);
      const collectPath = isFile(pathToFile)
        ? path.join(pathToFile, file)
        : pathToFile;
      const line = `${acc}${space}${node}${file}\n`;

      return iter(fileList, collectPath, depthForDir, line, true, valueIdent);
    }, str);
  };

  return iter(files, fullPath, depth, `${dir}\n`);
};

export default (dir, depth) => {
  const fullPath = path.join(process.cwd(), dir);
  try {
    const files = fs.readdirSync(fullPath);
    return drawTree(files, fullPath, dir, depth);
  } catch (err) {
    console.error(err);
  }
};
