import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvrInstallationComponent } from './uvr-installation.component';

describe('UvrInstallationComponent', () => {
  let component: UvrInstallationComponent;
  let fixture: ComponentFixture<UvrInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UvrInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UvrInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
