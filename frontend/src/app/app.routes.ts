import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GroupChatComponent } from './chat/group-chat/group-chat.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    
    {path: "", component: ChatComponent, canActivate: [AuthGuard]},
    {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
    {path: "groups/:id", component: GroupChatComponent, canActivate: [AuthGuard]},

    {path: "**", redirectTo: ""}

];
