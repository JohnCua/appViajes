import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCreateEditComponent } from './tour-create-edit.component';

describe('TourCreateEditComponent', () => {
  let component: TourCreateEditComponent;
  let fixture: ComponentFixture<TourCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
