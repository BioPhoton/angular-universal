import { TestBed, inject } from '@angular/core/testing';

import { AppStateServerService } from './app-state.server.service';

describe('AppState.ServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppState.ServerService]
    });
  });

  it('should be created', inject([AppState.ServerService], (service: AppState.ServerService) => {
    expect(service).toBeTruthy();
  }));
});
