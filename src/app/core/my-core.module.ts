import {NgModule, ModuleWithProviders, APP_INITIALIZER} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RoutingService} from "./routing-service.service";
import {Router, ActivatedRoute} from "@angular/router";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [

    {provide: RoutingService, useClass: RoutingService, deps: [Router, ActivatedRoute]},

    {
      'provide': APP_INITIALIZER,
      'useFactory': initI18nSupport,
      'multi': true,
    }
  ]
})
export class MyCoreModule {

  // static forRoot(config: {[key: string]: any} = {}): ModuleWithProviders {
  //   return {
  //     ngModule: MyCoreModule,
  //
  //   };
  // }


}



export function initI18nSupport(): Function {
  return () => {
    let promise: Promise<any> = new Promise((resolve: any) => {
      console.log("init i18n support .....");

      resolve(true);
    });
    return promise;

  };
}
