import app from '@/app.svelte';
import type { Component, ComponentProps } from 'svelte';

export type Dialog = {
  Component: Component;
  props: ComponentProps<Component>;
};

export const confirmWithDialog = (Component: Component, props: ComponentProps<Component>) =>
  (app.dialog = {
    Component,
    props
  });
