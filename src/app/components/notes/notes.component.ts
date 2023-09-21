import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/core/services/service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  private descChanged = new Subject<{ note: any; id: string }>();
  private titleChanged = new Subject<{ note: any; id: string }>();

  notes: any[] = [];
  inputTextDesc!: string;
  inputTextTitle!: string;
  openText: boolean = false;

  constructor(private _services: ServiceService, private _router: Router) {}
  ngOnInit(): void {
    this.laodNotes();
    this.setupDescChangeSubscription();
    this.setupTitleChangeSubscription();
  }
  authenticateUser() {
    this._services.authenticateUser().subscribe(
      (res) => {},
      (err) => {
        this._router.navigate(['/signin']);

        console.log(err.error.message);
      }
    );
  }
  laodNotes() {
    this._services.getNotes().subscribe((res: any) => {
      if (res) {
        this.notes = res;
      }
    });
  }
  getCharacterCountWithoutSpaces(title: string, desc: string) {    
    const combinedText = title + desc;
    const textWithoutSpaces = combinedText.replace(/\s/g, '');
    return textWithoutSpaces.length;
  }
  addNote() {
    this._services.addNote().subscribe(
      (res: any) => {
        if (res) {
          this.notes.unshift(res.note);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onInputDesc(note: any, id: string) {
    this.descChanged.next({ note, id });
  }
  setupDescChangeSubscription() {
    this.descChanged
      .pipe(
        debounceTime(1000), // Adjust the debounce time as needed (in milliseconds)
        distinctUntilChanged() // Ignore duplicate values
      )
      .subscribe(({ note, id }: { note: any; id: string }) => {
        this.updateNoteDescription(note, id);
      });
  }

  updateNoteDescription(note: any, id: string) {
    this._services.updateDesc(note.description, id).subscribe(
      (res: any) => {
        let id = res.resNote._id;
        if (id) {
          let findIndex = this.notes.findIndex((item) => item._id == id);
          if (findIndex) {
            this.notes[findIndex].date = res.resNote.date;
            setTimeout(() => {
              this.notes.sort((a: any, b: any) => {
                const Atime: any = new Date(a.date);
                const Btime: any = new Date(b.date);
                return Btime - Atime;
              });
            }, 10000);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onInputTitle(note: any, id: string) {
    this.titleChanged.next({ note, id });
  }
  setupTitleChangeSubscription() {
    this.titleChanged
      .pipe(
        debounceTime(1000), // Adjust the debounce time as needed (in milliseconds)
        distinctUntilChanged() // Ignore duplicate values
      )
      .subscribe(({ note, id }: { note: any; id: string }) => {
        this.updateNoteTitle(note, id);
      });
  }
  updateNoteTitle(note: any, id: string) {
    this._services.updateTitle(note.title, id).subscribe(
      (res: any) => {
        let id = res.resNote._id;
        if (id) {
          let findIndex = this.notes.findIndex((item) => item._id == id);

          if (findIndex) {
            this.notes[findIndex].date = res.resNote.date;
            setTimeout(() => {
              this.notes.sort((a: any, b: any) => {
                const dateA: any = new Date(a.date);
                const dateB: any = new Date(b.date);
                return dateB - dateA;
              });
            }, 10000);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteNote(id: string) {
    this._services.deleteNote(id).subscribe((res: any) => {
      if (res.id) {
        let findIndex = this.notes.findIndex((item) => item._id == res.id);
        if (findIndex) {
          this.notes.splice(findIndex, 1);
        }
      }
    });
  }
}
