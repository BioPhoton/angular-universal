import {TalksOverviewModule} from './talks-overview.module';

describe('TalksOverviewModule', () => {
  let talksOverviewModule: TalksOverviewModule;

  beforeEach(() => {
    talksOverviewModule = new TalksOverviewModule();
  });

  it('should create an instance', () => {
    expect(talksOverviewModule).toBeTruthy();
  });
});
