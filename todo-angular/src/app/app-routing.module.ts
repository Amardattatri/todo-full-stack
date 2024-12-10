import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponentComponent } from "./auth/login-component/login-component.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TodosComponent } from "./todos/todos.component";
import { AuthGaurd } from "./auth/auth.guard";

const routes: Routes = [
    {path: 'login', component: LoginComponentComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'todos', component: TodosComponent , canActivate: [AuthGaurd] }, 
    {path: '**', redirectTo: 'login'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}