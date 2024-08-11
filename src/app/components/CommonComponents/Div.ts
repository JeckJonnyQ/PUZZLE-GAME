import BaseComponent from '../templates/BaseComponent';

class Div extends BaseComponent {
  private div: HTMLDivElement;

  constructor(tagName: string = 'div', className: string = '') {
    super(tagName, className);
    this.div = <HTMLDivElement>this.element;
  }

  render(): HTMLDivElement {
    return this.div;
  }
}

export default Div;
