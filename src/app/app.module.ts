import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { ionCloudyNight, ionFlower, ionHeart, ionLogoFacebook, ionLogoInstagram, ionLogoTwitter, ionSend, ionSunny } from '@ng-icons/ionicons';
import { EngagementComponent } from './engagement/engagement.component';
import { VideoComponent } from './video/video.component';
import { ToggleButtonComponent } from './shared/toggle-button/toggle-button.component';
import { FooterComponent } from './footer/footer.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    GalleryComponent,
    ContactComponent,
    BookingComponent,
    NotFoundComponent,
    NavbarComponent,
    EngagementComponent,
    VideoComponent,
    ToggleButtonComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ ionHeart, ionFlower, ionSunny, ionCloudyNight, ionLogoFacebook, ionLogoTwitter, ionLogoInstagram, ionSend }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
