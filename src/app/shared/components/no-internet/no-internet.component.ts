import { Component, EventEmitter, Output } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { matSignalWifiConnectedNoInternet4 } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-no-internet',
  imports: [NgIcon],
  providers: [provideIcons({ matSignalWifiConnectedNoInternet4 })],
  templateUrl: './no-internet.component.html',
  styleUrl: './no-internet.component.css'
})
export class NoInternetComponent {

  @Output() retry = new EventEmitter<void>();

  retryConnection() {
    this.retry.emit();
  }

}
