import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ModalNoteComponent } from '../modal-note/modal-note.component';
import { Note } from '../../interfaces/note';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ModalNoteComponent, ModalAlertComponent],
  templateUrl: './card.component.html'
})
export class CardComponent{
  @Input({required: true}) note! : Note;
  @Input({required: true}) status = signal<boolean>(false);
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() archivedEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  // @Input({required: true}) functionDeleteNote!: any;
  private updateNoteSubscription!: Subscription;

  constructor(private modalService: ModalService){
    this.updateNoteSubscription = this.modalService.updateNote$.subscribe((updatedNote: any) => {
      this.updateNote(updatedNote);
    });
  }

  openModal(note: Note){
    this.modalService.openNoteModal(note, "editModal");
  }

  deleteNote() {
    this.deleteEvent.emit(this.note.id);
  }
  archivedNote() {
    this.archivedEvent.emit(this.note);
  }

  updateNote(event: { id: number, newNote: any }) {
    this.updateEvent.emit({ id: event.id, newNote: event.newNote });
  }

}
