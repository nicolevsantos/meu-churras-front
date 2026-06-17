import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarChurrascoComponent } from './listar-churrasco.component';

describe('ListarChurrascoComponent', () => {
  let component: ListarChurrascoComponent;
  let fixture: ComponentFixture<ListarChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarChurrascoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarChurrascoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
