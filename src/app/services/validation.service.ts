import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private confirmationService: ConfirmationService
  ) {
  }

  public showConfirmationDialog(accept: () => Promise<void>) {
    this.confirmationService.confirm(
      {
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Yes',
        },
        accept: () => accept(),
        reject: () => {
        }
      }
    );
  }
}
