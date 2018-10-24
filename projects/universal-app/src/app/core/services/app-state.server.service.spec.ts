import {inject, TestBed} from '@angular/core/testing';

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
