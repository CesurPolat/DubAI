import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationCompletedComponent } from './installation-completed.component';

describe('InstallationCompletedComponent', () => {
  let component: InstallationCompletedComponent;
  let fixture: ComponentFixture<InstallationCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallationCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
