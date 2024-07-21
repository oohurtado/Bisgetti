import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElementVisibilityComponent } from './update-element-visibility.component';

describe('UpdateElementVisibilityComponent', () => {
  let component: UpdateElementVisibilityComponent;
  let fixture: ComponentFixture<UpdateElementVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateElementVisibilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateElementVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
