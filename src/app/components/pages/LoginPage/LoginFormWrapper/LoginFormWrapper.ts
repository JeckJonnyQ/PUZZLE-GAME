import BaseComponent from '../../../templates/BaseComponent';
import './LoginFormWrapper.scss';

class LoginFormWrapper extends BaseComponent {
  private loginForm: HTMLFormElement;

  constructor() {
    super('form', 'login-form-wrapper');

    if (this.element instanceof HTMLFormElement) {
      this.loginForm = this.element;
    } else {
      throw new Error('Container is not an HTMLFormElement');
    }
  }

  append(element: HTMLElement) {
    this.loginForm.appendChild(element);
  }
}

export default LoginFormWrapper;
