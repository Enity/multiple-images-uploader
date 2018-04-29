import { ImgFilesMocks } from './mocks/files.mock';
import { MultipleFilesUpload } from '../src/uploader';

describe('Validation', () => {
  test('Returns an error if the files are not jpg', () => {
    const pngFiles = ImgFilesMocks(15, 'png');
    const test = () => new MultipleFilesUpload({target: '', files: pngFiles});
    expect(test).toThrow();
  });
  test('Returns an error if you send empty files array', () => {
    const emptyFiles = ImgFilesMocks(0);
    const test = () => new MultipleFilesUpload({target: '', files: emptyFiles});
    expect(test).toThrow();
  });
});
