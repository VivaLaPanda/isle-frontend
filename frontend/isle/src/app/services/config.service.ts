import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config = {
    interface: {
      contentNode: {
        showNumericReputation: false,
      }
    }
  }

  constructor() { }

  getConfig() {
    return this.config;
  }

}
