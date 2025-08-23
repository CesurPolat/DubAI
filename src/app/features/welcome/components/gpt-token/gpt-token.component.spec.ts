import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptTokenComponent } from './gpt-token.component';

describe('GptTokenComponent', () => {
  let component: GptTokenComponent;
  let fixture: ComponentFixture<GptTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GptTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
