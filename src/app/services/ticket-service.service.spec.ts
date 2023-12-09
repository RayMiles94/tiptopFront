import { TestBed } from '@angular/core/testing';

import { LegacyTicketService } from './ticket-service';

describe('TicketServiceService', () => {
  let service: LegacyTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegacyTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
