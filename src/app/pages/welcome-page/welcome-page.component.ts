import { Component } from '@angular/core';
import { WelcomeComponent } from '../../comps/welcome/welcome.component';
import { FolderSelectionComponent } from "../../comps/folder-selection/folder-selection.component";
import { NoInternetComponent } from '../../comps/no-internet/no-internet.component';

@Component({
  selector: 'app-welcome-page',
  imports: [WelcomeComponent, FolderSelectionComponent, NoInternetComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  currentView: 'welcome' | 'folderSelection' | 'noInternet' = 'welcome';

  startInstallation() {
    this.currentView = 'noInternet';
  }

}
