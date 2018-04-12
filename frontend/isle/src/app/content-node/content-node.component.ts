import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../models/content';
import * as ColorBetween from 'color-between';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfigService} from '../services/config.service';
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
  styleUrls: ['./content-node.component.scss'],
  providers: [ConfigService],
  animations:  [trigger(
    'toggleReply',
    [
      state('collapsed, void', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition(
        'collapsed <=> expanded', [animate(150, style({height: '250px'})), animate(150)])
    ])],
})
export class ContentNodeComponent implements OnInit {
  @Input() content: Content;
  @Input() depth: number;

  interfaceOptions: any;

  replyFieldOptions;

  reply = {
    body: '',
    sentiment: 0,
  };

  // Used for toggling reply
  replyState: string;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.collapseReply();
    this.interfaceOptions = this.configService.getConfig().interface.contentNode;
    this.replyFieldOptions = {
      autofocus: true,
      autosave: {
        enavled: true,
        uniqueId: this.content.uid,
      },
      promptURLs: true,
    };
  }

  expandReply() { this.replyState = 'expanded'; }
  collapseReply() { this.replyState = 'collapsed'; }

  //
  // Below are functions dealing with initial rendering
  //

  // Will cycle through colors as content depth increases
  depthToColor(): string {
    return listOfColors[(this.depth % listOfColors.length)];
  }

  repToColor(): string {
    return ColorBetween('#db3236', '#4885ed', this.repAlignment(this.content.reputation), 'hex');
  }

  repToOpacity(): number {
    return this.repIntensity(this.content.reputation);
  }

  // Converts rep to a number between 0 and 1
  // meant to signal whether the post is generally good or bad
  repAlignment(rep: number): number {
    // Important note!
    // The number 200 being used for the "gradientspace" is important
    // Given the colors db3236 and 4885ed, ~248 colors are possible in the gradient
    // If you change the colors in repToColor you may want to change that 200 to a larger or smaller value to compensate
    const colorSpace = 200;
    const halfColorSpace = colorSpace / 2;

    if (rep > halfColorSpace) {
      rep = halfColorSpace;
    } else if (rep < -halfColorSpace) {
      rep = -halfColorSpace;
    }

    rep = rep + halfColorSpace;
    rep = rep / colorSpace;

    return rep;
  }

  // Converts rep to a number between 0 and 1
  // meant to signal whether the post is generally good or bad
  repIntensity(rep: number): number {
    const highRep = 500;

    if (rep < 100 && rep > -100) {
      return .2;
    }

    rep = Math.abs(rep);

    if (rep > highRep) {
      rep = highRep;
    }

    return rep / highRep;
  }
}
