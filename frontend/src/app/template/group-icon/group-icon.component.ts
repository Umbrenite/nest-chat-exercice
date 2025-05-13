import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'group-icon',
  imports: [RouterLink],
  templateUrl: './group-icon.component.html',
  styleUrl: './group-icon.component.scss'
})
export class GroupIconComponent {
  @Input() iconUrl = "";
  @Input() groupId = "";
}
