import Page from '../../templates/page';
import './loginPage.scss';

import LoginFormWrapper from './LoginFormWrapper/LoginFormWrapper';
import Button from '../../CommonComponents/button';
import Paragraf from '../../CommonComponents/Paragraf';

import ButtonTypes from '../../../interfaces/ButtonTypes';
import ErrorInputValidation from '../../../interfaces/ErrorInputValidation';
import PageIds from '../../../interfaces/PageIds';

import saveData from '../../../utils/saveDataInLS';

class LoginPage extends Page {
  onPageSelect!: (pageName: string) => void;

  static TextObject = {
    inputType: 'text',
    inputFirstName: 'Firstname',
    inputFirstNamePlaceholder: 'First Name',
    inputSurname: 'Surname',
    inputSurnamePlaceholder: 'Surname',
    inputRequired: true,
    buttonText: 'LOG IN',
  };

  private inputChangeEvent(
    inputFirstName: HTMLInputElement,
    inputSurname: HTMLInputElement,
    button: HTMLButtonElement
  ) {
    if (inputFirstName.value !== '' && inputSurname.value !== '') {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

  private checkValidation(
    event: Event,
    inputFirstName: HTMLInputElement,
    errorFirstnameInput: HTMLParagraphElement,
    inputSurname: HTMLInputElement,
    errorSurnameInput: HTMLParagraphElement
  ) {
    event.preventDefault();

    const firstnameRules = /^[A-Z][a-zA-Z-]{2,}$/;
    const surnameRules = /^[A-Z][a-zA-Z-]{3,}$/;
    const isValidInputFirstName: boolean = firstnameRules.test(inputFirstName.value);
    const isValidInputSurName: boolean = surnameRules.test(inputSurname.value);

    if (!isValidInputFirstName) {
      errorFirstnameInput.classList.remove('hidden');
      inputFirstName.classList.add('error');
    } else {
      errorFirstnameInput.classList.add('hidden');
      inputFirstName.classList.remove('error');
    }

    if (!isValidInputSurName) {
      errorSurnameInput.classList.remove('hidden');
      inputSurname.classList.add('error');
    } else {
      errorSurnameInput.classList.add('hidden');
      inputSurname.classList.remove('error');
    }

    const data = {
      firstname: inputFirstName.value,
      surname: inputSurname.value,
    };

    if (isValidInputFirstName && isValidInputSurName) {
      saveData('currentUser', data);
      this.onPageSelect(PageIds.StartPage);
      const newInputFirstName = inputFirstName;
      newInputFirstName.value = '';
      const newInputSurname = inputSurname;
      newInputSurname.value = '';
    }
  }

  public render() {
    this.container.classList.add('login-page-container');
    const loginFormWrapper = new LoginFormWrapper(); // Создаем экземпляр LoginFormWrapper
    this.container.append(loginFormWrapper.render()); // Добавляем LoginFormWrapper к контейнеру

    const inputFirstName = this.createInput(
      LoginPage.TextObject.inputType,
      LoginPage.TextObject.inputFirstName,
      LoginPage.TextObject.inputFirstNamePlaceholder,
      LoginPage.TextObject.inputRequired
    );
    inputFirstName.className = 'login-form__firstname';
    loginFormWrapper.append(inputFirstName);

    const errorFirstnameInput = new Paragraf(
      'p',
      'login-form__error_firstname hidden',
      ErrorInputValidation.errorFirstNameMsgText
    );
    const errorFirstnameInputHTML = errorFirstnameInput.render();
    loginFormWrapper.append(errorFirstnameInputHTML);

    const inputSurname = this.createInput(
      LoginPage.TextObject.inputType,
      LoginPage.TextObject.inputSurname,
      LoginPage.TextObject.inputSurnamePlaceholder,
      LoginPage.TextObject.inputRequired
    );
    inputSurname.className = 'login-form__surname';
    loginFormWrapper.append(inputSurname);

    const errorSurnameInput = new Paragraf(
      'p',
      'login-form__error_surname hidden',
      ErrorInputValidation.errorSurNameMsgText
    );
    const errorSurnameInputHTML = errorSurnameInput.render();
    loginFormWrapper.append(errorSurnameInputHTML);

    // Создаем экземпляр кнопки и добавляем ее на страницу
    const loginButton = new Button(
      ButtonTypes.typeSubmit,
      LoginPage.TextObject.buttonText,
      true,
      'button',
      'login-form__button'
    );
    const loginButtonHTML = loginButton.render();
    loginFormWrapper.append(loginButtonHTML);

    if (inputFirstName && inputSurname && loginButton) {
      inputFirstName.addEventListener('input', () =>
        this.inputChangeEvent(inputFirstName, inputSurname, loginButtonHTML)
      );
      inputSurname.addEventListener('input', () =>
        this.inputChangeEvent(inputFirstName, inputSurname, loginButtonHTML)
      );
      loginButtonHTML.addEventListener('click', (event: Event) =>
        this.checkValidation(event, inputFirstName, errorFirstnameInputHTML, inputSurname, errorSurnameInputHTML)
      );
    }

    return this.container;
  }
}

export default LoginPage;
