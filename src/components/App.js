// @flow

import React from 'react';
import type { Node } from 'react';
import { ApolloProvider } from 'react-apollo';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import type { AppContextTypes } from '../context';
import AppContext from '../context';

type Props = {|
  insertCss: Function,
  client: Object,
  context: AppContextTypes,
  children: Node,
|};

const App = ({ client, insertCss, context, children }: Props) => (
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  <ApolloProvider client={client}>
    <AppContext.Provider value={context}>
      <StyleContext.Provider value={{ insertCss }}>
        {children}
      </StyleContext.Provider>
    </AppContext.Provider>
  </ApolloProvider>
);

export default App;
