import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DubAI';

  private router = inject(Router);

  constructor() {
    window.API.SetupChecker().then((status: number) => {
      if (status === 0) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/welcome']);
      }

    });

  }
}
