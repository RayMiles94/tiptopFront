import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {ContactComponent} from './contact/contact.component';
import {GiveAwayAddComponent} from './giveaway/give-away-add/give-away-add.component';
import {GiveAwayEditComponent} from './giveaway/give-away-edit/give-away-edit.component';
import {GivewayComponent} from './giveaway/giveaway.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TicketComponent } from './ticket/ticket.component';
import {UserHistoryComponent} from './user-history/user-history.component';
import { UsermanagerCompnent } from './user-manager/user-manager.component';
import {TicketManagementComponent} from "./ticket-management/ticket-management.component";
import {MyTicketsComponent} from "./my-tickets/my-tickets.component";
import {WinwheelTest} from "./winwheeltest/winwheeltest.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },

  { path: 'logIn',
   component: LogInComponent
  },
  { path: 'signUp',
  component: SignUpComponent
 },
 {
  path: 'myAccount',
  component: TicketComponent
 },
  {
    path: 'admin/giveaway',
    component: AdminDashboardComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'admin',
    component: GivewayComponent
  },
  {
    path: 'winner',
    component: GiveAwayEditComponent
  },
  {
    path: 'addTicket',
    component: GiveAwayAddComponent
  },
  {
    path: 'historique',
    component: UserHistoryComponent
  },
  {
    path: 'statistiques',
    component: StatisticsComponent
  },
  {
    path: 'usermanager',
    component : UsermanagerCompnent
  },
  {
    path: 'ticketmanagement/:id',
    component : TicketManagementComponent
  },
  {
    path: 'ticketmanagement',
    component : MyTicketsComponent
  },
  {
    path : 'winwheeltest',
    component : WinwheelTest
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
