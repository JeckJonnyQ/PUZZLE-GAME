abstract class BaseComponent {
  protected element: HTMLElement;

  constructor(tagName: string, className: string) {
    this.element = document.createElement(tagName);
    this.element.className = className;
  }

  render() {
    return this.element;
  }
}

export default BaseComponent;
