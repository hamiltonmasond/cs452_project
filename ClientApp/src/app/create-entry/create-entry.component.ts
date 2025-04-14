import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {

  public entryForm: FormGroup;
  public ratings: Array<number> = Array.from({ length: 10 }, (_, i) => i + 1);
  private currentTitle: string | null = null;
  private editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private client: HttpClient
  ) {
    this.entryForm = this.formBuilder.group({
      personId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      lastPlayed: [null, [Validators.required]],
      rating: [null, [Validators.required]],
      description: [null]
    });
  }


  // If being routed to component as edit, it sets 'editMode' and 'title', then calls 'loadEntry'
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['title']) {
        this.currentTitle = params['title'];
        this.editMode = true;
        this.loadEntry();
      }
    });
  }

  // When the SAVE button is clicked, the filled in information will be sent to the server with the GET method
  // if we are creating an entry, or the PUT method will be used to edit the database info. The user will be rerouted
  // to the landing page. Snackbar on success and on error
  async onSubmit(): Promise<void> {
    if (this.entryForm.invalid) {
      this.entryForm.markAllAsTouched();
      return;
    }

    const formValues = this.entryForm.getRawValue();
    const newEntry = {
      personId: formValues.personId,
      title: formValues.title,
      lastPlayed: formValues.lastPlayed,
      rating: formValues.number,
      description: formValues.description
    };
    
    try {
      if(this.currentTitle && this.editMode) {
        await firstValueFrom(this.client.put(`http://localhost:3000/`, newEntry));
      } else {
        await firstValueFrom(this.client.post('http://localhost:3000/', newEntry))
      }

      this.snackBar.open('Created successfully', 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      })

      setTimeout(() => {
        this.router.navigate(['/entries']);
      }, 500);   
    } catch(error) {
      this.snackBar.open('Failed to save.', 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
    }
  }

  // Uses GET method to get info about entry that will be edited, then uses 'patchValue' to fill in form
  async loadEntry(): Promise<void> {
    try {
      const entry = await firstValueFrom(this.client.get<any>(`http://localhost:3000/`));
      this.entryForm.patchValue({
        personId: entry.personId,
        title: entry.title,
        lastPlayed: entry.lastPlayed,
        rating: entry.number,
        description: entry.description
      });
    } catch (error) {
      this.snackBar.open('Failed to load.', 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
    }
  }
}
