import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaveBtnComponent } from './edit-save-btn.component';

describe('EditSaveBtnComponent', () => {
  let component: EditSaveBtnComponent;
  let fixture: ComponentFixture<EditSaveBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSaveBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSaveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
