export default function getFakeFile(type: string, size: number): File {
  const blobData: any = {};
  for (let i = 0; i < size; i++) {
    blobData['data' + i] = 'boroda' + Math.floor(Math.random() * 60000);
  }
  const blob = new Blob([JSON.stringify(blobData)], { type: `image/${type}` });
  return blobToFile(blob);
}

function blobToFile(theBlob: Blob): File {
  const b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = Math.floor(Math.random() * 25);
  return theBlob as File;
}
