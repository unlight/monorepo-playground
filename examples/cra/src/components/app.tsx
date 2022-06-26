import React from 'react';
import { Button } from '@acme/components/button';
import { meaningOfLife } from '@acme/foo';
import { useTest } from '@hooks/test';

export const App = () => {
  useTest();

  return (
    <div>
      {meaningOfLife}
      <Button />
    </div>
  );
};
