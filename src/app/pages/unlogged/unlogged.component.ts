import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-unlogged',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class UnloggedComponent {}
