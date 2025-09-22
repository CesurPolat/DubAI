import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { matFolder } from '@ng-icons/material-icons/baseline';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { Content } from '../../../../../../electron/DTOs/content';


@Component({
  selector: 'app-content-picker',
  imports: [CommonModule, FormsModule, NgIcon, LoadingComponent],
  providers: [provideIcons({ matFolder })],
  templateUrl: './content-picker.component.html',
  styleUrl: './content-picker.component.css'
})
export class ContentPickerComponent {

  @Output() contentPicked = new EventEmitter<Content>();

  url: string = '';

  isContentInfoLoading: boolean = false;

  transcribeAudio() {
    if(this.isContentInfoLoading) return;

    this.isContentInfoLoading = true;
    window.API.GetContent(this.url).then(contentInfo => {
      console.log(contentInfo);
      this.isContentInfoLoading = false;
      this.contentPicked.emit(contentInfo);
    });

  }

}
