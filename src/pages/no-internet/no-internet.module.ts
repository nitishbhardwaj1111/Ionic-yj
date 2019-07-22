import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoInternetPage } from './no-internet';

@NgModule({
  declarations: [
    NoInternetPage,
  ],
  imports: [
    IonicPageModule.forChild(NoInternetPage),
  ],
})
export class NoInternetPageModule {}
