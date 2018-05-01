import getFakeBlob from './blob.mock';

export function ImgFilesMocks(quantity: number, imgType = 'jpeg', sizeMultipler = 10) {
  const files: File[] = [];
  const imageMock = getFakeBlob(imgType, sizeMultipler);
  let i = 0;
  while (i < quantity) {
    files.push(imageMock as File);
    i++;
  }
  return files;
}
function formDataMock(files: Blob[], randomNames = true): FormData {
  const formData = new FormData();
  files.map(item => {
    const randomName = String(Math.round(Math.random() * 100));
    formData.append('file', item, randomName);
  });
  return formData;
}

export function createImagesMock(quantity: number, imgType = 'jpg') {
  return formDataMock(ImgFilesMocks(quantity, imgType));
}
