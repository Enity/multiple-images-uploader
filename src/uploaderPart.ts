import EventEmitter from './eventEmitter';
import { ImgFilesMocks } from '../test/mocks/files.mock';

export default class UploaderPart {
  formData: FormData = new FormData();
  eventService: EventEmitter = new EventEmitter();
  xhr: XMLHttpRequest;
  constructor(public filesArr: Blob[] = [], public target: string, public additData?: IAdditData[]) {
    this.initData();
    this.initXhr();
  }
  initData() {
    if (this.additData) {
      this.additData.map(item => this.formData.append(item.key, item.value));
    }
    for (const file of this.filesArr) {
      this.formData.append('files', file);
    }
  }
  initXhr() {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = e => {
      this.eventService.emit('progress', e.loaded);
    };
    xhr.onload = () => {
      this.eventService.emit('finish');
    };
    xhr.onerror = () => {
      this.eventService.emit('error', xhr.statusText);
    };
    this.xhr = xhr;
  }

}

interface IAdditData {
  key: string;
  value: string;
}

const files = ImgFilesMocks(5);
const test = new UploaderPart(files, 'localhost');
