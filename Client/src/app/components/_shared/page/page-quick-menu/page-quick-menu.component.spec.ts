import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageQuickMenuComponent } from './page-quick-menu.component';

describe('PageQuickMenuComponent', () => {
  let component: PageQuickMenuComponent;
  let fixture: ComponentFixture<PageQuickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageQuickMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageQuickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
