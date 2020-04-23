import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaIndexComponent } from './etiqueta-index.component';

describe('EtiquetaIndexComponent', () => {
  let component: EtiquetaIndexComponent;
  let fixture: ComponentFixture<EtiquetaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
