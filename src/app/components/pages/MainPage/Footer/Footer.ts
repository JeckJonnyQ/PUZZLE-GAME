import './Footer.scss';
import Button from '../../../CommonComponents/button';
import ButtonTypes from '../../../../interfaces/ButtonTypes';

class Footer {
  private footer: HTMLElement;

  private continueBtn: HTMLElement;

  constructor(tagName: string = 'footer', className: string = '') {
    this.footer = document.createElement(tagName);
    this.footer.className = className;

    this.continueBtn = new Button(ButtonTypes.typeButton, '', true, 'button', 'continueBtn').render();
    this.continueBtn.textContent = 'Continue';
  }

  public getContinueButton(): HTMLElement {
    return this.continueBtn;
  }

  public render() {
    this.footer.append(this.continueBtn);
    return this.footer;
  }
}

export default Footer;
