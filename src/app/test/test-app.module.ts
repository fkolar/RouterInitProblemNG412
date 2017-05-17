import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import {TestAppRoutingModule} from "./test-app-routing.module";
import {MyCoreModule} from "../core/my-core.module";
import {MyFeatureModule} from "../feature/my-feature.module";

@NgModule({
  imports: [
    CommonModule,
    TestAppRoutingModule,

    MyCoreModule,
    MyFeatureModule // Import Feature as I want to use one component from here
  ],
  declarations: [TestPageComponent]
})
export class TestAppModule {



}
