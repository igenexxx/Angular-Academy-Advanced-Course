import { TestBed } from '@angular/core/testing';

import { AuModalService } from './au-modal.service';

describe('ModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuModalService = TestBed.get(AuModalService);
    expect(service).toBeTruthy();
  });
});
