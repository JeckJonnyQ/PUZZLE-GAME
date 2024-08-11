import BaseComponent from '../templates/BaseComponent';

class Paragraf extends BaseComponent {
  private paragraf: HTMLParagraphElement;

  constructor(tagName: string = 'p', className: string = '', textContent: string = '') {
    super(tagName, className);
    this.paragraf = <HTMLParagraphElement>this.element;
    this.paragraf.textContent = textContent;
  }

  render(): HTMLParagraphElement {
    return this.paragraf;
  }
}

export default Paragraf;
