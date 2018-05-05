import { ImgFilesMocks } from '../mocks/files.mock';
import mock from 'xhr-mock';
import MultipleFilesUpload from '../../src';

let instance: MultipleFilesUpload;
const filesMock = ImgFilesMocks(23);

beforeEach(() => {
  mock.setup();
  instance = new MultipleFilesUpload({
    files: filesMock,
    target: '/upload',
    partSize: 5,
    streams: 1
  });
});

describe('[Main] E2E Upload files', () => {
  test('Server recieved 5 parts for 23 files', async () => {
    expect.assertions(10);
    mock.post('/upload', (req, res) => {
      expect(req.header('Content-Type')).toMatch(/form-data/);
      expect(req.body().getAll('files')).toBeDefined();
      return res.status(200);
    });
    await instance.start();
  });
});
