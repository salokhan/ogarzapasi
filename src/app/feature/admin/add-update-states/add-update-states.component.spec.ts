import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStatesComponent } from './add-update-states.component';

describe('AddUpdateStatesComponent', () => {
  let component: AddUpdateStatesComponent;
  let fixture: ComponentFixture<AddUpdateStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
