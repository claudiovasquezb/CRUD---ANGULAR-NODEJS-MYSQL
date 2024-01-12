import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesUnarchivedComponent } from './notes-unarchived.component';

describe('NotesUnarchivedComponent', () => {
  let component: NotesUnarchivedComponent;
  let fixture: ComponentFixture<NotesUnarchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesUnarchivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesUnarchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
