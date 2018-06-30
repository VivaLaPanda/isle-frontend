import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl = '/';

  constructor() {}
}
