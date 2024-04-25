import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaincontactuscontainerComponent } from './maincontactuscontainer/maincontactuscontainer.component';
import { MenusliderComponent } from './menuslider/menuslider.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SliderComponent } from './slider/slider.component';
import { DealssliderComponent } from './dealsslider/dealsslider.component';
import { MenuitemmodalComponent } from './menuitemmodal/menuitemmodal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import {navbarReducer} from "./shared/navbar/navbar.state";
import {topbarReducer} from "./shared/topbar/topbar.state";
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    SliderComponent,
    MaincontactuscontainerComponent,
    MenusliderComponent,
    DealssliderComponent,
    MenuitemmodalComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({navbar:navbarReducer,topbar:topbarReducer}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
