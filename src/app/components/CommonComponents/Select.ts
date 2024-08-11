import BaseComponent from '../templates/BaseComponent';

class Select extends BaseComponent {
  private select: HTMLSelectElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.select = <HTMLSelectElement>this.element;
  }

  addOption(value: string, text: string): HTMLElement {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    this.select.add(option);
    return this.select;
  }

  render(): HTMLSelectElement {
    return this.select;
  }
}

export default Select;
