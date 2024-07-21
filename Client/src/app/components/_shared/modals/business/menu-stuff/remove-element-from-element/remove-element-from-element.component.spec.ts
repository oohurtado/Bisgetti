import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveElementFromElementComponent } from './remove-element-from-element.component';

describe('RemoveElementFromElementComponent', () => {
  let component: RemoveElementFromElementComponent;
  let fixture: ComponentFixture<RemoveElementFromElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveElementFromElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveElementFromElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
