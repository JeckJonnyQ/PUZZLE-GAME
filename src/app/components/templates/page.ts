class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createInput(type: string, name: string, placeholder: string, required: boolean, value?: string) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.required = required;
    input.value = value || '';
    return input;
  }

  render() {
    return this.container;
  }
}

export default Page;
