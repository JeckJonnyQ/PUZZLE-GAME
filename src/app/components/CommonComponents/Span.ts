import BaseComponent from '../templates/BaseComponent';

class Span extends BaseComponent {
  private span: HTMLSpanElement;

  constructor(tagName: string = 'span', className: string = '', textContent: string = '') {
    super(tagName, className);
    this.span = <HTMLSpanElement>this.element;
    this.span.textContent = textContent;
  }

  render(): HTMLSpanElement {
    return this.span;
  }
}

export default Span;
