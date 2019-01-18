import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CollapsableMessageComponent } from './collapsable-message.component';

describe('CollapsableMessageComponent', () => {
  let component: CollapsableMessageComponent;
  let fixture: ComponentFixture<CollapsableMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsableMessageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsableMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
