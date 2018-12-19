import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrittenTestimonialsComponent } from './written-testimonials.component';
import { VideoTestimonialsComponent } from './video-testimonials.component';

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
        }
      },
      {
        path: 'video',
        component: VideoTestimonialsComponent,
        data: {
          title: 'video'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialsRoutingModule {}
