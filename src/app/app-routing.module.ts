import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard, AuthGuard } from './auth.guard';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UserCategoryComponent } from './user-category/user-category.component';

const routes: Routes = [
  {path:'',component:CategoryComponent},
  {path:'login',component:LoginComponent},
  {path:'addcategory',component:AddcategoryComponent,canActivate:[AdminAuthGuard]},
  {path:'user',component:UserCategoryComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
