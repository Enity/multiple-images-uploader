import EventEmitter from './eventEmitter';

export default class UploaderPart {
  eventService: EventEmitter = new EventEmitter();
  constructor(public files: Blob[] = []) {
    
  }
}
