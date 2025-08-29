import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private dialogComponent?: ConfirmDialogComponent;

  register(component: ConfirmDialogComponent) {
    this.dialogComponent = component;
  }
  
  confirm(message = 'Are you sure?'): Promise<boolean> {
    if (!this.dialogComponent) {
      return Promise.reject('ConfirmDialogComponent is not registered.');
    }
    return this.dialogComponent.open(message);
  }
}
