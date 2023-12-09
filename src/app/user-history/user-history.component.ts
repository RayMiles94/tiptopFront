import { Component, OnInit } from '@angular/core';
import {LegacyTicketService} from '../services/ticket-service';
import {Ticket} from '../ticket/ticket';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  displayedColumns: string[] = ['ticketNumber', 'status',  'prize', 'image'];
  dataSource: Ticket[]=[];
  constructor(private ticketService:LegacyTicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  public getTickets() {
    this.ticketService.getTicketByUserId().subscribe((data: Ticket[]) => {
      console.log(data);
      this.dataSource = data;
    })
  }

  public setImg(prize:string) {
    let url;
    if (prize == 'Coffret découverte d’une valeur de 39€' || prize =='Coffret découverte d’une valeur de 69€')
      url= '../../assets/tea.png';
    else if (prize == 'Boite de 100g d’un thé détox ou d’infusion')
      url = '../../assets/box.png'
    else if (prize == 'Boite de 100g d’un thé signature')
      url = '../../assets/boxtea.jpeg'
    else if (prize == 'Infuseur')
      url = '../../assets/images.jpg'
    return url
  }
}
