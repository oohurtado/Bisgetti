import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonComponent } from './anon.component';

describe('AnonComponent', () => {
  let component: AnonComponent;
  let fixture: ComponentFixture<AnonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
