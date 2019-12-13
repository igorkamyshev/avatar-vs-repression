import { store, State } from './store';

function downloadURI(uri: string, name = 'avatar-vs-repression.jpg') {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.hidden = true;
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
}

const createSyncButtonActivity = (button: HTMLButtonElement) => ({
  mask,
  avatar,
}: State) => {
  button.disabled = !mask || !avatar;
};

export const initSaveAvatar = () => {
  const saveButton = document.getElementById('save') as HTMLButtonElement;
  const viewport = document.getElementById('viewport') as HTMLCanvasElement;
  const syncButtonActivity = createSyncButtonActivity(saveButton);

  syncButtonActivity(store.get());
  store.on('@changed', syncButtonActivity);

  saveButton.addEventListener('click', () => {
    downloadURI(viewport.toDataURL('image/jpg'));
  });
};
