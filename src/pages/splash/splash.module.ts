import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplashPage } from './splash.component';

@NgModule({
  declarations: [
    SplashPage,
  ],
  imports: [
    IonicPageModule.forChild(SplashPage),
  ],
})
export class SplashPageModule {}
