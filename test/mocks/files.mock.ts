import getFakeBlob from './blob.mock';

export function ImgFilesMocks(quantity: number, imgType = 'jpeg', sizeMultipler = 10): FakeFileList {
  const files: File[] = [];
  const imageMock = getFakeBlob(imgType, sizeMultipler);
  let i = 0;
  while (i < quantity) {
    files.push(imageMock as File);
    i++;
  }
  return new FakeFileList(files);
}

class FakeFileList {
  length: number;
  item: (i: number) => File;
  [file: number]: File;
  constructor(files: File[]) {
    let i = 0;
    while (i < files.length) {
      this[i] = files[i];
      i++;
    }
    this.length = i;
    this.item = (index: number) => this[i];
  }
}
