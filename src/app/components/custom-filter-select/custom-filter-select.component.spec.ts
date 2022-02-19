import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterSelectComponent } from './custom-filter-select.component';

describe('CustomFilterSelectComponent', () => {
  let component: CustomFilterSelectComponent;
  let fixture: ComponentFixture<CustomFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFilterSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
