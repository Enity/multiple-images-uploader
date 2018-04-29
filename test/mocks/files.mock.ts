export function ImgFilesMocks(quantity: number, imgType = 'jpg') {
  const files: Blob[] = [];
  const imageMock = new Blob([JSON.stringify({})], {type: `image/${imgType}`});
  let i = 0;
  while (i < quantity) {
    files.push(imageMock);
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
