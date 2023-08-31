import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigLoader {
  public static APP_CONFIG = 'APP_CONFIG';
  public configurations: Map<string, any> = new Map();
  public endpointId: string;

  constructor(private http: HttpClient) {}

  /**
   * Load base config(APP_CONFIG)
   * @param path
   */
  public loadFromBaseConfig(path: string): Promise<any> {
    return new Promise((resolve) => {
      this.http.get<any>(path).subscribe((data: any) => {
        this.configurations.set(ConfigLoader.APP_CONFIG, data);

        const configs = Object.keys(data).map((item: string) => {
          return {
            'id': item,
            'path': data[item]
          };
        });

        // load all other configs
        this.load(configs).then(() => {
          resolve(true);
        });
      });
    });
  }

  /**
   * Load other config files by http call
   * @param configs
   * @private
   */
  private load(configs: Array<any>) {
    const remainingConfigsToLoad = configs.map(item => item.id);

    return new Promise((resolve) => {
      configs.forEach(conf => {
        this.http.get<any>(conf.path).subscribe((data: any) => {
          this.configurations.set(conf.id, data);

          remainingConfigsToLoad.splice(remainingConfigsToLoad.indexOf(conf.id), 1);
          if (remainingConfigsToLoad.length === 0) {
            resolve(true);
          }
        });
      });
    });
  }
}
