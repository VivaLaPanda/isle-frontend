export class User {
  uid: string;
  name: string;
  aviUrl: string;
  reputation: number;

  constructor(obj: any) {
    this.uid = obj.uid;
    this.name = obj.name;
    this.aviUrl = obj.aviUrl;
    this.reputation = obj.reputation;
  }
}
