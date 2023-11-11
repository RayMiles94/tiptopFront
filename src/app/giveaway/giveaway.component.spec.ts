import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivewayComponent } from './giveaway.component';

describe('GivewayComponent', () => {
  let component: GivewayComponent;
  let fixture: ComponentFixture<GivewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
