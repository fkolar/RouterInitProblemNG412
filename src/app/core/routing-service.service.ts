import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Injectable()
export class RoutingService {

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    console.log('RoutingService: ' + RoutingService);
  }

}
