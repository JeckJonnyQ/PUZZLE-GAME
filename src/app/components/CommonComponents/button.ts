import BaseComponent from '../templates/BaseComponent';
import ButtonTypes from '../../interfaces/ButtonTypes';

class Button extends BaseComponent {
  private button: HTMLButtonElement;

  constructor(
    type: ButtonTypes,
    textButton: string,
    disabled: boolean,
    tagName: string = 'button',
    className: string = ''
  ) {
    super(tagName, className);
    this.button = <HTMLButtonElement>this.element;
    this.button.type = type;
    this.button.innerText = textButton;
    this.button.disabled = disabled; // Задизейблить кнопку, если параметр disabled равен true
  }

  render(): HTMLButtonElement {
    return this.button;
  }
}

export default Button;
