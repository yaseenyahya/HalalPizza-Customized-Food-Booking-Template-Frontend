import { Component, ElementRef, OnInit, HostListener, Renderer2, AfterViewChecked } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NavbarState, selectNavbarHeight } from './navbar.state';
import { setNavbarHeight } from './navbar.actions';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  public isCollapsed = true;
  private lastScrollTop = 0;
  private delta = 5;
  navbarHeight$ = this.store.pipe(select(selectNavbarHeight));
  public navbarHeight = 0;



  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router, private store: Store<NavbarState>) {
    this.navbarHeight$.subscribe((height: number) => {
      this.navbarHeight = height;
    });
  }

  @HostListener('window:scroll', ['$event'])
  hasScrolled() {
    const st = window.scrollY;
    const navbar = document.getElementById('navbar-main');
    // Make sure they scroll more than delta
    if (Math.abs(this.lastScrollTop - st) <= this.delta) {
      return;
    }

    // If they scrolled down and are past the navbar, dispatch the action to update the store
    if (st > this.lastScrollTop && st > this.navbarHeight) {
      if (navbar && navbar.classList.contains('headroom--pinned')) {
        navbar.classList.remove('headroom--pinned');
        navbar.classList.add('headroom--unpinned');
      }
    } else {
      // Scroll Up
      if (st + window.innerHeight < document.body.scrollHeight) {
        if (navbar && navbar.classList.contains('headroom--unpinned')) {
          navbar.classList.remove('headroom--unpinned');
          navbar.classList.add('headroom--pinned');
        }
      }
    }

    this.lastScrollTop = st;
  }
  ngAfterViewChecked() {

  }
  collapsedNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnInit() {

    const navbar = document.getElementById('navbar-main');
    if (navbar)
      this.navbarHeight = navbar.offsetHeight;

    this.store.dispatch(setNavbarHeight({ navbarHeight: this.navbarHeight }));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        if (window.document.activeElement)
          window.document.activeElement.scrollTop = 0;
      }
      this.renderer.listen('window', 'scroll', (event) => {
        const number = window.scrollY;
        if (number > 80 || window.pageYOffset > 80) {
          // add logic
          if (navbar)
            navbar.classList.add('headroom--not-top');
        } else {
          // remove logic
          if (navbar)
            navbar.classList.remove('headroom--not-top');
        }
      });
    });
    this.hasScrolled();
  }
}
