import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../app-reusables/services/device.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-types',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, RouterLink],
  templateUrl: './notification-types.component.html',
  styleUrls: ['./notification-types.component.scss']
})
export class NotificationTypesComponent {
  private deviceService = inject(DeviceService);
  isHandset$ = this.deviceService.isHandset$;
}
