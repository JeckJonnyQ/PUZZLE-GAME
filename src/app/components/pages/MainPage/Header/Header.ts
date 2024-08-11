import './Header.scss';
import allWordsCollection from '../../../../../assets/data/wordCollection';

import Div from '../../../CommonComponents/Div';
import Select from '../../../CommonComponents/Select';
import Button from '../../../CommonComponents/button';
import Paragraf from '../../../CommonComponents/Paragraf';

import ButtonTypes from '../../../../interfaces/ButtonTypes';

class Header {
  static radix: number = 10;

  private header: HTMLElement;

  private selectLevel: Select;

  private selectRound: Select;

  private buttonHintHTML: HTMLElement;

  private buttonTranslateHTML: HTMLElement;

  private buttonToggleSoundHTML: HTMLElement;

  private headerInputInner: Div;

  private headerButtonInner: Div;

  private headerWrapper: Div;

  private headerHintBlockHTML: HTMLDivElement;

  private hintTextHTML: HTMLParagraphElement;

  constructor(tagName: string = 'header', className: string = '') {
    this.header = document.createElement(tagName);
    this.header.className = className;

    this.headerWrapper = new Div('div', 'header-wrapper');
    this.headerHintBlockHTML = new Div('div', 'header-wrapper__hint hidden').render();

    this.selectLevel = new Select('select', 'header-inner__select_level');
    this.selectRound = new Select('select', 'header-inner__select_round');

    this.buttonHintHTML = new Button(
      ButtonTypes.typeButton,
      '',
      false,
      'button',
      'header-inner__btn_hint disabled'
    ).render();

    this.buttonTranslateHTML = new Button(
      ButtonTypes.typeButton,
      '',
      false,
      'button',
      'header-inner__btn_translate hidden'
    ).render();

    this.buttonToggleSoundHTML = new Button(
      ButtonTypes.typeButton,
      '',
      false,
      'button',
      'header-inner__btn_toggle disabled'
    ).render();

    this.headerInputInner = new Div('div', 'header-inner__select');
    this.headerButtonInner = new Div('div', 'header-inner__btn');

    this.hintTextHTML = new Paragraf('p', 'header-wrapper__hint_text').render();
  }

  public renderSelectLevel() {
    allWordsCollection.map((element, index) => {
      this.selectLevel.addOption(`${index}`, `Level ${index + 1}`);
      return element;
    });
  }

  public getSelectLevel() {
    return this.selectLevel.render();
  }

  public renderSelectRound(levelIndex: number = 0) {
    this.selectRound.render().innerHTML = '';

    const { rounds } = allWordsCollection[levelIndex];
    rounds.map((element, index) => {
      this.selectRound.addOption(`${index}`, `Round ${index + 1}`);
      return element;
    });
  }

  public getSelectRound() {
    return this.selectRound.render();
  }

  public getButtons(): [HTMLElement, HTMLElement, HTMLElement] {
    return [this.buttonHintHTML, this.buttonTranslateHTML, this.buttonToggleSoundHTML];
  }

  public getHintBlock(): [HTMLDivElement, HTMLParagraphElement] {
    return [this.headerHintBlockHTML, this.hintTextHTML];
  }

  public render() {
    const headerWrapperHTML = this.headerWrapper.render();

    const headerInputInnerHTML = this.headerInputInner.render();
    const headerButtonInnerHTML = this.headerButtonInner.render();

    const selectLevelHTML = this.selectLevel.render();
    const selectRoundHTML = this.selectRound.render();

    this.renderSelectLevel();
    this.renderSelectRound();

    selectLevelHTML.addEventListener('change', (event) => {
      const levelIndex = parseInt((<HTMLSelectElement>event.target).value, Header.radix);
      this.renderSelectRound(levelIndex);
      return levelIndex;
    });

    selectRoundHTML.addEventListener('change', (event) => {
      const roundIndex = parseInt((<HTMLSelectElement>event.target).value, Header.radix);
      return roundIndex;
    });

    headerWrapperHTML.append(headerInputInnerHTML, headerButtonInnerHTML);
    headerInputInnerHTML.append(selectLevelHTML, selectRoundHTML);
    headerButtonInnerHTML.append(this.buttonTranslateHTML, this.buttonToggleSoundHTML, this.buttonHintHTML);

    this.headerHintBlockHTML.append(this.hintTextHTML);

    this.header.append(headerWrapperHTML, this.headerHintBlockHTML);
    return this.header;
  }
}

export default Header;
