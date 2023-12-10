import { Component, OnInit } from "@angular/core";

declare var  Winwheel: any;

@Component({
  selector: 'win-wheel-page',
  templateUrl: "./winwheel.component.html",
  styleUrls: ["./winwheel.component.css"]
})
export class WinWheelCompnonent implements OnInit {

  theWheel: any;

  startAnimation(){
    this.theWheel.startAnimation();
  }
  alertPrize(indicatedSegment : any) : void {
    // Do basic alert of the segment text.
    alert("You have won " + indicatedSegment.text);
  }


  ngOnInit(): void {
    this.theWheel = new Winwheel({
      'canvasId'       : 'winwheelcanvas',
      'numSegments': 5,         // Number of segments
      'outerRadius': 212,       // The size of the wheel.
      'centerX': 217,       // Used to position on the background correctly.
      'centerY': 219,
      'textFontSize': 28,        // Font size.
      'segments':            // Definition of all the segments.
        [
          { 'fillStyle': '#DAA520', 'text': 'Prize 1' },
          { 'fillStyle': '#32CD32', 'text': 'Prize 2' },
          { 'fillStyle': '#00BFFF', 'text': 'Prize 3' },
          { 'fillStyle': '#FF6347', 'text': 'Prize 4' },
          { 'fillStyle': '#708090', 'text': 'Prize 5' }
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
