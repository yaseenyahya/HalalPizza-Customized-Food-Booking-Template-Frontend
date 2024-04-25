import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  AfterViewInit,
  HostListener,
  OnInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuitemmodalComponent } from '../menuitemmodal/menuitemmodal.component';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-menuslider',
  templateUrl: './menuslider.component.html',
  styleUrls: ['./menuslider.component.css'],
})
export class MenusliderComponent implements AfterViewInit,AfterViewChecked, OnInit {
  constructor(
    private store: Store<any>,
    private http: HttpClient,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  @ViewChild('stickyElement') stickyElement!: ElementRef;

  openModal(item:any) {
    const modalRef = this.modalService.open(MenuitemmodalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.itemObject = item;
  }

  textItems = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];

  @ViewChild('contentWrapper', { static: true }) contentWrapper!: ElementRef;
  @ViewChild('contentItemsWrapper', { static: true })
  contentItemsWrapper!: ElementRef;

  showScrollRight = false;
  showScrollLeft = false;

  menuItems: any[] = [];

  
  productsLoading:boolean = true;

  Items : any[] = [];

  ngOnInit(){
    this.http.get<any[]>(`${environment.apiUrl}/api/categories/all`).subscribe(response => {
      
      this.menuItems.map(item => {
        return { ...item, selected: false };
      });
      this.menuItems = response;
      this.cdr.detectChanges();
      
  });

  const filterEnabled = true;

  this.http.get<any[]>(`${environment.apiUrl}/api/products/all/${filterEnabled}/false`).subscribe(response => {
      
    this.Items = response;
    this.productsLoading = false;
    this.cdr.detectChanges();
  });

  this.checkMenusIsPinned();
  }
  ngAfterViewInit() {
   
    

    this.checkScreenSize();
    this.observeMenuSections();
  }
  ngAfterViewChecked() {
    this.checkScrollableRightLeftVisiblity();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
  checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    // Adjust the condition based on your screen size threshold
    if (screenWidth <= 576) { // xs and sm
      // Remove the classes or apply different classes
      
      const elements = document.querySelectorAll('.section-row');
      elements.forEach(element => {
        this.renderer.removeClass(element, 'gx-5');
      });
    } else {
      // Add the classes or apply different classes
      const elements = document.querySelectorAll('.section-row');
      elements.forEach(element => {
        this.renderer.addClass(element, 'gx-5');
      });

    }
  }

checkMenusIsPinned(){
  var stickyElement = this.contentWrapper.nativeElement;

// Get the bounding box of the sticky element
var stickyRect = stickyElement.getBoundingClientRect();

// Check if the top of the sticky element is at or above the top of the viewport
var isStickyPinned = stickyRect.top <= 15;

  const navBarElement = document.querySelector('#navbar-main');
  if (navBarElement) {
    if (navBarElement instanceof HTMLElement) {
    if (isStickyPinned) {

      if(this.router.url != "/aboutus"){
      navBarElement.style.display = 'none';
      this.contentWrapper.nativeElement.parentElement.parentElement.style.borderBottom = '1px solid #d5d5d5';
      }
    } else {
      navBarElement.style.display = 'block'; // Show the navbar
      this.contentWrapper.nativeElement.parentElement.parentElement.style.borderBottom = 'unset';
    }
  }
  }
}
  observeMenuSections() {
    window.onscroll = () => {
      var scrollPosition =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollPosition = scrollPosition + 200;
      const sectionElements = document.querySelectorAll('.menu-list-container');
      sectionElements.forEach((section: any) => {
        const sectionId = section.getAttribute('data-sectionMenuItemId');
        const menuItem = this.menuItems.find((item) => item.id == sectionId);
       
        if (section.offsetTop <= scrollPosition) {
          this.menuItems.forEach((menuItem) => (menuItem.selected = false));
          if (menuItem) menuItem.selected = true;

          var menuItemElements = document.querySelectorAll(
            '.menu-item-container[data-menuItemId="' + sectionId + '"]'
          );

          if (menuItemElements.length > 0) {
            const menuItemElement = menuItemElements[0];

            const viewportWidth = this.contentWrapper.nativeElement.clientWidth;
            const scrollLeft = this.contentWrapper.nativeElement.scrollLeft;

            const elementRect = menuItemElement.getBoundingClientRect();
            const elementLeft = elementRect.left + scrollLeft;

            const scrollAmount =
              elementLeft < 0
                ? elementLeft
                : elementLeft + elementRect.width - viewportWidth;
            this.contentWrapper.nativeElement.scrollLeft =
               scrollAmount;

            this.checkScrollableRightLeftVisiblity();
          }
        }
      });

      this.checkMenusIsPinned();
    };
  }
  scrollToSection(menuItemId: string) {
    const element = this.contentItemsWrapper.nativeElement;
    const targetElement = element.querySelector(`#menuSection-${menuItemId}`);

    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
  checkScrollableRightLeftVisiblity() {
    const element = this.contentWrapper.nativeElement;

    if (element.scrollLeft + element.clientWidth == element.clientWidth) {
      this.showScrollLeft = false;
    } else {
      this.showScrollLeft = true;
    }
    if (element.scrollLeft + element.clientWidth == element.scrollWidth) {
      this.showScrollRight = false;
    } else {
      this.showScrollRight = true;
    }
    this.cdr.detectChanges();
  }
  scrollMenuDistanceCalc(reverse: boolean) {
    var distance = 0;
    var hiddenElements = this.contentWrapper.nativeElement.querySelectorAll(
      '.menu-item-container'
    );
    if (reverse) {
      Array.from(hiddenElements).reverse();
    }
    // Iterate through the elements to find the first one that is hidden
    for (var i = 0; i < hiddenElements.length; i++) {
      var menuItemElement = hiddenElements[i];
      if (menuItemElement instanceof HTMLElement) {
        if (
          menuItemElement.offsetLeft + menuItemElement.offsetWidth >
          this.contentWrapper.nativeElement.offsetWidth
        ) {
          distance = menuItemElement.offsetWidth;
          break;
        }
      }
    }
    return distance;
  }
  scrollMenuLeft() {
    this.sideMenuScroll(
      this.contentWrapper.nativeElement,
      25,
      this.scrollMenuDistanceCalc(true),
      -10
    );
  }

  scrollMenuRight() {
    this.sideMenuScroll(
      this.contentWrapper.nativeElement,
      25,
      this.scrollMenuDistanceCalc(false),
      10
    );
  }

  private sideMenuScroll(
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
        this.checkScrollableRightLeftVisiblity();
      }
    }, speed);
  }
  onMenuItemClick(item: MenuItem) {
    this.scrollToSection(item.id);
  }

  getSelectedMenuItemName(): string | undefined {
    const selectedItem = this.menuItems.find((menuItem) => menuItem.selected);
    return selectedItem ? selectedItem.name : undefined;
  }
  getItemsByMenuItemId(menuItemId: string) {
    return this.Items.filter((item) => item.categoryID == menuItemId);
  }

  hasItems(menuItemId: string) {
    return this.getItemsByMenuItemId(menuItemId).length > 0;
  }
  getImagePath(path: string): string {
    // Assuming the images are stored in the assets folder
    return `${environment.apiUrl}/images/${path}`;
  }
}
class MenuItem {
  id!: string;
  name!: string;
  selected!: boolean;
}
