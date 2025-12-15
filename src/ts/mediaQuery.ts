import type { DynamicObject } from '@/types/common';
import { writable } from 'svelte/store';

const calculateMedia = (mqls: any) => {
  const media: DynamicObject = { classes: '' };
  const mediaClasses: any[] = [];
  Object.keys(mqls).forEach((key: any) => {
    media[key] = mqls[key].matches;
    if (media[key]) {
      mediaClasses.push(key);
    }
  });

  media.classes = mediaClasses.join(' ');
  return media;
};

export default (queries: DynamicObject) =>
  writable({}, (set) => {
    if (typeof window === 'undefined') return;

    const mqls: DynamicObject = {};
    const updateMedia = () => set(calculateMedia(mqls));

    Object.keys(queries).forEach((key: any) => {
      mqls[key] = window.matchMedia(queries[key]);
      mqls[key].addEventListener('change', updateMedia);
    });

    updateMedia();

    return () =>
      Object.keys(mqls).forEach((key) => mqls[key].removeEventListener('change', updateMedia));
  });
