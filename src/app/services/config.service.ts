import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config = {
    interface: {
      appName: 'Test Isle',
      contentNode: {
        showNumericReputation: false,
      }
    }
  };

  constructor() { }

  getConfig() {
    return this.config;
  }

}
