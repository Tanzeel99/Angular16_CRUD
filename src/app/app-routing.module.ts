import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  
  {
    path : '',
    redirectTo : 'list',
    pathMatch:'full'
  },
  {
    path : 'list',
    component : UserListComponent 
  },
  {
    path : 'add',
    component : CreateUserComponent 
  },
  {
    path : 'detail/:id',
    component : UserDetailComponent 
  },
  {
    path : 'update/:id',
    component : CreateUserComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
