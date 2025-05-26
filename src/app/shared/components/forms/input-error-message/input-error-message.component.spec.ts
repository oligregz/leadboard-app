import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorMessageComponent } from './input-error-message.component';

describe('InputErrorMessageComponent', () => {
  let component: InputErrorMessageComponent;
  let fixture: ComponentFixture<InputErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorMessageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
