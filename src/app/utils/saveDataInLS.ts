function saveData(key: string, data: object): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export default saveData;
