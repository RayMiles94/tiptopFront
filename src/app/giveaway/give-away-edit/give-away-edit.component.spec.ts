import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAwayEditComponent } from './give-away-edit.component';

describe('GiveAwayEditComponent', () => {
  let component: GiveAwayEditComponent;
  let fixture: ComponentFixture<GiveAwayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveAwayEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveAwayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
