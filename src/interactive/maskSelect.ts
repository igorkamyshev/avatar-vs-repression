import partition from 'lodash.partition';

import { store } from './store';

export const initMaskSelect = () => {
  const ACTIVE_CLASSNAME = 'mask_active';

  const maskImages = Array.from(
    document.getElementsByClassName('mask') as HTMLCollectionOf<
      HTMLImageElement
    >,
  );

  // Handle click
  maskImages.forEach(maskImage => {
    maskImage.addEventListener('click', () => {
      store.dispatch('setMask', maskImage.src);
    });
  });

  // Sync active state with store
  store.on('@changed', ({ mask }) => {
    const [selected, unselected] = partition(
      maskImages,
      element => element.src === mask,
    );

    selected.forEach(element => element.classList.add(ACTIVE_CLASSNAME));
    unselected.forEach(element => element.classList.remove(ACTIVE_CLASSNAME));
  });
};
