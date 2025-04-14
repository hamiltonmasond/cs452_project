import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Created interface to replace use of 'any' type
export interface Entry {
  personId: string;
  title: string;
  lastPlayed: string;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public displayedColumns: Array<string> = ['title', 'lastPlayed', 'rating', 'description', 'actions']; 
  allEntries: any[] = [{
    'personId': 1,
    'title': 'Elden Ring',
    'lastPlayed': '03/12/2025',
    'rating': 9,
    'description': 'Git gud'
  }, {
    'personId': 2,
    'title': 'Tears of the Kingdom',
    'lastPlayed': '10/26/2024',
    'rating': 9,
    'description': 'Hyah'
  }, {
    'personId': 1,
    'title': 'Goat Simulator 3',
    'lastPlayed': '02/14/2025',
    'rating': 7,
    'description': 'Baaaaa'
  }];

  constructor(
    private client: HttpClient, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Calls getEntries
  ngOnInit(): void {
      this.getEntries();
  }

  // Gets all entries from server to fill in table
  async getEntries(): Promise<void> {
    try {
      this.client.get<any[]>('http://localhost:3000/').subscribe((data) => {
        this.allEntries = data.map(entry => ({
          person_id: entry.personId,
          title: entry.title,
          lastPlayed: entry.lastPlayed,
          rating: entry.rating,
          description: entry.description
        }));
      });
    } catch (error) {
        this.snackBar.open('Failed to load entries.', 'OK', {
          duration: 4000,
          verticalPosition: 'top'
      });
    }
  }

  // Navigates to create entry component under edit path name, sends params to prefill page
  editApplication(entry: Entry): void {
    this.router.navigate([`/edit-entry/${entry.title}`], { queryParams: entry });
  }

  // Makes delete call to server and then removes entry from 'allEntries'. Snackbar on success or error                                                                                                  
  deleteApplication(entry: Entry): void {
    const confirmed = confirm("Would you like to delete this entry?");
    
    if(confirmed) {
      this.client.delete(`http://localhost:3000/`).subscribe({
        next: () => {
          this.allEntries = this.allEntries.filter(ent => ent.title !== entry.title);
          
          this.snackBar.open('Deleted successfully', 'OK', {
            duration: 4000,
            verticalPosition: 'top'
          });
        },
        error: () => {
          this.snackBar.open('Failed to delete.', 'OK', {
            duration: 4000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}
