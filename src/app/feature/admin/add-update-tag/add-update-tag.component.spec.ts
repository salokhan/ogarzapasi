import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTagComponent } from './add-update-tag.component';

describe('AddUpdateTagComponent', () => {
  let component: AddUpdateTagComponent;
  let fixture: ComponentFixture<AddUpdateTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
