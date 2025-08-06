import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationAbortedComponent } from './installation-aborted.component';

describe('InstallationAbortedComponent', () => {
  let component: InstallationAbortedComponent;
  let fixture: ComponentFixture<InstallationAbortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationAbortedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallationAbortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
