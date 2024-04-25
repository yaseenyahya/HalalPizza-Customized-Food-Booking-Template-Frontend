import { Component, ElementRef,AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopbarState } from './topbar.state';
import { setTopbarHeight } from './topbar.actions';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements AfterViewChecked {

  constructor(private el: ElementRef, private store: Store<TopbarState>) {}

  ngAfterViewChecked() {
      const topbarHeight = this.el.nativeElement.offsetHeight;
      this.store.dispatch( setTopbarHeight({ topbarHeight: topbarHeight }));

    }
}
