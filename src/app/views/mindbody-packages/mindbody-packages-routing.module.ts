import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check'
import { MindbodyPackagesComponent } from './mindbody-packages.component'

const routes: Routes = [
    {
        path: '', component: MindbodyPackagesComponent,
        data: {
            title: 'mindbody-packages'
        },
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MindbodyPackagesRoutingModule { }