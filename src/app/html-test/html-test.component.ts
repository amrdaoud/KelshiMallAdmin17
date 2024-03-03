import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-html-test',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatIconModule],
  templateUrl: './html-test.component.html',
  styleUrls: ['./html-test.component.scss']
})
export class HtmlTestComponent {
  max = 5;
  min = 2;
  rnd = Math.floor(Math.random() * (this.max - this.min + 1) + this.min)
}
