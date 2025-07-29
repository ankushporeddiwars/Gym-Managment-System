import { TestBed } from '@angular/core/testing';
import { UserRenewalService } from './user-renewal.service';

describe('UserRenewalService', () => {
  let service: UserRenewalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRenewalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
