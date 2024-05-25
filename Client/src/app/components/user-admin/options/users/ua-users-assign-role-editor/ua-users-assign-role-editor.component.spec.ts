import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UaUsersAssignRoleEditorComponent } from './ua-users-assign-role-editor.component';

describe('UaUsersAssignRoleEditorComponent', () => {
  let component: UaUsersAssignRoleEditorComponent;
  let fixture: ComponentFixture<UaUsersAssignRoleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UaUsersAssignRoleEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UaUsersAssignRoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
