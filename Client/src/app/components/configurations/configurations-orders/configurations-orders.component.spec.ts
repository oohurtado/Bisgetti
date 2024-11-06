import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsOrdersComponent } from './configurations-orders.component';

describe('ConfigurationsOrdersComponent', () => {
  let component: ConfigurationsOrdersComponent;
  let fixture: ComponentFixture<ConfigurationsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationsOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
