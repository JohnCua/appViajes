import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTourComponent } from './detalle-tour.component';

describe('DetalleTourComponent', () => {
  let component: DetalleTourComponent;
  let fixture: ComponentFixture<DetalleTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
