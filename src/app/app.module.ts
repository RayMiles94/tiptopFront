import { NgModule } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GivewayComponent} from './giveaway/giveaway.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogInComponent } from './log-in/log-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {SocialSignInService} from './services/socialSignIn.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { TicketComponent } from './ticket/ticket.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketServiceService } from './services/ticket-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GiveAwayAddComponent } from './giveaway/give-away-add/give-away-add.component';
import { GiveAwayEditComponent } from './giveaway/give-away-edit/give-away-edit.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ContactComponent } from './contact/contact.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserHistoryComponent } from './user-history/user-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SignUpComponent,
    FooterComponent,
    TicketComponent,
    AdminDashboardComponent,
    GivewayComponent,
    GiveAwayAddComponent,
    GiveAwayEditComponent,
    UserHeaderComponent,
    AdminHeaderComponent,
    ContactComponent,
    UserHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [TicketServiceService,SocialSignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
