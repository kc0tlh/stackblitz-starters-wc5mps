import { Injectable } from '@angular/core';
import { ConfigLoader } from './core/utils/framework/config-loader.service';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(
    private configLoader: ConfigLoader
  ) {}

  public loadConfigurations() {
    return new Promise((resolve) => {
      this.configLoader.loadFromBaseConfig(environment.base_config)
        .then(() => {
          resolve(true);
        });
    });
  }

}
