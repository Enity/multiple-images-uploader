import { ImgFilesMocks } from '../test/mocks/files.mock';
import { ValidateFiles } from './utils/validator';
import UploaderPart from './uploaderPart';

export class MultipleFilesUpload {
  target: string;
  partSize: number = 1;
  files: Blob[];
  parts: UploaderPart[] = [];
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
    const totalParts = Math.ceil(this.files.length / this.partSize);
    const filesClone = this.files.concat();
    for (let i = 0; i < totalParts; i++) {
      const part = filesClone.splice(0, this.partSize);
      this.parts[i] = new UploaderPart(part, this.target);
    }
  }
}

/* const filesMock = ImgFilesMocks(14);
const uploader = new MultipleFilesUpload({target: '21312', files: filesMock, partSize: 4});
uploader.initializeParts();
console.log(uploader); */

interface IConstructorArgs {
  files: Blob[];
  target: string;
  partSize?: number;
}
