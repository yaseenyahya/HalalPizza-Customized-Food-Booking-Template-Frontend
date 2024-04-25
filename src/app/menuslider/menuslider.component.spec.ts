import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusliderComponent } from './menuslider.component';

describe('MenusliderComponent', () => {
  let component: MenusliderComponent;
  let fixture: ComponentFixture<MenusliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenusliderComponent]
    });
    fixture = TestBed.createComponent(MenusliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
