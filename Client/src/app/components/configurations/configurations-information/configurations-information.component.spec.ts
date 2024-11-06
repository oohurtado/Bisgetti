import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsInformationComponent } from './configurations-information.component';

describe('ConfigurationsInformationComponent', () => {
  let component: ConfigurationsInformationComponent;
  let fixture: ComponentFixture<ConfigurationsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationsInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
