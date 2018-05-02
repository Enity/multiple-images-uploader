/* tslint:disable: prefer-for-of */

export default function fileListToArray(files: FileList): File[] {
  const newFiles: File[] = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i]);
  }
  return newFiles;
}
