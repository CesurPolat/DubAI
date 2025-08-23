import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matArrowRightAlt } from '@ng-icons/material-icons/baseline';
import { GptIconComponent } from '../../../../shared/icons/gpt-icon/gpt-icon.component';

@Component({
  selector: 'app-gpt-token',
  imports: [GptIconComponent, CommonModule, FormsModule, NgIcon],
  providers: [provideIcons({ matArrowRightAlt })],
  templateUrl: './gpt-token.component.html',
  styleUrl: './gpt-token.component.css'
})
export class GptTokenComponent {

  @Output() gptTokenEnteredEvent = new EventEmitter<void>();

  gptToken: string = '';

  saveGptToken() {
    window.API.SetGPTToken(this.gptToken).then(() => {
      this.gptTokenEnteredEvent.emit();
    });
  }

}
