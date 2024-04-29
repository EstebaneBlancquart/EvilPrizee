interface ILocalStorage {
  isFirstOpening: boolean;
}

const getLocalStorage = () => {
  const item = localStorage.getItem("evil-prizee");
  return item ? JSON.parse(item) : {};
};

const setLocalStorage = (data: ILocalStorage) =>
  localStorage.setItem("evil-prizee", JSON.stringify(data));

export const setFirstOpening = (value: boolean) => {
  const localStorage = getLocalStorage();
  setLocalStorage(Object.assign(localStorage, { isFirstOpening: value }));
};

export const isFirstOpening = () => {
  return getLocalStorage().isFirstOpening !== false;
};

export const resetLocalStorage = () => {
  localStorage.removeItem("evil-prizee");
};

export const getCurrentStep = () => {
  const localStorage = getLocalStorage();
  return localStorage.currentStep || 0;
};

export const setCurrentStep = (step: number) => {
  const localStorage = getLocalStorage();
  setLocalStorage(Object.assign(localStorage, { currentStep: step }));
};

export const getIsFinished = () => {
  const localStorage = getLocalStorage();
  return localStorage.isFinished || false;
};

export const setIsFinished = (value: boolean) => {
  const localStorage = getLocalStorage();
  setLocalStorage(Object.assign(localStorage, { isFinished: value }));
};
