import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    imports: [],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
    @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
    message = 'Are you sure?';
    private resolver: ((value: boolean) => void) | null = null;

    constructor() {
        inject(ConfirmDialogService).register(this);
    }

    open(message: string) {
        this.message = message;
        this.dialogRef.nativeElement.showModal();
        return new Promise<boolean>(resolve => {
            this.resolver = resolve;
        });
    }

    confirm() {
        this.dialogRef.nativeElement.close();
        this.resolver?.(true);
    }
    
    cancel() {
        this.dialogRef.nativeElement.close();
        this.resolver?.(false);
        this.resolver = null;
    }
}
