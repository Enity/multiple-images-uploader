import { ImgFilesMocks } from '../test/mocks/files.mock';
import { ValidateFiles } from './utils/validator';

export class MultipleFilesUpload {
  target: string;
  partSize: number = 1;
  files: Blob[];
  parts: IFilesPart[] = [];
  totalFileSize: number;

  constructor(arg: IConstructorArgs) {
    try {
      ValidateFiles(arg.files);
    } catch (e) {
      throw(e);
    }
    Object.assign(this, arg);
  }
  initializeParts() {
    let totalParts = 1;
    let part = createEmptyPart(1);
    part.files = new FormData();
    this.files.map((item, i) => {
      part.files.append('files', item);
      i++;
      if (i % this.partSize === 0 ||
        i === this.files.length) {
        totalParts++;
        this.parts.push(part);
        part = createEmptyPart(totalParts);
      }
    });
    function createEmptyPart(partI: number): IFilesPart {
      return {files: new FormData(), partN: partI};
    }
  }
}
const filesMock = ImgFilesMocks(14);
const uploader = new MultipleFilesUpload({target: '21312', files: filesMock, partSize: 4});
uploader.initializeParts();

interface IConstructorArgs {
  files: Blob[];
  target: string;
  partSize?: number;
}

interface IFilesPart {
  partN: number;
  files: FormData;
  sendPart?: () => Promise<string>;
}
