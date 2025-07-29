import { TestBed } from '@angular/core/testing';

import { UserRegstrationService } from '../userRegistration/user-regstration.service';

describe('UserRegstrationService', () => {
  let service: UserRegstrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegstrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
