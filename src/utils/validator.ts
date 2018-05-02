/* tslint:disable: prefer-for-of */
import fileListToArray from './fileListToArray';

const name = '[fileUploaderValidator]';

export function ValidateFiles(files: FileList) {
  const filesArray = fileListToArray(files);
  if (filesArray.length === 0) {
    throw new Error(`${name} got empty files array`);
  }
  for (const file of filesArray) {
    if (file.type !== 'image/jpeg') {
      throw new Error(`${name} invalid files type! Got ${file.type} instead image/jpeg]`);
    }
  }
  return true;
}
