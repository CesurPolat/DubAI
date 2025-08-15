import { Component } from '@angular/core';
import { WelcomeComponent } from '../../comps/welcome/welcome.component';
import { FolderSelectionComponent } from "../../comps/folder-selection/folder-selection.component";
import { NoInternetComponent } from '../../comps/no-internet/no-internet.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../comps/loading/loading.component';
import { GptTokenComponent } from '../../comps/gpt-token/gpt-token.component';
import { InstallationCompletedComponent } from '../../comps/installation-completed/installation-completed.component';
import { FfmpegInstallationComponent } from '../../comps/ffmpeg-installation/ffmpeg-installation.component';

import { SetupStatus } from '../../../../electron/services/setup.service';

@Component({
  selector: 'app-welcome-page',
  imports: [WelcomeComponent, FolderSelectionComponent, GptTokenComponent, FfmpegInstallationComponent, InstallationCompletedComponent, NoInternetComponent, LoadingComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  currentView: 'welcome' | 'folderSelection' | 'gptToken' | 'ffmpegInstallation' | 'installationComplete' | 'noInternet' | 'loading' = 'welcome';

  backgroundColor: string = 'bg-blue-400';

  startInstallation() {

    if (this.currentView == 'noInternet' || this.currentView == 'ffmpegInstallation') {
      this.currentView = 'loading';
      this.backgroundColor = 'bg-blue-400';
      setTimeout(() => {
        this.startInstallation();
      }, 1000);
      return;
    }

    if (!navigator.onLine) {
      this.currentView = 'noInternet';
      this.backgroundColor = 'bg-red-400';
      return;
    }

    window.API.SetupChecker().then((result: number) => {

      console.log("Result:", result);

      switch (result) {
        case -1:
          this.currentView = 'folderSelection';
          this.backgroundColor = 'bg-blue-400';
          return;

        case -2:
          this.currentView = 'gptToken';
          this.backgroundColor = 'bg-blue-400';
          return;

        case -3:
          this.currentView = 'ffmpegInstallation';
          this.backgroundColor = 'bg-blue-400';
          return;

        case 0:
          this.currentView = 'installationComplete';
          this.backgroundColor = 'bg-green-400';
          return;

      }
    });

  }

}
