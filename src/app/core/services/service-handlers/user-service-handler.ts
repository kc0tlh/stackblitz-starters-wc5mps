import { Injectable } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';
import { DataKey, DataStore } from '../../utils/framework/data-store.service';
import { CONST } from '../../utils/constant';

@Injectable()
export class UserServiceHandler {

  constructor(
    private dataLoader: DataLoaderService,
    private dataStore: DataStore,
  ) {
  }


}
