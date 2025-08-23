import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matFolder, matArrowRightAlt } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-folder-selection',
  imports: [NgIcon],
  providers: [provideIcons({matFolder, matArrowRightAlt})],
  templateUrl: './folder-selection.component.html',
  styleUrl: './folder-selection.component.css'
})
export class FolderSelectionComponent {

  @Output() folderSelectedEvent = new EventEmitter<void>();

  folderPath: string = 'Please select a folder';

  saveFolderSelection() {
    window.API.SelectDirectory().then((result) => {

      if (result === '-1') {
        this.folderPath = 'Folder selection failed or was canceled.';
        return;
      }
      else{
        this.folderPath = result;
        return;
      }
      
    });
  }

  nextStep() {
    this.folderSelectedEvent.emit();
  }

}
