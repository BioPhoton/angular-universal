import { TestBed, inject } from '@angular/core/testing';

import { AppStateClientService } from './app-state.client.service';

describe('AppState.ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppState.ClientService]
    });
  });

  it('should be created', inject([AppState.ClientService], (service: AppState.ClientService) => {
    expect(service).toBeTruthy();
  }));
});
