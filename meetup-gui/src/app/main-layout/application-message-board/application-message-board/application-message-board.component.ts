import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationMessageBoardService } from 'src/app/main-layout/application-message-board/application-message-board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-application-message-board',
  templateUrl: './application-message-board.component.html',
  styleUrls: ['./application-message-board.component.scss']
})
export class ApplicationMessageBoardComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  messages: any[] = [];
  constructor(private messageService: ApplicationMessageBoardService) { }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe((messages) => {
      this.messages = messages;
    });
  }
  ngOnDestroy(): void {
    this.messages = [];
    this.subscription.unsubscribe();
  }
  dismissMessage(index) {
    this.messageService.removeMessage(index);
  }
}
