import { ImgFilesMocks } from './mocks/files.mock';
import UploaderPart from '../src/uploaderPart';

describe('Uploader part', () => {
  test('Additional data init', () => {
    const uploaderPart = new UploaderPart([], 'localhost', [
      {key: 'boroda', value: '123'},
      {key: 'boroda', value: '2455'}
    ]);
    const additTest = uploaderPart.formData.getAll('boroda');
    expect(additTest.length).toBe(2);
  });
});
