import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRenewalComponent } from './user-renewal.component';

describe('UserRenewalComponent', () => {
  let component: UserRenewalComponent;
  let fixture: ComponentFixture<UserRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRenewalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
