import { ImgFilesMocks } from './mocks/files.mock';
import { MultipleFilesUpload } from '../src/uploader';

describe('Parts initialize', () => {
  describe('Initializes the correct number of parts with random number of files & part sizes', () => {
    for (let i = 1; i <= 10; i++) {
      const filesMock = ImgFilesMocks(random(1, 100));
      const partSize = i;
      const targetPartsQuantity = Math.ceil(filesMock.length / partSize);
      const uploader = new MultipleFilesUpload({target: '', files: filesMock, partSize});
      uploader.initializeParts();
      const lastPart = uploader.parts[targetPartsQuantity - 1].files.getAll('files').length;
      test(`${filesMock.length} files, part size ${partSize}`, () => {
        expect(uploader.parts.length).toBe(targetPartsQuantity);
      });
      test(`Correct last part size ${filesMock.length} files, part size ${partSize}`, () => {
        const lastPartSize = () => {
          if (filesMock.length % partSize === 0) return partSize;
          if (lastPart === filesMock.length % partSize) return filesMock.length % partSize;
        };
        expect(lastPart).toBe(lastPartSize());
      });
    }
  });
});

function random(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
