import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptIconComponent } from './gpt-icon.component';

describe('GptIconComponent', () => {
  let component: GptIconComponent;
  let fixture: ComponentFixture<GptIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GptIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
