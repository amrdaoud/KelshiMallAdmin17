import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './name-circle.component.html',
  styleUrls: ['./name-circle.component.scss']
})
export class NameCircleComponent {
  @Input({required: true}) name = '';
  @Input() id = '';
  @Input() color = 'primary'
  @Input() language: string | null = 'en';

  get initials(): string {
    return this.name[0].toUpperCase();
  }
}
