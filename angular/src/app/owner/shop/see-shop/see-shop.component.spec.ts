import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeShopComponent } from './see-shop.component';

describe('SeeShopComponent', () => {
  let component: SeeShopComponent;
  let fixture: ComponentFixture<SeeShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
