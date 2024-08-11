import './mainSection.scss';
import Div from '../../../CommonComponents/Div';

class Main {
  private main: HTMLElement;

  private resultBlock: HTMLElement;

  private infoBlock: HTMLElement;

  private wordBlock: HTMLElement;

  constructor(tagName: string = 'main', className: string = '') {
    this.main = document.createElement(tagName);
    this.main.className = className;
    this.resultBlock = new Div('div', 'main-section__block_result').render();
    this.infoBlock = new Div('div', 'main-section__block_info hidden').render();
    this.wordBlock = new Div('div', 'main-section__block_word').render();
  }

  getWordBlock(): HTMLElement {
    return this.wordBlock;
  }

  getInfoBlock(): HTMLElement {
    return this.infoBlock;
  }

  getResultBlock(): HTMLElement {
    return this.resultBlock;
  }

  render() {
    this.main.append(this.resultBlock, this.infoBlock, this.wordBlock);
    return this.main;
  }
}

export default Main;
