import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UaUsersListComponent } from './ua-users-list.component';

describe('UaUsersListComponent', () => {
  let component: UaUsersListComponent;
  let fixture: ComponentFixture<UaUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UaUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UaUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
