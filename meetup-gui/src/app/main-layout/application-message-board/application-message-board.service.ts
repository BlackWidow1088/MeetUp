import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApplicationMessage, MessageStyle,
  MessageType } from 'src/app/main-layout/application-message-board/application-message-board-model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApplicationMessageBoardService {
  private messageSource = new Subject<any>();
  keepAfterNavigationChange = false;
  messages: any[] = [];
  collapsibleErrorHeader = 'Oops! Something went wrong. We have reported incident to administrator.';
  constructor(private router: Router) {
    // clear message on route change if don't want to show it throughout application
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear messages
          this.messages = [];
          this.messageSource.next(this.messages);
        }
      }
    });
  }

  enqueueMessage(text, messageConfig: ApplicationMessage) {
    const message = {
      type: messageConfig.type ? messageConfig.type : MessageType.success,
      text: text,
      isDismiss: messageConfig.isDismiss ? messageConfig.isDismiss : false,
      class: this.setTypeClass(messageConfig.type),
      header: messageConfig.header || this.collapsibleErrorHeader,
      templateValue: messageConfig.templateValue,
      template: messageConfig.template ? messageConfig.template : text,
      style: messageConfig.style ? messageConfig.style : MessageStyle.single
    };
    this.keepAfterNavigationChange = messageConfig.keepAfterNavigationChange || false;
    if (message.style === MessageStyle.template) {
      this.updateOriginal(message);
    } else {
      this.messages.push(message);
    }
    this.messageSource.next(this.messages);
  }

  // Use this function for Api (collapsible) error messages.
  enqueueCollapsibleErrorMsg(error, errorHeader = this.collapsibleErrorHeader) {
  this.enqueueMessage(
    `Message: ${error.error ? error.error.message : error.message}`, {
      header: errorHeader,
      style: MessageStyle.collapsible,
      type: MessageType.error,
      isDismiss: true,
      keepAfterNavigationChange: false
    });
  }
  private setTypeClass(type) {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-danger';
      default: return 'alert-success';
    }
  }

  getMessage(): Observable<any> {
    return this.messageSource.asObservable();
  }

  findInArray(message) {
    const templateIndex = this.messages.findIndex(item => item.template === message.template);
    return this.messages[templateIndex];
  }

  updateOriginal(message) {
    const originalMessage = this.findInArray(message);
    if (originalMessage) {
      this.updateMessage(originalMessage, message)
    } else {
      this.messages.push(this.replaceString(message));
    }
  }

  replaceString(message) {
    if (message.templateValue && message.templateValue.length) {
      const allIndices = this.allIndexOf(message.template, '(?)');
      if (allIndices.length > 1) {
        let text = message.template;
        for (let index in message.templateValue) {
          text = text.replace('(?)', message.templateValue[index]);
        };
        message.text = text;
      } else {
        message.text = message.text.replace('(?)', message.templateValue);
      }
    }
    return message;
  }

  updateMessage(originalMessage, message) {
    if (message.templateValue && message.templateValue.length) {
      const newValue = message.templateValue[0];
      const allIndices = this.allIndexOf(message.template, '(?)');
      if (allIndices.length > 1) { // if message contains more than 1 replacements.
        this.messages[this.messages.findIndex(item => item.template === message.template)] = this.replaceString(message);
      } else {
        if (originalMessage.templateValue.find(item => item === newValue) === undefined) { // to avoid repeated CI name.
          originalMessage.templateValue.push(newValue);
          this.messages[this.messages.findIndex(item => item.template === message.template)] = this.replaceString(originalMessage);
        }
      }
    }
  }

  allIndexOf(str, toSearch) { // To find indices of substring.
    let indices = [];
    for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
      indices.push(pos);
    }
    return indices;
  }

  removeMessage(index) {
    this.messages.splice(index, 1);
    this.messageSource.next(this.messages);
  }

  clear(property?, value?) {
    if (property && value) {
      this.messages = this.messages.filter(item => item[property] !== value);
    } else {
      this.messages = [];
    }
    this.messageSource.next(this.messages);
  }
}
