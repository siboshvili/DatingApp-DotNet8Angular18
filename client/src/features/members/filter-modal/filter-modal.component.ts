import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {MemberParams} from '../../../types/member';

@Component({
    selector: 'app-filter-modal',
    imports: [],
    templateUrl: './filter-modal.component.html',
    styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
    @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>
    closeModal = output();
    submitData = output<MemberParams>();

    open() {
        this.modalRef.nativeElement.showModal();
    }

    close() {
        this.modalRef.nativeElement.close();
        this.closeModal.emit();
    }

    submit() {
        this.submitData.emit(new MemberParams());
        this.close();
    }
}
