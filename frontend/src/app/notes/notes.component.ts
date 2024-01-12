import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { NoteService } from '../services/note.service';
import { Note } from '../interfaces/note';
import { ModalNoteComponent } from '../shared/modal-note/modal-note.component';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CardComponent, ModalNoteComponent],
  templateUrl: './notes.component.html',
  styles: ``
})
export default class NotesComponent implements OnInit, OnDestroy {
  public notesStatus = signal<boolean>(false);
  public notes = signal<Note[]>([]);
  public emptyNote: Note = {
    id: 0,
    title: '',
    dateEdited: new Date(),
    archived: false,
    categories: [],
    content: ''
  }

  private updateNoteSubscription!: Subscription;
  private createNoteSubscription!: Subscription;

  constructor(private noteService: NoteService, private modalService: ModalService){
    this.updateNoteSubscription = this.modalService.updateNote$.subscribe((updatedNote: any) => {
      this.updateNote(updatedNote);
    });

    this.createNoteSubscription = this.modalService.createNote$.subscribe((createdNote: Note) => {
      this.postNote(createdNote);
    });
  }
  
  ngOnInit() {
    this.getNotes();
  }

  openModal(note: Note){
    this.modalService.openNoteModal(note, "createModal");
  }

  getNotes() {
    this.noteService.getNotes().subscribe(note => {
      this.notes.set(note);
    });
  }
  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe( () => {
      this.getNotes();
    });
  }
  archivedNote(note: Note) {
    const newNote = { ...note };
    newNote.archived = !newNote.archived;
    this.noteService.updateNote(note.id, newNote).subscribe( () => {
      this.getNotes();
    });
  }

  postNote(newNote: Note ) {
    this.noteService.postNote(newNote).subscribe((note) => {
      this.getNotes();
    });
  }

  updateNote(event: { id: number, newNote: any }){
    this.noteService.updateNote(event.id, event.newNote).subscribe((data) => {
      this.getNotes();
    });
  }

  public toggleNotesStatus() {
    this.notesStatus.update(value => !value);
  }

  ngOnDestroy() {
    this.updateNoteSubscription.unsubscribe();
    this.createNoteSubscription.unsubscribe();
  }

}
