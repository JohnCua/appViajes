import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoIndexComponent } from './destino-index.component';

describe('DestinoIndexComponent', () => {
  let component: DestinoIndexComponent;
  let fixture: ComponentFixture<DestinoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
