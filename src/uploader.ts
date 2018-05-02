import { ValidateFiles } from './utils/validator';
import EventEmitter from './eventEmitter';
import QueueService from './queueSerivce';
import UploaderPart from './uploaderPart';

export default class MultipleFilesUpload {
  target: string;
  partSize: number = 5;
  streams: number = 1;
  files: File[];
  parts: UploaderPart[] = [];
  additData: IAdditData[];
  progress: IProgress = {
    total: 0,
    loaded: 0,
    percent: '0%'
  };
  eventService: EventEmitter = new EventEmitter();
  queueService: QueueService;

  constructor(arg: IConstructorArgs) {
    try {
      ValidateFiles(arg.files);
    } catch (e) {
      throw(e);
    }
    Object.assign(this, arg);
    this.initializeParts();
    this.initProgressRender();
    this.queueService = new QueueService(this.parts, this.streams);
  }
  public on(event: string, callb: (payload: any) => void) {
    this.eventService.subscribe(event, callb);
  }
  public start() {
    return new Promise ((resolve, reject) => {
      this.queueService.start()
      .then(() => {
        setTimeout(() => {
          this.eventService.emit('finish');
          resolve();
        }, 1000);
      })
      .catch(e => {
        this.eventService.emit('error', e);
        reject(e);
      });
    });
  }
  public abort() {
    this.queueService.abort();
  }
  private initializeParts() {
    const totalParts = Math.ceil(this.files.length / this.partSize);
    const filesClone = this.files.concat();
    for (let i = 0; i < totalParts; i++) {
      const part = filesClone.splice(0, this.partSize);
      this.parts[i] = new UploaderPart(part, this.target, i + 1, this.additData);
    }
  }
  private initProgressRender() {
    this.progress.total = this.files
      .map(i => i.size).reduce((prev, cur) => prev + cur);
    for (const part of this.parts) {
      part.on('progress', (loaded) => {
        this.progress.loaded += loaded;
        this.progress.percent = Math.round(this.progress.loaded / this.progress.total * 100) + '%';
        this.eventService.emit('progress', this.progress);
      });
    }
  }

}

interface IProgress {
  total: number;
  loaded: number;
  percent: string;
}

interface IAdditData {
  key: string;
  value: string;
}

interface IConstructorArgs {
  files: File[];
  target: string;
  additData?: IAdditData[];
  streams?: number;
  partSize?: number;
}
