import {Component, inject, OnInit, signal} from '@angular/core';
import {MessageService} from '../../../core/services/message.service';
import {MemberService} from '../../../core/services/member.service';
import {Message} from '../../../types/message';
import {DatePipe} from "@angular/common";
import {TimeAgoPipe} from '../../../core/pipes/time-ago.pipe'

@Component({
    selector: 'app-member-messages',
    imports: [DatePipe, TimeAgoPipe],
    templateUrl: './member-messages.component.html',
    styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
    private messageService = inject(MessageService);
    private memberService = inject(MemberService);
    protected messages = signal<Message[]>([])

    ngOnInit(): void {
        this.loadMessages()
    }

    loadMessages() {
        const memberId = this.memberService.member()?.id;
        if (memberId) {
            this.messageService.getMessageThreed(memberId).subscribe({
                next: messages => this.messages.set(messages.map(message => ({
                    ...message,
                    currentUserSender: message.senderId !== memberId
                })))
            });
        }
    }
}
