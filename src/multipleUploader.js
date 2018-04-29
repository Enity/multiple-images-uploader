export default class MultipleFilesUpload {
  constructor({target,files,additData,partSize = 5,streams = 1,callbacks = false} = {}) {
    // props
    this.target = target;
    this.files = files;
    this.additData = additData; // {key: '', value: ''}
    this.partSize = partSize;
    this.streams = streams;
    this.parts = [];
    this.totalFilesSize = 0;
    // state
    this.errorsTotal = 0;
    this.processTotal = 0;
    this.partsUploaded = 0;
    this.paused = false;
    // callb
    if (callbacks === false) {
      this.callbacks = {
        onError(error) {
          console.log(error);
        },
        onFatalError(errors) {
          console.log(errors);
        },
        onFinish(errors) {
          console.log(`Finish. Errors: ${errors}`);
        },
        onProgress(procent, loaded, total) {
          console.log(`Process ${loaded}/${total}. ${procent}`);
        }
      };
    }
    else {
      this.callbacks = callbacks;
    }
  }
  start() {
    this.paused = false;
    this.initializeParts();
    this.uploadTasker = this.uploadGeneratorCreator();
    for (let i = 0; i < this.streams && i < this.parts.length; i++) {
      this.uploadTasker.next();
    }
  }
  pause() {
    this.paused = true;
  }
  *uploadGeneratorCreator() {
    for (let i = 0; i < this.parts.length; i++) {
      yield this.sendPart(this.parts[i], i);
    }
  }
  renderProcess() {
    let total = this.totalFilesSize;
    let loaded = this.processTotal;
    let procent = Math.round(loaded / total * 100);
    this.callbacks.onProgress(procent, loaded, total);
  }
  sendPart(part, partN) {
    let self = this;
    let xhr = new XMLHttpRequest();
    let partLoaded = (this.parts[partN].loaded = 0);
    xhr.upload.onprogress = e => {
      this.processTotal += e.loaded - partLoaded;
      partLoaded = e.loaded;
      this.renderProcess();
      // log(`Загрузка ${partN} части: ${e.loaded}/${e.total}`);
      // log(e.loaded + '/' + e.total);
    };
    xhr.upload.onload = e => {
      // log(`Часть ${partN} загружена на сервер. Жду ответа`);
    };
    xhr.onload = xhr.onerror = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        // log(`Ответ сервера: ${xhr.responseText}`);
        this.handleSuccess(part, partN);
      }
      else {
        this.errorsTotal++;
        // log(`Ошибка, повторю через 2 секунды.. Всего ошибок ${this.errorsTotal}`);
        if (this.errorsTotal <= 4) {
          this.callbacks.onError(xhr.statusText);
          xhr.open('POST', self.target, true);
          setTimeout(() => xhr.send(part), 2000);
        }
        else {
          this.handleFatalError();
        }
      }
    };
    xhr.open('POST', this.target, true);
    xhr.send(part);
    // log(`Начал загрузку ${partN} части`);
  }
  handleSuccess(part, partN) {
    // log(`${partN} загружена и ответ получен.`);
    this.partsUploaded++;
    this.storePartInHistory(part);
    if (this.partsUploaded === this.parts.length) {
      this.handleFinish();
      return;
    }
    if (!this.paused) this.uploadTasker.next();
    else this.processTotal = 0;
  }
  handleFinish() {
    // log(`Все файлы успешно загружены. Количество ошибок: ${this.errorsTotal}.`)
    localStorage.removeItem('MultipleFilesUpload');
    this.callbacks.onFinish(this.errorsTotal);
  }
  handleFatalError() {
    this.callbacks.onFatalError(this.errorsTotal);
    // log(`Загрузка прервана. Количество ошибок: ${this.errorsTotal}.`)
  }
  initializeParts() {
    let part = new FormData();
    let continueUploadData = this.getPreviousUpload();
    let previousUploadFiles = 0;
    for (let i = 0; i < this.files.length; ) {
      const file = this.files[i];
      this.totalFilesSize += file.size;
      if (continueUploadData) {
        if (compareFiles(file)) {
          this.processTotal += file.size;
          previousUploadFiles++;
          i++;
          continue;
        }
      }
      part.append('files', file);
      i++;
      if (
        (i !== 0 && (i / this.partSize) % 1 === 0) ||
        i === this.files.length
      ) {
        if (this.additData !== undefined) {
          part.append(this.additData.key, this.additData.value);
        }
        this.parts.push(part);
        part = new FormData();
      }
    }
    this.renderProcess();
    // log(`Инициализировано ${this.parts.length} частей`);
    // if (continueUploadData) log(`Прошлая загрузка инициализирована. Было загружено ${previousUploadFiles}`)
    function compareFiles(file) {
      if (continueUploadData[file.name] === file.size) return true;
      else return false;
    }
  }
  getPreviousUpload() {
    if (localStorage.getItem('MultipleFilesUpload') === undefined) {
      return false;
    } 
    else {
      return JSON.parse(localStorage.getItem('MultipleFilesUpload'));
    }
  }
  storePartInHistory(part) {
    let files = part.getAll('files[]');
    let history = JSON.parse(localStorage.getItem('MultipleFilesUpload')) || {};
    for (let i = 0; i < files.length; i++) {
      history[files[i].name] = files[i].size;
    }
    localStorage.setItem('MultipleFilesUpload', JSON.stringify(history));
  }
}
