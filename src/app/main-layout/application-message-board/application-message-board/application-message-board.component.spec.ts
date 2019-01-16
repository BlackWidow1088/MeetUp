import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ApplicationMessageBoardService } from 'app/shared/application-message-board/application-message-board.service';
import { applicationMessageBoardServiceStub } from 'app/shared/stubs/service-stub';
import { ApplicationMessageBoardComponent } from './application-message-board.component';

describe('ApplicationMessageBoardComponent', () => {
  let component: ApplicationMessageBoardComponent;
  let fixture: ComponentFixture<ApplicationMessageBoardComponent>;
  const messageService: ApplicationMessageBoardService = null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ApplicationMessageBoardService, useValue: applicationMessageBoardServiceStub }],
      declarations: [ApplicationMessageBoardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismissMessage ', () => {
    expect(component.dismissMessage(1)).toBeUndefined();
  });
});
