import { Component,ElementRef, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MenuitemmodalComponent } from '../menuitemmodal/menuitemmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dealsslider',
  templateUrl: './dealsslider.component.html',
  styleUrls: ['./dealsslider.component.css']
})
export class DealssliderComponent {
  constructor(private cdr: ChangeDetectorRef,   private modalService: NgbModal, private http: HttpClient) { }
  isScrollable = false;

  menuItems : any[] = [];
 
  @ViewChild('contentWrapperDeal', { static: true })  contentWrapperDeal!: ElementRef;
  openModal(item:any) {
    const modalRef = this.modalService.open(MenuitemmodalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.itemObject = item;
  }
  
  ngOnInit(){
   

  const filterEnabled = true;

  this.http.get<any[]>(`${environment.apiUrl}/api/products/all/${filterEnabled}/true`).subscribe(response => {
      
    this.menuItems = response;
    this.cdr.detectChanges();
  });
  }
  ngAfterViewInit() {
    this.checkScrollable();
 
  }
  
  checkScrollable() {
    const element = this.contentWrapperDeal;
 
    if(element && element.nativeElement){
    if (element.nativeElement.scrollWidth >= element.nativeElement.clientWidth) {
      this.isScrollable = true;
    } else {
      this.isScrollable = false;
    }
    this.cdr.detectChanges();
  }
  }

  scrollLeft() {
  if (this.isScrollable) {
    this.sideScroll(this.contentWrapperDeal.nativeElement, 50, 300, -50);
  }
  this.checkScrollable();
}

scrollRight() {
  if (this.isScrollable) {
    this.sideScroll(this.contentWrapperDeal.nativeElement, 50, 300, 50);
  }
  this.checkScrollable();
}
  private sideScroll(element: HTMLDivElement, speed: number, distance: number, step: number) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  }

  getImagePath(path: string): string {
    // Assuming the images are stored in the assets folder
    return `${environment.apiUrl}/images/${path}`;
  }
}
