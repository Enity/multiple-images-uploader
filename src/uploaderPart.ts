import throttle = require('lodash/throttle');
import EventEmitter from './eventEmitter';

export default class UploaderPart {
  formData: FormData = new FormData();
  eventService: EventEmitter = new EventEmitter();
  xhr: XMLHttpRequest;
  loaded: number = 0;

  constructor(public filesArr: File[] = [], public target: string,
              public partN: number, public additData?: IAdditData[]) {
    this.initFormData();
    this.initXhr();
  }
  initFormData() {
    if (this.additData) {
      this.additData.map(item => this.formData.append(item.key, item.value));
    }
    for (const file of this.filesArr) {
      this.formData.append('files', file);
    }
  }
  initXhr() {
    const xhr = new XMLHttpRequest();
    const throttled = throttle((e) => {
      this.eventService.emit('progress', e.loaded - this.loaded);
      this.loaded = e.loaded;
    }, 1000);
    xhr.upload.onprogress = (e) => throttled(e);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.eventService.emit('success', this.partN);
      }
      if (xhr.readyState === 4 && xhr.status !== 200) {
        this.eventService.emit('error', xhr.statusText);
      }
    };
    this.xhr = xhr;
  }
  send() {
    this.xhr.open('POST', this.target);
    this.xhr.send(this.formData);
  }
  abort() {
    this.xhr.abort();
  }
  on(event: string, callb?: callbackFunc) {
    this.eventService.subscribe(event, callb);
  }
}

type callbackFunc = (payload?: any) => void;

interface IAdditData {
  key: string;
  value: string;
}
