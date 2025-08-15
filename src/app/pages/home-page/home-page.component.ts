import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matFolder } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-home-page',
  imports: [NgIcon, CommonModule, FormsModule],
  providers: [provideIcons({matFolder})],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  url:string = '';

  transcribeAudio() {
    var contentInfo = window.API.DownloadContent(this.url);
    console.log(contentInfo);

  }

}
