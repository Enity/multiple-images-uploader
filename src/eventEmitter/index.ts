export default class EventEmitter {
  events: IEvents = {};
  subscribe(eventName: string, callback: callbackFunc) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }
  emit(eventName: string, payload?: any) {
    if (!this.events[eventName]) return;
    this.events[eventName].map(cb => cb(payload));
  }
}

type callbackFunc = (payload?: any) => void;

interface IEvents {
  [eventName: string]: callbackFunc[];
}
