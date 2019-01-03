import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrittenTestimonialsComponent } from './written-testimonials.component';
import { VideoTestimonialsComponent } from './video-testimonials.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'written'
      },
      {
        path: 'written',
        component: WrittenTestimonialsComponent,
        data: {
          title: 'Written'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'video',
        component: VideoTestimonialsComponent,
        data: {
          title: 'video'
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialsRoutingModule {}
