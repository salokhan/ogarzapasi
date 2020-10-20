import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaveDelBtnComponent } from './edit-save-del-btn.component';

describe('EditSaveDelBtnComponent', () => {
  let component: EditSaveDelBtnComponent;
  let fixture: ComponentFixture<EditSaveDelBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSaveDelBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSaveDelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
