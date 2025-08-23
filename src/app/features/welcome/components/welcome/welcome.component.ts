import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  @Output() startInstallation = new EventEmitter<void>();

  onStartInstallation() {
    this.startInstallation.emit();
  }

}
