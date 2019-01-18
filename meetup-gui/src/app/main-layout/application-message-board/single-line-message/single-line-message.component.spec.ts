import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineMessageComponent } from './single-line-message.component';

describe('SingleLineMessageComponent', () => {
  let component: SingleLineMessageComponent;
  let fixture: ComponentFixture<SingleLineMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleLineMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLineMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
