import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassroomComponent} from "./classroom/component/classroom/classroom.component";

const routes: Routes = [{
  path: '',
  loadChildren: () => import('../app/main-page/main-page.module').then(m=>m.MainPageModule)
},
  {
    path: 'classroom',
//    loadChildren: () => import('../app/classroom/classroom.module').then(m=>m.ClassroomModule)
    component: ClassroomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
