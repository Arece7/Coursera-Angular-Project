import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });
  it('should navigate to about us page by clicking on the link', () => {
    page.navigateTo('/');

    const navlink = page.getAllElements('a').get(1);
    navlink.click();

    expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it('should enter a new comment for the first dish', () => {
    page.navigateTo('/dishdetail/0');

    const newAuthor = page.getElement('input[type=text]');
    newAuthor.sendKeys('Test Author');

    const newComment = page.getElement('textarea');
    newComment.sendKeys('Test Comment');

    const newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();


  });
  it('should enter a new feedback ', () => {
    page.navigateTo('/contactus');

    const firstName = page.getAllElements('input[type=text]').get(0);
    firstName.sendKeys('Test Arghya');
    const lasttName = page.getAllElements('input[type=text]').get(1);
    lasttName.sendKeys('Test Ray');
    const telNum = page.getElement('input[type=tel]');
    telNum.sendKeys('61766631254');
    const email = page.getElement('input[type=email]');
    email.sendKeys('are1@gmail.com');

    const feedback = page.getElement('textarea');
    feedback.sendKeys('Test feedback');

    const newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();

    browser.pause();
  });

});
