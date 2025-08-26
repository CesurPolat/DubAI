import { Component, Input } from '@angular/core';
import { ContentInfo } from '../../../../../../electron/services/webInstallation.service';

@Component({
  selector: 'app-content-viewer',
  imports: [],
  templateUrl: './content-viewer.component.html',
  styleUrl: './content-viewer.component.css'
})
export class ContentViewerComponent {

  @Input() contentInfo?: ContentInfo;

  

}
