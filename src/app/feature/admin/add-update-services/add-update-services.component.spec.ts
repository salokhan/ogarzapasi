import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateServicesComponent } from './add-update-services.component';

describe('AddUpdateServicesComponent', () => {
  let component: AddUpdateServicesComponent;
  let fixture: ComponentFixture<AddUpdateServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
