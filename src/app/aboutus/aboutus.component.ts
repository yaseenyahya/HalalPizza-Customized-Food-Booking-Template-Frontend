import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
   ngOnInit(): void {
    const navBarElement = document.querySelector('#navbar-main');
    if (navBarElement) {

      if (navBarElement instanceof HTMLElement)
        navBarElement.style.display = 'block';
   }
  }
}
