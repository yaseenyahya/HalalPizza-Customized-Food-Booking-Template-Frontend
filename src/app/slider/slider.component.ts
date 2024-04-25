import { Component, HostListener, AfterViewInit,OnInit,  ChangeDetectorRef } from '@angular/core';
import { selectNavbarHeight } from '../shared/navbar/navbar.state';
import { selectTopbarHeight } from '../shared/topbar/topbar.state';
import { environment } from '../../environments/environment';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit,OnInit {
  windowHeight: number = 100;
  navbarHeight: number = 98;
  topbarHeight: number = 39;

  sliders: any[] = [];

  sliderLoading:boolean = true;

  navbarHeight$ = this.store.pipe(select(selectNavbarHeight));
  topbarHeight$ = this.store.pipe(select(selectTopbarHeight));

  constructor(private router: Router, private cdr: ChangeDetectorRef, private store: Store<any>, private http: HttpClient) {
    this.getWindowHeight(); // Call the function initially to get the window height


    const filterEnabled = true; // Set the value of the filterEnabled parameter

    this.http.get<any[]>(`${environment.apiUrl}/api/sliders/all/${filterEnabled}`).subscribe(response => {
      this.sliders = response;
      this.sliderLoading = false; 
      cdr.detectChanges();
    },
    () => {
      // This block will be executed when the request is complete (success or error)
      this.sliderLoading = false; // Set loading to false when the request is complete
    }
  );

    this.navbarHeight$.subscribe((height: number) => {

      this.navbarHeight = height;
    });
    this.topbarHeight$.subscribe((height: number) => {
      this.topbarHeight = height;
    });


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getWindowHeight(); // Call the function when the window is resized


  }
  ngOnInit(): void {
    this.getWindowHeight();
  }
  ngAfterViewInit() {
   

  }
  getWindowHeight() {

    this.windowHeight = window.innerHeight;
  }
  navigateToLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    }
  }
  getSliderImagePath(path: string): string {
    // Assuming the images are stored in the assets folder
    return `${environment.apiUrl}/images/${path}`;
  }
}
