import { configureStore } from '@reduxjs/toolkit';

import template from './slices/template';

const store = configureStore({
   reducer: {
      template,
   },
});

export default store;
