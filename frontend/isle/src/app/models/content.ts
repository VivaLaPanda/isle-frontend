import {User} from './user';

export class Content {
  uid: string;
  title: string;
  body: string;
  poster: User;
  posted: Date;
  reputation: number;
  sentiment: number;
  children: Content[];

  constructor(obj: any) {
    this.uid = obj.uid;
    this.title = obj.title;
    this.body = obj.body;
    this.poster = new User(obj.poster);
    this.posted = new Date(obj.posted);
    this.reputation = obj.reputation;
    this.sentiment = obj.sentiment;

    this.children = obj.children.map((child) => {
      return new Content(child);
    });
  }
}
