import { Component, Input } from '@angular/core';
import { Content } from '../../../../../../electron/DTOs/content';

@Component({
  selector: 'app-content-viewer',
  imports: [],
  templateUrl: './content-viewer.component.html',
  styleUrl: './content-viewer.component.css'
})
export class ContentViewerComponent {

  @Input() contentInfo?: Content;
  
}
