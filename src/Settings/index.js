import React from 'react';
import Welcome from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';

export default () => {
  return (
    <Page name="settings">
      <Welcome/> 
      <ConfirmButton/> 
    </Page>
  );
}