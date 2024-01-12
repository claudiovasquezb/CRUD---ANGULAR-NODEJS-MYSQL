import { Component, EventEmitter, Inject, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../../interfaces/note';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-note',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './modal-note.component.html',
  styles: ``
})
export class ModalNoteComponent implements OnInit{

  form!: FormGroup;
  categories!: FormArray;

  @Input() note! : Note;
  @Input() idModel: string = "";
  @Output() updateEvent = new EventEmitter<{id: number, newNote: any}>();
  @Output() postEvent = new EventEmitter<{newNote: any}>();
  private categoriesArray: string[] = [];

  private formBuilder = inject(FormBuilder);
  constructor(public modalService: ModalService){}


  ngOnInit(): void {
    if( this.note.categories.length != 0 ){
      const jsonStringFromDatabase = `${this.note.categories}`;
      this.categoriesArray = JSON.parse(jsonStringFromDatabase);
    }

    this.form = this.formBuilder.group({
      title: [(this.note && this.note.title) || '', [Validators.required]],
      content: [(this.note && this.note.content) || '', [Validators.required]],
      categories: this.formBuilder.array(this.categoriesArray, [Validators.required]) || this.formBuilder.array([], [Validators.required]),
      dateEdited: [new Date()],
      newCategory: ''
    });
    this.categories = this.form.get('categories') as FormArray;
  }
  public closeModal(){
    this.modalService.closeNoteModal();
  }
  public onSubmit(event: any): void {
    event.preventDefault();
    if(this.form.valid) {
      if( this.idModel =="createModal") this.postData(); else this.updateData();
      this.form.reset();
      this.closeModal();
    } else {
      Object.values(this.form.controls).forEach(control => {
        if( control.invalid ) {
          control.markAsTouched();
        }
      });
    }
  }
  public postData() {
    if( this.form.value.title && this.form.value.content && this.form.value.categories) {
      this.postEvent.emit(this.form.value);
    }
  }
  public updateData() {
    if( this.form.value.title && this.form.value.content && this.form.value.categories) {
      this.updateEvent.emit({id: this.note.id, newNote: this.form.value});
    }
  }
  public addCategory() {
    const newCategory = this.form.get('newCategory')!.value;
    if (newCategory && !this.categoryExists(newCategory)) {
      (this.form.get('categories') as FormArray).push(this.formBuilder.control(newCategory));
      this.form.get('newCategory')!.setValue('');
    }
  }

  public removeCategory(index: number) {
    const categories = this.form.get('categories') as FormArray;
    if (index >= 0 && index < categories.length) {
      categories.removeAt(index);

    }

  }
  categoryExists(category: string): boolean {
    return (this.form.get('categories') as FormArray).value.includes(category);
  }

}
