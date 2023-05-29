import { TestBed } from '@angular/core/testing';

import { AlertjsService } from './alertjs.service';

describe('AlertjsService', () => {
  let service: AlertjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
