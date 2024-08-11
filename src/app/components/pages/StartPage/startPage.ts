import Page from '../../templates/page';
import './startPage.scss';
import './StartPageBlock/startPageBlock.scss';

import Section from '../../CommonComponents/Section';
import Div from '../../CommonComponents/Div';
import H2 from '../../CommonComponents/H2';
import Paragraf from '../../CommonComponents/Paragraf';
import Button from '../../CommonComponents/button';
import Span from '../../CommonComponents/Span';

import ButtonTypes from '../../../interfaces/ButtonTypes';
import PageIds from '../../../interfaces/PageIds';

class StartPage extends Page {
  onPageSelect!: (pageName: string) => void;

  private firstName: string = '';

  private surName: string = '';

  private takeUserFromLS() {
    const dataString = localStorage.getItem('currentUser');
    if (dataString) {
      const data = JSON.parse(dataString);
      this.firstName = data.firstname;
      this.surName = data.surname;
    } else {
      console.error('CurrentUser not found in localStorage');
    }
    return `Hello, ${this.firstName} ${this.surName}`;
  }

  private deleteUserFromLS() {
    localStorage.removeItem('currentUser');
  }

  public render() {
    this.container.classList.add('start-page-container');
    const userName = this.takeUserFromLS();

    const startPageBlock = new Section('section', 'start-page__block');
    const startPageBlockHTML = startPageBlock.render();
    this.container.append(startPageBlockHTML);

    const startPageTitle = new H2('h2', 'start-page__block_title');
    const startPageTitleHTML = startPageTitle.render();
    startPageTitleHTML.textContent = 'English puzzle';
    startPageBlockHTML.append(startPageTitleHTML);

    const startPageDiscription = new Paragraf('p', 'start-page__block_discription');
    const startPageDiscriptionHTML = startPageDiscription.render();
    startPageDiscriptionHTML.textContent =
      'Select hints from the menu. Click on the words, collect phrases. The word can be dragged. Eventually an image should appear.';
    startPageBlockHTML.append(startPageDiscriptionHTML);

    const greetingsUser = new Paragraf('p', 'start-page__block_greet-user', userName);
    const greetingsUserHTML = greetingsUser.render();
    startPageBlockHTML.append(greetingsUserHTML);

    const startButton = new Button(ButtonTypes.typeButton, '', false, 'button', 'start-page__block_button-start');
    const startButtonHTML = startButton.render();
    startButtonHTML.textContent = 'START';
    startPageBlockHTML.append(startButtonHTML);

    startButtonHTML.addEventListener('click', () => {
      this.onPageSelect(PageIds.MainPage);
    });

    const logOutButton = new Button(ButtonTypes.typeButton, '', false, 'button', 'start-page__block_button-logout');
    const logOutButtonHTML = logOutButton.render();
    logOutButtonHTML.textContent = 'Do you want to LOG OUT?';
    startPageBlockHTML.append(logOutButtonHTML);

    const confirmationContent = new Paragraf('p', 'start-page__block_confirmation hidden');
    const confirmationContentHTML = confirmationContent.render();

    logOutButtonHTML.addEventListener('click', () => {
      confirmationContentHTML.classList.toggle('hidden');
    });

    const optionWrapper = new Div('div', 'confirmation-wrapper');
    const optionWrapperHTML = optionWrapper.render();
    startPageBlockHTML.append(optionWrapperHTML);
    optionWrapperHTML.append(confirmationContentHTML);

    const confirmationLogOut = new Span('span', 'confirmation__inner_title');
    const confirmationLogOutHTML = confirmationLogOut.render();
    confirmationLogOutHTML.textContent = 'Are you sure?';
    confirmationContentHTML.append(confirmationLogOutHTML);

    const confirmationInnerBtn = new Div('div', 'confirmation__inner');
    const confirmationInnerBtnHTML = confirmationInnerBtn.render();
    confirmationContentHTML.append(confirmationInnerBtnHTML);

    const logOutButtonTrue = new Button(ButtonTypes.typeButton, 'Yes', false, 'button', 'confirmation__inner_accept');
    const logOutButtonTrueHTML = logOutButtonTrue.render();
    confirmationInnerBtnHTML.append(logOutButtonTrueHTML);

    logOutButtonTrueHTML.addEventListener('click', (event: Event) => {
      this.deleteUserFromLS();
      this.onPageSelect(PageIds.LoginPage);
    });

    const logOutButtonFalse = new Button(ButtonTypes.typeButton, 'No', false, 'button', 'confirmation__inner_decline');
    const logOutButtonFalseHTML = logOutButtonFalse.render();
    confirmationInnerBtnHTML.append(logOutButtonFalseHTML);

    logOutButtonFalseHTML.addEventListener('click', (event: Event) => {
      confirmationContentHTML.classList.toggle('hidden');
    });

    return this.container;
  }
}

export default StartPage;
