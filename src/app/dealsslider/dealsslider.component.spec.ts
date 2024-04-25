import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealssliderComponent } from './dealsslider.component';

describe('DealssliderComponent', () => {
  let component: DealssliderComponent;
  let fixture: ComponentFixture<DealssliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealssliderComponent]
    });
    fixture = TestBed.createComponent(DealssliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
