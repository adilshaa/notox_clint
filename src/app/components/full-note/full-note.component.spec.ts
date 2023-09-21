import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNoteComponent } from './full-note.component';

describe('FullNoteComponent', () => {
  let component: FullNoteComponent;
  let fixture: ComponentFixture<FullNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullNoteComponent]
    });
    fixture = TestBed.createComponent(FullNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
