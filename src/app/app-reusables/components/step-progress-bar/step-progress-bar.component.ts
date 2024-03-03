import { Component, Input } from '@angular/core';
import { OrderStatusHistoryModel } from '../../../orders/order';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-step-progress-bar',
  standalone: true,
  imports: [CommonModule, MatTooltip],
  templateUrl: './step-progress-bar.component.html',
  styleUrl: './step-progress-bar.component.scss'
})
export class StepProgressBarComponent {
  @Input() statuses: OrderStatusHistoryModel[] = [];
}
