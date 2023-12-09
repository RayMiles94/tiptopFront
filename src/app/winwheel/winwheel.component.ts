import { Component, OnInit } from "@angular/core";

declare var  Winwheel: any;

@Component({
  selector: 'win-wheel-page',
  templateUrl: "./winwheel.component.html",
  styleUrls: ["./winwheel.component.css"]
})
export class WinWheelCompnonent implements OnInit {

  theWheel: any;

  alertPrize(indicatedSegment : any) : void {
    // Do basic alert of the segment text.
    alert("You have won " + indicatedSegment.text);
  }


  ngOnInit(): void {
    this.theWheel = new Winwheel({
      'canvasId'       : 'winwheelcanvas',
      'numSegments': 8,         // Number of segments
      'outerRadius': 212,       // The size of the wheel.
      'centerX': 217,       // Used to position on the background correctly.
      'centerY': 219,
      'textFontSize': 28,        // Font size.
      'segments':            // Definition of all the segments.
        [
          { 'fillStyle': '#eae56f', 'text': 'Prize 1' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 2' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 3' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 4' },
          { 'fillStyle': '#eae56f', 'text': 'Prize 5' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 6' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 7' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 8' }
        ],
      'animation':               // Definition of the animation
      {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': this.alertPrize
      }
    });
  }

}
