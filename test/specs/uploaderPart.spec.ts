import getFakeFile from '../mocks/blob.mock';
import UploaderPart from '../../src/uploaderPart';
import xhrMock from 'xhr-mock';

const fileMock = getFakeFile('jpeg', 5);
let instance: UploaderPart;

beforeEach(() => {
  xhrMock.setup();
  instance = new UploaderPart([fileMock, fileMock], 'localhost', 1, [
    { key: 'addit', value: 'boroda' },
    { key: 'addit', value: 'hello' }
  ]);
});

describe('Constructor initialize', () => {
  test('Target initialize', () => {
    expect(instance.target).toBe('localhost');
  });
  test('Additional data initialize', () => {
    expect(instance.formData.getAll('addit')).toEqual(
      expect.arrayContaining(['boroda', 'hello'])
    );
  });
  test('Files initialize', () => {
    const files = instance.formData.getAll('files');
    expect(files.length).toBe(2);
  });
});

describe('E2E xhr test', () => {
  test('Server side test request', () => {
    expect.assertions(2);
    xhrMock.post('localhost', (req, res) => {
      expect(req.header('Content-Type')).toMatch(/form-data/);
      const files = req.body().getAll('files');
      expect(files.length).toBe(2);
      return res.status(200);
    });
    instance.send();
  });
  test('Test onsuccess callback', done => {
    expect.assertions(1);
    xhrMock.post('localhost', { status: 200 });
    instance.on('success', partN => {
      expect(partN).toBe(1);
      done();
    });
    instance.send();
  });
  test('Test onerror callback', done => {
    expect.assertions(1);
    xhrMock.post('localhost', { status: 404 });
    const errorCallb = jest.fn(() => {
      expect(errorCallb).toHaveBeenCalled();
      done();
    });
    instance.on('error', errorCallb);
    instance.send();
  });
});
