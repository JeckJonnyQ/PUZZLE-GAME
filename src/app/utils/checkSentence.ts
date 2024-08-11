import allWordsCollection from '../../assets/data/wordCollection';

function checkSentence(
  level: number,
  round: number,
  index: number,
  textContent: string,
  buttonContinue: HTMLButtonElement
): boolean {
  const rightSent = allWordsCollection[level].rounds[round].words[index].textExample.split(' ').join('');
  if (rightSent === textContent) {
    buttonContinue.removeAttribute('disabled');
    return true;
  }
  buttonContinue.setAttribute('disabled', 'disabled');

  return false;
}

export default checkSentence;
