import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor() { }

  testGetSelf(): Observable<User> {
    const MOCKACCOUNT = new User({
      uid: 'a0000',
      name: 'VivaLaPanda',
      aviUrl: 'foo.bar',
      reputation: 10
    });
    return Observable.of({}).map(acct => MOCKACCOUNT);
  }
}
