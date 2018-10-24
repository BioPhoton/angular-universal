import {TestBed} from '@angular/core/testing';

import {TranslationManagerService} from './translation-manager.service';

describe('TranslationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationManagerService = TestBed.get(TranslationManagerService);
    expect(service).toBeTruthy();
  });
});
