import { AmsuitePage } from './app.po';

describe('amsuite App', function() {
  let page: AmsuitePage;

  beforeEach(() => {
    page = new AmsuitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('am works!');
  });
});
