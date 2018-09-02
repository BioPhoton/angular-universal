import { SpeakerOverviewModule } from './speaker-overview.module';

describe('SpeakerOverviewModule', () => {
  let speakerOverviewModule: SpeakerOverviewModule;

  beforeEach(() => {
    speakerOverviewModule = new SpeakerOverviewModule();
  });

  it('should create an instance', () => {
    expect(speakerOverviewModule).toBeTruthy();
  });
});
