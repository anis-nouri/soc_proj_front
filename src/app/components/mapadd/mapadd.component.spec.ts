import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaddComponent } from './mapadd.component';

describe('MapaddComponent', () => {
  let component: MapaddComponent;
  let fixture: ComponentFixture<MapaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
