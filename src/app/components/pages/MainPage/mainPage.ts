import Page from '../../templates/page';
import './mainPage.scss';

import allWordsCollection from '../../../../assets/data/wordCollection';
import shuffleArray from '../../../utils/shuffleArray';
import checkSentence from '../../../utils/checkSentence';

import Header from './Header/Header';
import Main from './Main/mainSection';
import Footer from './Footer/Footer';

class MainPage extends Page {
  onPageSelect!: (pageName: string) => void;

  private header: Header;

  private mainSection: Main;

  private footer: Footer;

  private audio!: HTMLAudioElement;

  constructor(id: string) {
    super(id);
    this.header = new Header('header', 'header');
    this.mainSection = new Main('div', 'main-section__block');
    this.footer = new Footer('footer', 'footer');
  }

  private setupSelectData() {
    const levels = this.header.getSelectLevel();
    const rounds = this.header.getSelectRound();
    const resultBlock = this.mainSection.getResultBlock();

    const selectChange = () => {
      const selectLevel = Number(levels.value);
      const selectRound = Number(rounds.value);
      resultBlock.innerHTML = '';
      this.renderWords(selectLevel, selectRound);
    };

    levels.addEventListener('change', selectChange);
    rounds.addEventListener('change', selectChange);
  }

  private showHintEvent() {
    const buttonHint = this.header.getButtons()[0];
    const contentHint = this.header.getHintBlock();

    const showHint = () => {
      buttonHint.classList.toggle('disabled');
      contentHint[0].classList.toggle('hidden');
    };
    buttonHint.addEventListener('click', showHint);
  }

  private showTranslateButton() {
    const buttonTranslateHTML = this.header.getButtons()[1];
    const buttonToggleSoundHTML = this.header.getButtons()[2];

    const showButton = () => {
      buttonTranslateHTML.classList.toggle('hidden');
      buttonToggleSoundHTML.classList.toggle('disabled');
    };
    buttonToggleSoundHTML.addEventListener('click', showButton);
  }

  private handleSoundClick(soundPath: string) {
    const hintButtonSoundHTML = this.header.getButtons()[1];
    try {
      if (this.audio && !this.audio.paused) {
        return;
      }
      this.audio = new Audio(
        `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${soundPath}`
      );

      this.audio.addEventListener('loadedmetadata', () => {
        const audioDuration = this.audio.duration * 1000;
        hintButtonSoundHTML.style.animationDuration = `${audioDuration}ms`;
        hintButtonSoundHTML.classList.add('playing');
        this.audio.play();

        this.audio.addEventListener('ended', () => {
          hintButtonSoundHTML.classList.remove('playing');
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  private renderWords(level: number = 0, round: number = 0, index: number = 0, roundCount: number = 1): void {
    const firstRound: string[] = allWordsCollection[level].rounds[round].words[index].textExample.split(' ');

    // Воспроизведение звука
    const buttonTranslateHTML = this.header.getButtons()[1];
    const buttonToggleSoundHTML = this.header.getButtons()[2];
    const soundPath = allWordsCollection[level].rounds[round].words[index].audioExample;
    buttonTranslateHTML.setAttribute('data-sound-path', soundPath);

    const contentHint = this.header.getHintBlock();
    const contentHintWrapper = this.header.getHintBlock()[0];
    const buttonHint = this.header.getButtons()[0];

    const textContentHint = allWordsCollection[level].rounds[round].words[index].textExampleTranslate;
    contentHint[1].textContent = textContentHint;

    const mainResultBlock = this.mainSection.getResultBlock();
    const mainInfoBlock = this.mainSection.getInfoBlock();
    const mainWordBlock = this.mainSection.getWordBlock();

    const mainResultBlockLine: HTMLDivElement = document.createElement('div');
    mainResultBlockLine.classList.add('block__result_line');

    mainWordBlock.innerHTML = '';

    const buttonContinue = this.footer.getContinueButton();
    const handleContinueClick = (event: Event) => {
      const countRound: number = allWordsCollection[level].rounds[round].words.length;

      const nextIndex = index + 1;
      const nextSentence = roundCount + 1;
      if (nextSentence <= countRound) {
        this.renderWords(level, round, nextIndex, nextSentence);
      } else {
        const nextRound = round + 1;
        const nextLevel = level;

        if (allWordsCollection[nextLevel] && allWordsCollection[nextLevel].rounds[nextRound]) {
          mainResultBlock.innerHTML = '';
          this.renderWords(nextLevel, nextRound);
        } else {
          console.log('Игра завершена!');
        }
      }

      if (!contentHintWrapper.classList.contains('hidden')) {
        contentHintWrapper.classList.add('hidden');
        buttonHint.classList.add('disabled');
      }

      mainResultBlock.style.backgroundImage = 'none';
      mainResultBlockLine.classList.remove('hidden');

      mainInfoBlock.classList.add('hidden');

      buttonContinue.setAttribute('disabled', 'disabled');
      // Удаляем слушатель что бы не рендерились лишние блоки в Result
      buttonContinue.removeEventListener('click', handleContinueClick);
    };

    const shuffledWords: string[] = shuffleArray(firstRound);

    shuffledWords.forEach((word) => {
      const mainResultBlockCell: HTMLDivElement = document.createElement('div');
      const mainWordBlockCell: HTMLDivElement = document.createElement('div');
      mainResultBlockCell.className = 'block__result_cell';
      mainWordBlockCell.className = 'block__word_cell';

      mainResultBlock.append(mainResultBlockLine);
      mainResultBlockLine.append(mainResultBlockCell);
      mainWordBlock.append(mainWordBlockCell);

      const singleWord: HTMLParagraphElement = document.createElement('p');
      singleWord.className = 'block__word_content';
      singleWord.textContent = word;

      // Получение адаптивной/динамической длины для блоков со словами
      const totalLetters = firstRound.join('').length;
      const lettersInWord = word.length;
      const widthPercentage = (lettersInWord / totalLetters) * 100;
      mainWordBlockCell.style.width = `${widthPercentage}%`;
      mainWordBlockCell.append(singleWord);

      const defaultWidth = '40px';

      mainWordBlockCell.addEventListener('click', (event: Event) => {
        const clickedWord = <HTMLElement>event.target;
        if (clickedWord.classList.contains('block__word_content') && clickedWord.closest('.block__word_cell')) {
          const eventClickParent = clickedWord.closest('.block__word_cell');
          if (eventClickParent instanceof HTMLDivElement) {
            const renderWidth = eventClickParent.style.width || '0';
            eventClickParent.style.width = defaultWidth;

            clickedWord.classList.remove('block__word_content');
            clickedWord.classList.add('block__result_content');
            clickedWord.remove();

            const emptyResultCell = mainResultBlockLine.querySelector('.block__result_cell:empty');
            if (emptyResultCell && emptyResultCell instanceof HTMLElement) {
              emptyResultCell.style.width = renderWidth;
              emptyResultCell.append(clickedWord);
            } else {
              mainResultBlockCell.append(clickedWord);
            }
          }
        }

        if (mainResultBlockLine.textContent) {
          checkSentence(level, round, index, mainResultBlockLine.textContent, <HTMLButtonElement>buttonContinue);
          if (checkSentence(level, round, index, mainResultBlockLine.textContent, <HTMLButtonElement>buttonContinue)) {
            mainResultBlockLine.classList.add('blocked');
            contentHintWrapper.classList.remove('hidden');
            buttonHint.classList.remove('disabled');
            buttonTranslateHTML.classList.remove('hidden');
            buttonToggleSoundHTML.classList.remove('disabled');
            buttonContinue.addEventListener('click', handleContinueClick);

            // Получаем все линии со сложенными предложения и далее скрываем их
            const countRound = allWordsCollection[level].rounds[round].words.length;
            const countIndex = document.querySelectorAll('.block__result_line').length;
            const imagePath = allWordsCollection[level].rounds[round].levelData.imageSrc;

            if (countRound === countIndex) {
              const allBlockedLines = document.querySelectorAll('.blocked');
              mainResultBlock.style.backgroundImage =
                'url(' +
                `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imagePath}` +
                ')';
              mainResultBlock.style.backgroundRepeat = 'no-repeat';
              mainResultBlock.style.backgroundPosition = 'center';
              mainResultBlock.style.backgroundSize = 'cover';

              allBlockedLines.forEach((element) => {
                if (mainResultBlockLine.classList.contains('blocked')) {
                  element.classList.add('hidden');
                } else {
                  element.classList.remove('hidden');
                }
              });

              // Получаем блок и инфу по картине и рендерим после завершения раунда
              const infoPathAuthor = allWordsCollection[level].rounds[round].levelData.author;
              const infoPathPaint = allWordsCollection[level].rounds[round].levelData.name;
              const infoPathYear = allWordsCollection[level].rounds[round].levelData.year;
              mainInfoBlock.classList.remove('hidden');
              mainInfoBlock.textContent = `${infoPathAuthor} - ${infoPathPaint} (${infoPathYear})`;
            }
          }
        }
      });

      mainResultBlockCell.addEventListener('click', function clickHandler(event: Event) {
        const clickedWord = <HTMLElement>event.target;
        if (clickedWord.classList.contains('block__result_content') && clickedWord.closest('.block__result_cell')) {
          const eventClickParent = clickedWord.closest('.block__result_cell');
          if (eventClickParent instanceof HTMLDivElement) {
            const renderWidth = eventClickParent.style.width || '0';
            eventClickParent.style.width = defaultWidth;

            clickedWord.classList.remove('block__result_content');
            clickedWord.classList.add('block__word_content');
            clickedWord.remove();

            const emptyWordCell = mainWordBlock.querySelector('.block__word_cell:empty');
            if (emptyWordCell && emptyWordCell instanceof HTMLElement) {
              emptyWordCell.style.width = renderWidth;
              emptyWordCell.append(clickedWord);
            } else {
              mainWordBlockCell.append(clickedWord);
            }
          }
        }

        if (mainResultBlockLine.textContent) {
          checkSentence(level, round, index, mainResultBlockLine.textContent, <HTMLButtonElement>buttonContinue);
          if (!buttonHint.classList.contains('disabled')) {
            contentHintWrapper.classList.remove('hidden');
            buttonHint.classList.remove('disabled');
          }
        }
      });
    });
  }

  public render() {
    this.container.classList.add('main-page-container');

    const headerHTML = this.header.render();
    const mainSectionHTML = this.mainSection.render();
    const footerHTML = this.footer.render();

    const buttonTranslateHTML = this.header.getButtons()[1];

    buttonTranslateHTML.addEventListener('click', () => {
      const soundPath = buttonTranslateHTML.getAttribute('data-sound-path');
      if (soundPath !== null) this.handleSoundClick(soundPath);
    });

    this.container.append(headerHTML, mainSectionHTML, footerHTML);

    this.setupSelectData();
    this.renderWords();
    this.showHintEvent();
    this.showTranslateButton();

    return this.container;
  }
}

export default MainPage;
