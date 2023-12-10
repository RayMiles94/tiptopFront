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
import { LegacyTicketService } from './services/ticket-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {SocialLoginModule, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { GiveAwayAddComponent } from './giveaway/give-away-add/give-away-add.component';
import { GiveAwayEditComponent } from './giveaway/give-away-edit/give-away-edit.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ContactComponent } from './contact/contact.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserHistoryComponent } from './user-history/user-history.component';
import {MatDividerModule} from '@angular/material/divider';
import { UsermanagerCompnent } from './user-manager/user-manager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {JwtInterceptor} from "./common/auth.interceptor";
import {MatButtonModule} from "@angular/material/button";
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import {MatBadgeModule} from "@angular/material/badge";
import { WinWheelModule } from './winwheel/winwheel.module';
import { WinwheelTest } from './winwheeltest/winwheeltest.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  bootstrap: [AppComponent],
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
    UserHistoryComponent,
    UsermanagerCompnent,
    TicketManagementComponent,
    MyTicketsComponent,
    WinwheelTest,
    StatisticsComponent,
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
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    SocialLoginModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    WinWheelModule,
    MatListModule
  ],
  providers: [LegacyTicketService, SocialSignInService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '939954036993-7t1uesrkei878qoor4o4kqtg0u0q4j0s.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('670909031477948')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],

})
export class AppModule { }
