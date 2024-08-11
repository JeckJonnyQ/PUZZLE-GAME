import BaseComponent from '../templates/BaseComponent';

class H2 extends BaseComponent {
  private H2: HTMLElement;

  constructor(tagName: string = 'h2', className: string = '', textContent: string = '') {
    super(tagName, className);
    this.H2 = <HTMLElement>this.element;
    this.H2.textContent = textContent;
  }
}

export default H2;
