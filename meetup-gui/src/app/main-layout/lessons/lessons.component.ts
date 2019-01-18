import {Component, OnInit} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import { Observable, of } from 'rxjs';
import { Lesson } from 'src/app/main-layout/model/lesson';
import { NewsletterService } from 'src/app/core/service';
import { LessonsService } from 'src/app/main-layout/services';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = 'BEsG2x5tWdnlWiuziUTmNIKDhEdYmwJBqqg8xVoHuTwi3dnNhHhFiPC_RnqHjgx2xW_4im9ypuJz3gf_s1pGueE';

    constructor(
        private lessonsService: LessonsService,
        private swPush: SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err => of([])));
    }

    subscribeToNotifications() {

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => {

            this.sub = sub;


            console.log("Notification Subscription: ", sub);

            this.newsletterService.addPushSubscriber(sub).subscribe(
                () => console.log('Sent push subscription object to server.'),
                err =>  console.log('Could not send subscription object to server, reason: ', err)
            );

        })
        .catch(err => console.error("Could not subscribe to notifications", err));

    }


    sendNewsletter() {


        console.log("Sending Newsletter to all Subscribers ...");

        this.newsletterService.send().subscribe();
    }





}
