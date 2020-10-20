import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProfilesComponent } from './sp-profiles.component';

describe('SpProfilesComponent', () => {
  let component: SpProfilesComponent;
  let fixture: ComponentFixture<SpProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
