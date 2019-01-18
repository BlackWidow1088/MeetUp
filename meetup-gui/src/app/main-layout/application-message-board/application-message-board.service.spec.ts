import { inject, TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationMessageBoardService } from './application-message-board.service';
import { MessageStyle, MessageType } from 'src/app/main-layout/application-message-board/application-message-board-model';

class RouterStub {
  public navigate = jasmine.createSpy('navigate');
  public ne = new NavigationStart(0, '/main/link1');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('ApplicationMessageBoardService', () => {
  let service: ApplicationMessageBoardService;
  const routerStub = new RouterStub();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationMessageBoardService, { provide: Router, useValue: routerStub }]
    });
    service = TestBed.get(ApplicationMessageBoardService);
  });

  it('should be created', inject([ApplicationMessageBoardService], (service: ApplicationMessageBoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should call updateOriginal for first input', () => {
    const message = {
      type: 'error',
      text: 'Collection requested for (?) failed. Please collect again',
      isDismiss: true,
      header: '',
      templateValue: ['CI1'],
      template: 'Collection requested for (?) failed. Please collect again',
      keepAfterNavigationChange: true,
      style: 'template'
    }
    expect(service.updateOriginal(message)).toBeUndefined();
  });

  it('should call updateOriginal for second input', () => {
    service.messages = [{
      type: 'error',
      text: 'Collection requested for (?) failed. Please collect again',
      isDismiss: true,
      header: '',
      templateValue: ['CI1'],
      template: 'Collection requested for (?) failed. Please collect again',
      keepAfterNavigationChange: true,
      style: 'template'
    }];
    const message = {
      type: 'error',
      text: 'Collection requested for (?) failed. Please collect again',
      isDismiss: true,
      header: '',
      templateValue: ['CI2'],
      template: 'Collection requested for (?) failed. Please collect again',
      keepAfterNavigationChange: true,
      style: 'template'
    }
    let messages = service.messages;
    messages.push(message);
    service.updateOriginal(message)
    expect(service.messages).toBe(messages);
  });
  it('should call enqueueCollapsibleErrorMsg function', () => {
    service.messages = [];
    const message = {
      type: MessageType.error,
      text: 'Message: Test',
      isDismiss: true,
      class: 'alert-danger',
      header: 'Test Header',
      templateValue: [],
      template: 'Message: Test',
      style: MessageStyle.collapsible,
      keepAfterNavigationChange: false
    };
    let messages = service.messages;
    messages.push(message);
    service.enqueueCollapsibleErrorMsg({error:{message:'Test'}},'Test Header');
    expect(service.messages).toBe(messages);
  });
});
