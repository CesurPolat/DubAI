import { Component, EventEmitter, Output } from '@angular/core';
import { FfmpegIconComponent } from '../../../../shared/icons/ffmpeg-icon/ffmpeg-icon.component';

@Component({
  selector: 'app-ffmpeg-installation',
  imports: [FfmpegIconComponent],
  templateUrl: './ffmpeg-installation.component.html',
  styleUrl: './ffmpeg-installation.component.css'
})
export class FfmpegInstallationComponent {

  @Output() ffmpegInstallationCompleted = new EventEmitter<void>();

  ffmpegInstallation() {
    this.ffmpegInstallationCompleted.emit();
  }

}
