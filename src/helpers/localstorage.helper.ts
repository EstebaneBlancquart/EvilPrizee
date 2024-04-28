interface ILocalStorage {
  isFirstOpening: boolean;
  isFirstMaskOpening: boolean;
}

const getLocalStorage = () => {
  const item = localStorage.getItem("evil-prizee");
  return item ? JSON.parse(item) : {};
};

const setLocalStorage = (data: ILocalStorage) =>
  localStorage.setItem("evil-prizee", JSON.stringify(data));

export const setFirstOpening = () => {
  const localStorage = getLocalStorage();
  setLocalStorage(Object.assign(localStorage, { isFirstOpening: false }));
};

export const isFirstOpening = () => {
  return getLocalStorage().isFirstOpening !== false;
};

export const setFirstMaskOpening = () => {
  const localStorage = getLocalStorage();
  setLocalStorage(Object.assign(localStorage, { isFirstMaskOpening: false }));
};

export const isFirstMaskOpening = () =>
  getLocalStorage().isFirstMaskOpening !== false;

export const resetLocalStorage = () => {
  localStorage.removeItem("evil-prizee");
};
