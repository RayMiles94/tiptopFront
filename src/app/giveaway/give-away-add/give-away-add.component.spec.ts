import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAwayAddComponent } from './give-away-add.component';

describe('GiveAwayAddComponent', () => {
  let component: GiveAwayAddComponent;
  let fixture: ComponentFixture<GiveAwayAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveAwayAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveAwayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
