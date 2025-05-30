import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'group-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-icon.component.html',
  styleUrl: './group-icon.component.scss'
})
export class GroupIconComponent {
  @Input() iconUrl = "";
}
