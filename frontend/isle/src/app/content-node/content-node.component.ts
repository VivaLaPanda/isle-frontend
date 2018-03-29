import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../models/content';
import * as ColorBetween from 'color-between';
// Set of primary color codes that depthToColor cycles through
const listOfColors = [
  '#3cba54',
  '#f4c20d',
  '#db3236',
  '#4885ed'
];

@Component({
  selector: 'app-content-node',
  templateUrl: './content-node.component.html',
  styleUrls: ['./content-node.component.scss']
})
export class ContentNodeComponent implements OnInit {
  @Input() content: Content;
  @Input() depth: number;

  constructor() { }

  ngOnInit() {
    // Get Content node that corresponds to the given UID
    console.log(this.content.sentiment);
  }

  // Will cycle through colors as content depth increases
  depthToColor(): string {
    return listOfColors[(this.depth % listOfColors.length)];
  }

  repToColor(): string {
    return ColorBetween('#db3236', '#4885ed', this.normalizeRep(this.content.reputation), 'hex');
  }

  // Converts rep to a number between 0 and 1
  normalizeRep(rep: number): number {
    if (rep > 500) {
      rep = 500;
    } else if (rep < -500) {
      rep = -500;
    }

    rep = rep + 500;
    rep = rep / 1000;

    return rep;
  }
}
