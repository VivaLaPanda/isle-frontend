import * as firebase from 'firebase';

export class User {
  uid: string;
  name: string;
  aviUrl: string;
  reputation: number;

  fromJSON(obj: any): User {
    this.uid = obj.uid;
    this.name = obj.name;
    this.aviUrl = obj.aviUrl;
    this.reputation = obj.reputation;

    return this;
  }

  fromFirebase(user: firebase.User): User {
    this.uid = user.uid;
    this.aviUrl = user.photoURL;

    return this;
  }
}
