import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TicketPrize, User} from "../user-manager/User";
import {MatPaginator} from "@angular/material/paginator";
import {LegacyTicketService} from "../services/ticket-service";
import {UsermanagerService} from "../user-manager/user-manager.service";
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  displayedColumns: string[] = ['ticketNumber', 'status',  'prize', 'image'];
  dataSource = new MatTableDataSource<TicketPrize>();

  users : User[];
  prizes : string[];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ticketService:LegacyTicketService,private userService : UsermanagerService) { }

  ngOnInit(): void {
    this.getTickets();
    this.userService.getSimpleUsers().subscribe(users => {
      this.users = users;
    });
    this.userService.getPrizes().subscribe(prizes => {
      this.prizes = prizes;
    });


    console.log("users" , this.users);
    console.log("prizes" , this.prizes);
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
      url = '../../assets/infuseur_tea.jpg'
    return url
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log("paginatooooor",this.paginator);
    console.log("paginatooooor 2" ,this.dataSource.paginator);
  }

  filterByUserName(userid : number) {
    console.log("filter by user id ",userid);
      this.ticketService.getTicketByUserIds(userid).subscribe((data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<TicketPrize>(data);;
      })

  }

  filterByProduct(id : string) {
    console.log("filter by user product ",id);
    this.ticketService.getTicketsByPrize(id).subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<TicketPrize>(data);;
    })
  }
}
