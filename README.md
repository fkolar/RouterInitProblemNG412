# RouterInitProblemNG412

After I upgraded into Angular 4  (4.1.2 now), I started to have this weird problem that used to work in 2.4.7.
It has something to do with Router Initialization and maybe something related to 
https://github.com/angular/angular/issues/14588 ?

I tried to isolate this into reproducible case and here it is. 

I have my *AppModule* which uses 3 modules:
* test - My simple test app that renders some content
* core - represent core reusable module 
* feaure - some additional feature module which shows actual problem
 
 
 
 **Module description:**
  
 * App Module, just setups ```router-outlet```  and imports `Coremodule `  to have access to a Service `RoutingService`
 * Test App Module tries to use some component from `FeatureModule`, but it fails as feature module will not initialize
 * `FeatureModule` has `APP_INITIALIZER`, with `Injector` dependency which is used to get a Service from Core Module. 
    * here it fails as a Service from core module `RoutingService` is trying to inject Router, that has not been probably initialized yet. 
     

In previous version the routing subsystem blocked its execution until it was initialized and when FeatureModule tried to get
     a Service `Routing Service` it was available along with corrected injected `Router` services.
     

When I inject  `RoutingService` into my AppComponent from AppModule, then it works. Somethign with the execution order changed when you 
     use `APP_INITIALIZER`
     


I checked the `Injector` inside the `initMyFeature` factory method and it does not have any provider called Router when I check the same 
in the App component it has provider. This initializer must has been called even before Router setup.


**Expected Behavior***

I expect as Angular 4.1.0 inits this App it will try first:
* Load AppModule and its imports
  * setup Router
  * Provide Services from Imported Core Module
  * Setup Test App Module
    * Test App Module init imported Modules
        * executes Initializer from Feature module and since provider for Router has been already defined in AppModule 
        I can inject Router into RoutingService



 
```
ERROR TypeError: Cannot read property 'routerState' of undefined
    at rootRoute (router.es5.js:5880)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.getInternal (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.NgModuleInjector.get (core.es5.js:3556)
    at my-feature.module.ts:31
    at new ZoneAwarePromise (zone.js:821)
    at Array.<anonymous> (my-feature.module.ts:29)
    at new ApplicationInitStatus (core.es5.js:2908)
    at AppModuleInjector.createInternal (module.ngfactory.js? [sm]:1)
defaultErrorLogger @ core.es5.js:1084
ErrorHandler.handleError @ core.es5.js:1144
(anonymous) @ core.es5.js:4663
ZoneDelegate.invoke @ zone.js:381
onInvoke @ core.es5.js:4128
ZoneDelegate.invoke @ zone.js:380
Zone.run @ zone.js:141
(anonymous) @ zone.js:805
ZoneDelegate.invokeTask @ zone.js:414
onInvokeTask @ core.es5.js:4119
ZoneDelegate.invokeTask @ zone.js:413
Zone.runTask @ zone.js:181
drainMicroTaskQueue @ zone.js:574
zone.js:630 Unhandled Promise rejection: Cannot read property 'routerState' of undefined ; Zone: <root> ; Task: Promise.then ; Value: TypeError: Cannot read property 'routerState' of undefined
    at rootRoute (router.es5.js:5880)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.getInternal (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.NgModuleInjector.get (core.es5.js:3556)
    at my-feature.module.ts:31
    at new ZoneAwarePromise (zone.js:821)
    at Array.<anonymous> (my-feature.module.ts:29)
    at new ApplicationInitStatus (core.es5.js:2908)
    at AppModuleInjector.createInternal (module.ngfactory.js? [sm]:1) TypeError: Cannot read property 'routerState' of undefined
    at rootRoute (http://localhost:4200/vendor.bundle.js:31473:18)
    at AppModuleInjector.get (ng:///AppModule/module.ngfactory.js:139:73)
    at AppModuleInjector.get (ng:///AppModule/module.ngfactory.js:174:118)
    at AppModuleInjector.getInternal (ng:///AppModule/module.ngfactory.js:294:54)
    at AppModuleInjector.NgModuleInjector.get (http://localhost:4200/vendor.bundle.js:4205:44)
    at http://localhost:4200/main.bundle.js:220:43
    at new ZoneAwarePromise (http://localhost:4200/polyfills.bundle.js:3489:29)
    at Array.<anonymous> (http://localhost:4200/main.bundle.js:218:23)
    at new ApplicationInitStatus (http://localhost:4200/vendor.bundle.js:3557:45)
    at AppModuleInjector.createInternal (ng:///AppModule/module.ngfactory.js:191:35)
api.onUnhandledError @ zone.js:630
handleUnhandledRejection @ zone.js:654
_loop_1 @ zone.js:645
api.microtaskDrainDone @ zone.js:649
drainMicroTaskQueue @ zone.js:582
zone.js:632 Error: Uncaught (in promise): TypeError: Cannot read property 'routerState' of undefined
TypeError: Cannot read property 'routerState' of undefined
    at rootRoute (router.es5.js:5880)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.getInternal (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.NgModuleInjector.get (core.es5.js:3556)
    at my-feature.module.ts:31
    at new ZoneAwarePromise (zone.js:821)
    at Array.<anonymous> (my-feature.module.ts:29)
    at new ApplicationInitStatus (core.es5.js:2908)
    at AppModuleInjector.createInternal (module.ngfactory.js? [sm]:1)
    at rootRoute (router.es5.js:5880)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.get (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.getInternal (module.ngfactory.js? [sm]:1)
    at AppModuleInjector.NgModuleInjector.get (core.es5.js:3556)
    at my-feature.module.ts:31
    at new ZoneAwarePromise (zone.js:821)
    at Array.<anonymous> (my-feature.module.ts:29)
    at new ApplicationInitStatus (core.es5.js:2908)
    at AppModuleInjector.createInternal (module.ngfactory.js? [sm]:1)
    at resolvePromise (zone.js:757)
    at zone.js:683
    at zone.js:699
    at ZoneDelegate.invoke (zone.js:381)
    at Zone.run (zone.js:141)
    at zone.js:805
    at ZoneDelegate.invokeTask (zone.js:414)
    at Zone.runTask (zone.js:181)
    at drainMicroTaskQueue (zone.js:574)
    at <anonymous>

```
