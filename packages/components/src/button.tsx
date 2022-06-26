/* eslint-disable no-alert */
import { meaningOfLife } from '@acme/foo';
import React from 'react';

export const Button = () => (
  <button
    type="button"
    onClick={() => alert(`the meaning if life is ${meaningOfLife}`)}
  >
    Click me
  </button>
);
