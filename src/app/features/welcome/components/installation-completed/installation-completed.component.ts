import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matTaskAlt } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-installation-completed',
  imports: [NgIcon],
  providers: [provideIcons({ matTaskAlt })],
  templateUrl: './installation-completed.component.html',
  styleUrl: './installation-completed.component.css'
})
export class InstallationCompletedComponent {

  private router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/home']);
  }

}
