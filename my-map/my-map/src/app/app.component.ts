import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldComponent } from './world/world.component'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  title = 'd280_app';
}
