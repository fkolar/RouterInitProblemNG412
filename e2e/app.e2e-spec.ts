import { RouterInitProblemNG412Page } from './app.po';

describe('router-init-problem-ng412 App', () => {
  let page: RouterInitProblemNG412Page;

  beforeEach(() => {
    page = new RouterInitProblemNG412Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
