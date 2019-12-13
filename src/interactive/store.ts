import createStore, { StoreonEvents, Module } from 'storeon';

export interface State {
  avatar: string | null;
  mask: string | null;
}

interface Events extends StoreonEvents<State> {
  setAvatar: string;
  setMask: string;
}

const root: Module<State, Events> = appStore => {
  appStore.on('@init', () => ({ avatar: null, mask: null }));
  appStore.on('setAvatar', (_, newAvatar) => ({ avatar: newAvatar }));
  appStore.on('setMask', (_, newMask) => ({ mask: newMask }));
};

export const store = createStore([root]);
