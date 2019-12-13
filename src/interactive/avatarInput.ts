import { store } from './store';

const getFile = (input: HTMLInputElement): File | null => input.files[0];
const createUrl = (file: File) => {
  const url = window.URL || window.webkitURL;
  const src = url.createObjectURL(file);

  return src;
};

const createSetAvatar = (input: HTMLInputElement) => () => {
  const file = getFile(input);

  if (!file) {
    return;
  }

  store.dispatch('setAvatar', createUrl(file));
};

export const initAvatarInput = () => {
  const avatarInput = document.getElementById('avatar') as HTMLInputElement;
  const avatarTitle = document.getElementById(
    'avatar-label',
  ) as HTMLLabelElement;

  const setAvatar = createSetAvatar(avatarInput);

  document.addEventListener('readystatechange', setAvatar);
  avatarInput.addEventListener('change', setAvatar, false);

  store.on('@changed', ({ avatar }) => {
    if (!avatar) {
      avatarTitle.innerText = 'Загрузить картинку';
    } else {
      avatarTitle.innerText = 'Загрузить другую картинку';
    }
  });
};
