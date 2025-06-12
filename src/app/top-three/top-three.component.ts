import { Component, input } from '@angular/core';
import { UserModel } from '@core/models/user.model';

@Component({
  selector: 'app-top-three',
  imports: [],
  templateUrl: './top-three.component.html',
  styleUrl: './top-three.component.scss',
})
export class TopThreeComponent {
  users = input.required<UserModel[]>();
}
