import { Component } from '@angular/core';
import { WelcomeComponent } from '../../comps/welcome/welcome.component';
import { FolderSelectionComponent } from "../../comps/folder-selection/folder-selection.component";
import { NoInternetComponent } from '../../comps/no-internet/no-internet.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../comps/loading/loading.component';
import { GptTokenComponent } from '../../comps/gpt-token/gpt-token.component';

@Component({
  selector: 'app-welcome-page',
  imports: [WelcomeComponent, FolderSelectionComponent, GptTokenComponent, NoInternetComponent, LoadingComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  currentView: 'welcome' | 'folderSelection' | 'gptToken' | 'noInternet' | 'loading' = 'welcome';

  backgroundColor: string = 'bg-blue-400';

  startInstallation() {

    /* switch (this.currentView) {
      case 'folderSelection':
        this.currentView = 'gptToken';
        this.backgroundColor = 'bg-blue-400';
        break;
      case 'gptToken':
        this.currentView = 'loading';
        this.backgroundColor = 'bg-blue-400';
        break;
    } */

    if(this.currentView == 'noInternet') {
      this.currentView = 'loading';
      this.backgroundColor = 'bg-blue-400';
      setTimeout(() => {
        this.startInstallation();
      }, 1000);
      return;
    }

    if (!navigator.onLine){
      this.currentView = 'noInternet';
      this.backgroundColor = 'bg-red-400';
      return;
    }

    this.currentView = 'folderSelection';
    this.backgroundColor = 'bg-blue-400';
  }

}
