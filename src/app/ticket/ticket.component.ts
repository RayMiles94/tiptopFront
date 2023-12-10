import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {PersonService} from '../services/person.service';
import {SocialSignInService} from '../services/socialSignIn.service';
import { LegacyTicketService } from '../services/ticket-service';
import { Ticket } from './ticket';
import {TicketManagementService} from "../ticket-management/ticket-management-service";
import {Prize} from "../admin-dashboard/person";


declare var  Winwheel: any;
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketComponent implements OnInit {

  theWheel: any;

  public tickets: Ticket[] = [];
  public userId: number = 0;
  public message: string = '';
  userProfile: any;

  public prize : Prize;
  private ticketCount : number;
  constructor(private ticketService: LegacyTicketService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private fb: SocialSignInService,
              private personService: PersonService,
              private ticketManagementService : TicketManagementService) { }
  public form = this.formBuilder.group({
    ticketNumber: new FormControl('',[Validators.minLength(10), Validators.maxLength(10) , Validators.pattern("^[0-9]*$"),
    ], ),
  })
  ngOnInit(): void {
   this.getTickets();
   console.log('ticket',this.userProfile)
    this.personService.getUserIdByUsername().subscribe(userId => {
      this.userId= userId;
    });

    this.theWheel = new Winwheel({
      'canvasId'       : 'winwheelcanvas',
      'numSegments': 5,         // Number of segments
      'outerRadius': 100 ,       // The size of the wheel.
      'centerX': 217,       // Used to position on the background correctly.
      'centerY': 100,
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
          'duration': 10,
          'spins': 8,
          'callbackFinished': this.alertPrize
        }
    });


  }

//   this.ticketManagementService.getTicketsCount().subscribe((data: any) => {
//   console.log("prize ", data)
//   this.prize = data;
// });
//

  public getTickets(){
    this.ticketService.getTicketByUserId().subscribe((data: Ticket[])=>{
      return this.tickets = data;
    })
  }

  public async validateTicket(): Promise<boolean> {
    const ticketNumberValue = this.form.value.ticketNumber;
    console.log(ticketNumberValue);

    try {
      const message = await new Promise<boolean>((resolve) => {
        this.ticketService
          .checkTicket(Number(this.form.value.ticketNumber), this.userId)
          .subscribe((result) => {
            console.log('test', result);
            const isValid = !result;
            resolve(isValid);
            if (isValid) {
              this.snackBar.open('Votre ticket est ajouté avec succès', 'close', this.getSnackBarConfig());
            } else {
              this.snackBar.open('Ce ticket est déjà utilisé', 'close', this.getSnackBarConfig());
            }
          });
      });

      return message;
    } catch (error) {
      console.error('Error checking ticket:', error);
      return false;
    }
  }

  private getSnackBarConfig(): MatSnackBarConfig {
    return {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar'],
    };
  }


  utiliserUnTicket() {
    this.ticketManagementService.utiliserTicket().subscribe((data: any) => {
      console.log("prize ", data)
      this.prize = data;
    });
  }

  async startAnimation(){
    if (await this.validateTicket()){
      const ticketNumberValue : number = (Number(this.form.value.ticketNumber));
      console.log("start the animation");
      this.ticketManagementService.spinWheel(ticketNumberValue).subscribe((data:any)=> {
        this.prize = data;
        this.theWheel.stopAngle = this.prize.angle;
        this.theWheel.animation.spins=8
        this.theWheel.animation.duration=10
        this.theWheel.startAnimation();
      })
    };


  }
  alertPrize(indicatedSegment : any) : void {
    // Do basic alert of the segment text.
    alert("You have won " + indicatedSegment.text);
  }
}
