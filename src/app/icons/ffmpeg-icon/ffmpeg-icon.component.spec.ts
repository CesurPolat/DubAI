import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfmpegIconComponent } from './ffmpeg-icon.component';

describe('FfmpegIconComponent', () => {
  let component: FfmpegIconComponent;
  let fixture: ComponentFixture<FfmpegIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfmpegIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfmpegIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
