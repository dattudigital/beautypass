import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './views/users/users.module#UsersModule',
        data: { preload: true }
      },
      {
        path: 'mindbody-coupons',
        loadChildren: './views/mindbody-coupons/mindbody-coupons.module#MindbodyCouponsModule'
      },
      {
        path: 'employees',
        loadChildren: './views/employees/employees.module#EmployeesModule'
      },
      {
        path: 'faqs',
        loadChildren: './views/faqs/faqs.module#FaqsModule'
      },
      {
        path: 'beauty-tips',
        loadChildren: './views/beautytip/beautytip.module#BeautytipModule'
      },
      {
        path: 'mindbody-packages',
        loadChildren: './views/mindbody-packages/mindbody-packages.module#MindbodyPackagesModule'

      },
      {
        path: 'testmonials',
        loadChildren: './views/testimonials/testimonials.module#TestimonialsModule'
      },
      {
        path: 'admin',
        loadChildren: './views/broadcast/broadcast.module#BroadcastModule'
      },
      {
        path: 'reports',
        loadChildren: './views/reports/reports.module#ReportsModule'
      },
      {
        path: 'refferal-rewards',
        loadChildren: './views/refferal-rewards/refferal-rewards.module#RefferalRewardsModule'
      },

      {
        path: 'employee-history',
        loadChildren: './views/employee-history/employee-history.module#EmployeeHistoryModule'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
