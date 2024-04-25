import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincontactuscontainerComponent } from './maincontactuscontainer.component';

describe('MaincontactuscontainerComponent', () => {
  let component: MaincontactuscontainerComponent;
  let fixture: ComponentFixture<MaincontactuscontainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaincontactuscontainerComponent]
    });
    fixture = TestBed.createComponent(MaincontactuscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
