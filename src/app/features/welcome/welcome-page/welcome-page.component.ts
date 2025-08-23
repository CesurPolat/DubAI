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

@Component({
  selector: 'app-welcome-page',
  imports: [WelcomeComponent, FolderSelectionComponent, GptTokenComponent, FfmpegInstallationComponent, InstallationCompletedComponent, NoInternetComponent, LoadingComponent, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  currentView: 'welcome' | 'folderSelection' | 'gptToken' | 'ffmpegInstallation' | 'installationComplete' | 'noInternet' | 'loading' = 'welcome';

  backgroundColor: string = 'bg-blue-400';

  ngAfterContentInit() {
    console.log("View Initialized");
    gsap.set(`#${this.currentView}`, { display: 'block' });
  }

  startInstallation() {

    if (this.currentView == 'noInternet' || this.currentView == 'ffmpegInstallation') {
      this.changeView('loading');
      this.backgroundColor = 'bg-blue-400';
      setTimeout(() => {
        this.startInstallation();
      }, 1000);
      return;
    }

    if (!navigator.onLine) {
      this.changeView('noInternet');
      this.backgroundColor = 'bg-red-400';
      return;
    }

    window.API.SetupChecker().then((result: number) => {

      console.log("Result:", result);

      switch (result) {
        case -1:
          this.changeView('folderSelection');
          this.backgroundColor = 'bg-blue-400';
          return;

        case -2:
          this.changeView('gptToken');
          this.backgroundColor = 'bg-blue-400';
          return;

        case -3:
          this.changeView('ffmpegInstallation');
          this.backgroundColor = 'bg-blue-400';
          return;

        case 0:
          this.changeView('installationComplete');
          this.backgroundColor = 'bg-green-400';
          return;

      }
    });

  }

  changeView(view: 'welcome' | 'folderSelection' | 'gptToken' | 'ffmpegInstallation' | 'installationComplete' | 'noInternet' | 'loading') {
    gsap.to(`#${this.currentView}`, {
      opacity: 0, x: -200, ease: 'power2.inOut', duration: 0.3, onComplete: () => {

        gsap.set(`#${this.currentView}`, { display: 'none', opacity: 1, x: 0 });
        this.currentView = view;
        gsap.set(`#${this.currentView}`, { display: 'block' });
        gsap.from(`#${this.currentView}`, { opacity: 0, x: 200, duration: 0.3, ease: 'power2.inOut' });

      }
    });
  }

}
