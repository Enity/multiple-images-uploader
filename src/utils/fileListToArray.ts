export default function fileListToArray(files: any): File[] { //FileList
  const newFiles: File[] = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i]);
  }
  return newFiles;
}
