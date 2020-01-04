import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelinicioComponent } from './panelinicio.component';

describe('PanelinicioComponent', () => {
  let component: PanelinicioComponent;
  let fixture: ComponentFixture<PanelinicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelinicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
