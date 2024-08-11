import BaseComponent from '../templates/BaseComponent';

class Section extends BaseComponent {
  private div: HTMLDivElement;

  constructor(tagName: string = 'section', className: string = '') {
    super(tagName, className);
    this.div = <HTMLDivElement>this.element;
  }
}

export default Section;
