import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSpProfilesByAdminComponent } from './add-update-sp-profiles-by-admin.component';

describe('AddUpdateSpProfilesByAdminComponent', () => {
  let component: AddUpdateSpProfilesByAdminComponent;
  let fixture: ComponentFixture<AddUpdateSpProfilesByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSpProfilesByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSpProfilesByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
