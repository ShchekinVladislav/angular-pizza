import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilterSelectComponent } from './modal-filter-select.component';

describe('ModalFilterSelectComponent', () => {
  let component: ModalFilterSelectComponent;
  let fixture: ComponentFixture<ModalFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilterSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
