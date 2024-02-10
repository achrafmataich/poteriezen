import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EngagementComponent } from './engagement/engagement.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "gallery", component: GalleryComponent },
  { path: "engagement", component: EngagementComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "booking", component: BookingComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "video", component: VideoComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
