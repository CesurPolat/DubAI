import { Component } from '@angular/core';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { FolderSelectionComponent } from "../components/folder-selection/folder-selection.component";
import { CommonModule } from '@angular/common';
import { GptTokenComponent } from '../components/gpt-token/gpt-token.component';
import { InstallationCompletedComponent } from '../components/installation-completed/installation-completed.component';
import { NoInternetComponent } from '../../../shared/components/no-internet/no-internet.component';
import { FfmpegInstallationComponent } from '../components/ffmpeg-installation/ffmpeg-installation.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { gsap } from 'gsap';
import { SetupStatus } from '../../../../../electron/services/setup.service';
import { slidingComponents } from '../../../shared/utils/animation.utils';

export type WelcomePageViews = 'welcome' | 'folderSelection' | 'gptToken' | 'ffmpegInstallation' | 'installationComplete' | 'noInternet' | 'loading';

@Component({
  selector: 'app-welcome-page',
  imports: [WelcomeComponent, FolderSelectionComponent, GptTokenComponent, FfmpegInstallationComponent, InstallationCompletedComponent, NoInternetComponent, LoadingComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  currentView: WelcomePageViews = 'welcome';

  backgroundColor: string = 'bg-blue-400';

  ngAfterContentInit() {
    console.log("View Initialized");
    gsap.set(`#${this.currentView}`, { display: 'block' });
  }

  startInstallation() {

    if (this.currentView == 'noInternet' || this.currentView == 'ffmpegInstallation') {
      this.currentView = slidingComponents(this.currentView, 'loading');
      this.backgroundColor = 'bg-blue-400';
      setTimeout(() => {
        this.startInstallation();
      }, 1000);
      return;
    }

    if (!navigator.onLine) {
      this.currentView = slidingComponents(this.currentView, 'noInternet');
      this.backgroundColor = 'bg-red-400';
      return;
    }

    window.API.SetupChecker().then((result: SetupStatus) => {

      console.log("Result:", result);

      switch (result) {
        case -1:
          this.currentView = slidingComponents(this.currentView, 'folderSelection');
          this.backgroundColor = 'bg-blue-400';
          return;

        case -2:
          this.currentView = slidingComponents(this.currentView, 'gptToken');
          this.backgroundColor = 'bg-blue-400';
          return;

        case -3:
          this.currentView = slidingComponents(this.currentView, 'ffmpegInstallation');
          this.backgroundColor = 'bg-blue-400';
          return;

        case 0:
          this.currentView = slidingComponents(this.currentView, 'installationComplete');
          this.backgroundColor = 'bg-green-400';
          return;

      }
    });

  }
  

}
