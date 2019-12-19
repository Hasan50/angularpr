import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {
  isMasterDataUpdate = false; 

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  constructor() {}
   emitProjectListUpdate(values : boolean) {
    this.isMasterDataUpdate = values; 
    this.change.emit(this.isMasterDataUpdate);
  }
}
