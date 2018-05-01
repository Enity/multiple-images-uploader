export function ValidateFiles(files: File[]) {
  const name = '[fileUploaderValidator]';
  if (files.length === 0) {
    throw new Error(`${name} got empty files array`);
  }
  for (const file of files) {
    if (file.type !== 'image/jpeg') {
      throw new Error(`${name} invalid files type! Got ${file.type} instead image/jpeg]`);
    }
  }
  return true;
}
