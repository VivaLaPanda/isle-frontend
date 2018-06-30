import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  constructor() { }

  testGetContent() {
    return {
      uid: 0,
      title: 'Check out this cat!',
      body: 'It\'s pretty cute! This **text** is [markdown](link), so it can have ' +
      'links and *stuff*. Yay!',
      poster: {
        uid: 0,
        name: 'VivaLaPanda',
        aviUrl: 'badlink',
        reputation: 100,
      },
      posted: '2018-03-28',
      reputation: 50,
      children: [
        {
          uid: 0,
          body: 'This is a comment, it\'s angry!',
          poster: {
            uid: 0,
            name: 'VivaLaPanda',
            aviUrl: 'badlink',
            reputation: 100,
          },
          posted: '2018-03-20',
          reputation: -400,
          sentiment: -1,
          children: [
            {
              uid: 0,
              body: 'This is a comment, it\'s neutral!',
              poster: {
                uid: 0,
                name: 'Steve',
                aviUrl: 'badlink',
                reputation: 10,
              },
              posted: '2018-03-20',
              reputation: 1,
              sentiment: 0,
              children: [
                {
                  uid: 0,
                  body: 'This is a comment, it\'s neutral!',
                  poster: {
                    uid: 0,
                    name: 'Craig',
                    aviUrl: 'badlink',
                    reputation: 10,
                  },
                  posted: '2018-04-10',
                  reputation: 600,
                  sentiment: 0,
                  children: []
                },
              ]
            },
          ]
        },
        {
          uid: 0,
          body: 'This is a comment, it\'s happy!',
          poster: {
            uid: 0,
            name: 'Craig',
            aviUrl: 'badlink',
            reputation: 50,
          },
          posted: '2018-03-28',
          reputation: 300,
          sentiment: 1,
          children: []
        },
      ]
    };
  }
}
