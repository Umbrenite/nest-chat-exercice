import { Component, Input } from '@angular/core';

@Component({
  selector: 'group-icon',
  imports: [],
  templateUrl: './group-icon.component.html',
  styleUrl: './group-icon.component.scss'
})
export class GroupIconComponent {
  @Input() iconUrl = "";
  @Input() groupId = "";
}
