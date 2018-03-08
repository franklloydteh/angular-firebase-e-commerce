import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiNavbarComponent } from './ri-navbar.component';

describe('RiNavbarComponent', () => {
  let component: RiNavbarComponent;
  let fixture: ComponentFixture<RiNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
