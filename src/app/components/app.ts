import LoginPage from './pages/LoginPage/loginPage';
import StartPage from './pages/StartPage/startPage';
import MainPage from './pages/MainPage/mainPage';

import PageIds from '../interfaces/PageIds';

class App {
  private static root: HTMLElement;

  constructor() {
    App.root = document.createElement('main');
    App.root.className = 'root-wrapper';
    document.body.append(App.root);
  }

  private renderLoginPage() {
    const page = new LoginPage(PageIds.LoginPage);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = PageIds.LoginPage; // Устанавливаем текущий идентификатор страницы
      App.root.append(pageHTML);
    }
    page.onPageSelect = (pageName) => {
      App.root.innerHTML = '';
      this.renderStartPage();
    };
  }

  private renderStartPage() {
    const page = new StartPage(PageIds.StartPage);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = PageIds.StartPage; // Устанавливаем текущий идентификатор страницы
      App.root.append(pageHTML);
    }

    page.onPageSelect = (pageName) => {
      App.root.innerHTML = '';
      if (pageName === PageIds.MainPage) {
        this.renderMainPage();
      } else {
        this.renderLoginPage();
      }
    };
  }

  private renderMainPage() {
    const page = new MainPage(PageIds.MainPage);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = PageIds.MainPage; // Устанавливаем текущий идентификатор страницы
      App.root.append(pageHTML);
    }

    page.onPageSelect = (pageName) => {
      App.root.innerHTML = '';
      this.renderMainPage();
    };
  }

  static checkUserInLocalStorage(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return true;
    }
    return false;
  }

  public run() {
    const isCurrentUserLogIn = App.checkUserInLocalStorage();
    if (isCurrentUserLogIn) {
      this.renderStartPage();
    } else if (!isCurrentUserLogIn) {
      this.renderLoginPage();
    }
  }
}

export default App;
