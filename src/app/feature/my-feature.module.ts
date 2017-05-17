import {NgModule, Injector, APP_INITIALIZER} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RoutingService} from "../core/routing-service.service";
import { YoyoComponent } from './yoyo.component';
import {MyCoreModule} from "../core/my-core.module";

@NgModule({
  imports: [
    CommonModule,
    MyCoreModule
  ],
  declarations: [YoyoComponent],

  providers: [
    {
      'provide': APP_INITIALIZER,
      'useFactory': initMyFeature,
      'deps': [Injector],
      'multi': true,
    }
  ],
  exports: [YoyoComponent]
})
export class MyFeatureModule {

}


export function initMyFeature(injector: Injector): Function {
  return () => {
    let promise: Promise<any> = new Promise((resolve: any) => {
      console.log("init feature module.....");
      let routingService = injector.get(RoutingService);

      console.log("init feature module....." + routingService);

      resolve(true);
    });
    return promise;

  };
}
