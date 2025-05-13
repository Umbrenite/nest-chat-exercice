import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GroupChatComponent } from './chat/group-chat/group-chat.component';

export const routes: Routes = [
    {path: "", component: ChatComponent},

    {path: "groups/:id", component: GroupChatComponent},

    {path: "**", redirectTo: ""}

];
