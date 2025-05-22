import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloggedComponent } from './unlogged.component';

describe('UnloggedComponent', () => {
  let component: UnloggedComponent;
  let fixture: ComponentFixture<UnloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnloggedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
