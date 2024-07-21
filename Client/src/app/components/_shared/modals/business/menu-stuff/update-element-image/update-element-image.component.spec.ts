import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElementImageComponent } from './update-element-image.component';

describe('UpdateElementImageComponent', () => {
  let component: UpdateElementImageComponent;
  let fixture: ComponentFixture<UpdateElementImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateElementImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateElementImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
