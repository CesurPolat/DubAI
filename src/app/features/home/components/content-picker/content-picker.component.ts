import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { matFolder } from '@ng-icons/material-icons/baseline';


@Component({
  selector: 'app-content-picker',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [provideIcons({ matFolder })],
  templateUrl: './content-picker.component.html',
  styleUrl: './content-picker.component.css'
})
export class ContentPickerComponent {

  url: string = '';

  transcribeAudio() {
    var contentInfo = window.API.DownloadContent(this.url);
    console.log(contentInfo);
  }

}
