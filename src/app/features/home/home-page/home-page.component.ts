import { Component } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matCopyright, matSettings } from '@ng-icons/material-icons/baseline';
import { ContentPickerComponent } from "../components/content-picker/content-picker.component";
import { ContentViewerComponent } from "../components/content-viewer/content-viewer.component";
import { gsap } from "gsap";
import { CommonModule } from '@angular/common';
import { slidingComponents } from '../../../shared/utils/animation.utils';
import { Content } from '../../../../../electron/DTOs/content';

@Component({
  selector: 'app-home-page',
  imports: [NgIcon, CommonModule, ContentPickerComponent, ContentViewerComponent],
  providers: [provideIcons({ matSettings, matCopyright })],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  backgroundColor:string = "bg-blue-400";

  currentView: 'contentPicker' | 'contentViewer' = 'contentPicker';

  contentInfo?: Content;

  ngAfterViewInit() {
    //this.changeView('contentPicker');
    gsap.set(`#${this.currentView}`, { display: 'block' });

  }

  onContentPicked(contentInfo: Content) {
    this.contentInfo = contentInfo;
    slidingComponents(this.currentView, 'contentViewer');

  }

  settingsButtonEntered() {
    gsap.to("#settingsBtn", {
      rotate: 60,
      duration: 0.2,
    });

  }

  settingsButtonExited() {
    gsap.to("#settingsBtn", {
      rotate: 0,
      duration: 0.2,
    });
  }

}
