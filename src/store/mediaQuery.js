import { writable } from 'svelte/store';

const calculateMedia = (mqls) => {
  let media = { classes: '' };
  let mediaClasses = [];
  Object.keys(mqls).forEach((key) => {
    media[key] = mqls[key].matches;
    if (media[key]) {
      mediaClasses.push(key);
    }
  });

  media.classes = mediaClasses.join(' ');
  return media;
};

export default (queries) =>
  writable({}, (set) => {
    if (typeof window === 'undefined') return;

    let mqls = {};
    const updateMedia = () => set(calculateMedia(mqls));

    Object.keys(queries).forEach((key) => {
      mqls[key] = window.matchMedia(queries[key]);
      mqls[key].addEventListener('change', updateMedia);
    });

    updateMedia();

    return () =>
      Object.keys(mqls).forEach((key) => mqls[key].removeEventListener('change', updateMedia));
  });
