import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LegacyTicketService} from '../services/ticket-service';
import {Ticket} from '../ticket/ticket';
import {MatTableDataSource} from "@angular/material/table";
import {TicketPrize} from "../user-manager/User";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['ticketNumber', 'status',  'prize', 'image'];
  dataSource = new MatTableDataSource<TicketPrize>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ticketService:LegacyTicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  public getTickets() {
    this.ticketService.getTicketByUserId().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<TicketPrize>(data);;
    })
  }

  public setImg(prize:string) {
    let url;
    if (prize == 'coffret découverte d’une valeur de 39€' || prize =='coffret découverte d’une valeur de 69€')
      url= '../../assets/tea.png';
    else if (prize == 'Boite 100g the détox ou infusion')
      url = '../../assets/box.png'
    else if (prize == 'Boite 100g the signature')
      url = '../../assets/boxtea.jpeg'
    else if (prize == 'Infuseur the')
      url = '../../assets/tea.jpg'
    return url
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  console.log("paginatooooor",this.paginator);
  console.log("paginatooooor 2" ,this.dataSource.paginator);
  }
}
