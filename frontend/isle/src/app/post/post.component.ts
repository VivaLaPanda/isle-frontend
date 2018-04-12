import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../models/content';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ContentService]
})
export class PostComponent implements OnInit {
  @Input() root: Content;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.root = new Content(this.contentService.testGetContent());
  }

}
