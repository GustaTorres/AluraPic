import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    AppRoutingModule,
    ErrorsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
