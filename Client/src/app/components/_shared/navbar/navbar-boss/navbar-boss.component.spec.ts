import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBossComponent } from './navbar-boss.component';

describe('NavbarBossComponent', () => {
  let component: NavbarBossComponent;
  let fixture: ComponentFixture<NavbarBossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarBossComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
