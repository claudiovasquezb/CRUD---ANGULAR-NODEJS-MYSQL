import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [],
  templateUrl: './modal-alert.component.html',
  styles: ``
})
export class ModalAlertComponent {

  @Input({required: true}) id: number = 0;
  @Output() eventModal = new EventEmitter<void>();

  deleteAlert() {
    this.eventModal.emit();
  }

}
