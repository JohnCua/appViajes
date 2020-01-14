import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoCreateEditComponent } from './destino-create-edit.component';

describe('DestinoCreateEditComponent', () => {
  let component: DestinoCreateEditComponent;
  let fixture: ComponentFixture<DestinoCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinoCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
