import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNoteComponent } from '../shared/modal-note/modal-note.component';
import { Note } from '../interfaces/note';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private updateNoteSubject = new Subject<Note>();
  private createNoteSubject = new Subject<Note>();

  updateNote$ = this.updateNoteSubject.asObservable();
  createNote$ = this.createNoteSubject.asObservable();

  constructor(private modalService: NgbModal) {}

  openNoteModal(note: Note, idModel: string) {
    const modalRef = this.modalService.open(ModalNoteComponent, { size: 'md' });
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.idModel = idModel;
    this.updatenoteModal(modalRef);
    this.createNoteModal(modalRef);
  }

  updatenoteModal(modalRef: any) {
    modalRef.componentInstance.updateEvent.subscribe((updatedNote: Note) => {
      this.updateNoteSubject.next(updatedNote);
    });
  }

  createNoteModal(modalRef: any) {
    modalRef.componentInstance.postEvent.subscribe((createdNote: Note) => {
      this.createNoteSubject.next(createdNote);
    });
  }

  closeNoteModal() {
    this.modalService.dismissAll();
  }

}
