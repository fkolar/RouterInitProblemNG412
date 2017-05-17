import { Component } from '@angular/core';
import {RoutingService} from "./core/routing-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';


  constructor(private routingService: RoutingService)
  {
    console.log(routingService)
  }



}
