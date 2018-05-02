import UploaderPart from './uploaderPart';

export default class QueueService implements IQueueService {
  queueGenerator: Generator;
  currentPart: number = 1;

  constructor(public parts: UploaderPart[], public streams: number = 1) {
    this.queueGenerator = this.createGenerator();
  }
  public start() {
    return new Promise((resolve, reject) => {
      for (const part of this.parts) {
        part.on('success', (parnN) => {
          this.currentPart++;
          this.queueGenerator.next();
          if (parnN === this.parts.length) {
            resolve();
          }
        });
        part.on('error', (error) => {
          reject(error);
        });
      }
      let i = 0;
      while (i < this.streams) {
        this.queueGenerator.next();
        i++;
      }
    });
  }
  public abort() {
    this.parts.map(part => part.abort());
  }
  *createGenerator(): Generator {
    for (const part of this.parts) {
      yield part.send();
    }
  }
}

interface IQueueService {
  start: () => Promise<object>;
  abort: () => void;
}
