export default function getFakeBlob(type: string, size: number): Blob {
  const blobData: any = {};
  for (let i = 0; i < size; i++) {
    blobData['data' + i] = 'boroda' + Math.floor(Math.random() * 60000);
  }
  return new Blob([JSON.stringify(blobData)], { type: `image/${type}` });
}
