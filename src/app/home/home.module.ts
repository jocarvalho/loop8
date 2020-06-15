import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage, FecharEcoBag } from './home.page';
import {PopoverComponent} from './popover/popover.component';
import { HomePageRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FecharEcoBag],
  entryComponents: [FecharEcoBag]
})
export class HomePageModule {}
