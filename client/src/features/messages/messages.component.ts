import {Component, inject, OnInit, signal} from '@angular/core';
import {MessageService} from '../../core/services/message.service';
import {PaginatedResult} from '../../types/pagination';
import {Message} from '../../types/message';

@Component({
    selector: 'app-messages',
    imports: [],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
    private messageService = inject(MessageService);
    protected container = 'Inbox';
    protected pageNumber = 1;
    protected pageSize = 10;
    protected paginatedMessages = signal<PaginatedResult<Message> | null>(null);

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages() {
        this.messageService.getMessage(this.container, this.pageNumber, this.pageSize).subscribe({
            next: response => this.paginatedMessages.set(response)
        })
    }
}
