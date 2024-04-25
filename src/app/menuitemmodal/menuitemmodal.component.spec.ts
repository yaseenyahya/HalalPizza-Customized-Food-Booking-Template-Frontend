import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemmodalComponent } from './menuitemmodal.component';

describe('MenuitemmodalComponent', () => {
  let component: MenuitemmodalComponent;
  let fixture: ComponentFixture<MenuitemmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuitemmodalComponent]
    });
    fixture = TestBed.createComponent(MenuitemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
