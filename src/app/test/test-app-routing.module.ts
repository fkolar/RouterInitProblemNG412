import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TestPageComponent} from "./test-page.component";


const routesDemo: Routes = [
    {
        path: 'test', component: TestPageComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routesDemo),
    ],
    exports: [RouterModule],
    providers: []
})
export class TestAppRoutingModule
{
}
