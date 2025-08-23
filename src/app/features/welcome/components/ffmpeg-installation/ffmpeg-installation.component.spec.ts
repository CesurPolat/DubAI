import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfmpegInstallationComponent } from './ffmpeg-installation.component';

describe('FfmpegInstallationComponent', () => {
  let component: FfmpegInstallationComponent;
  let fixture: ComponentFixture<FfmpegInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfmpegInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfmpegInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
