import {inject, TestBed} from '@angular/core/testing';

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
