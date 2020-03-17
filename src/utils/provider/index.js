import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from '@digihcs/innos-ui3'
import { Provider as MobxProvider } from 'mobx-react'

import { Client, Store } from '@tools'

const store = new Store()

const AppProvider = ({ children }) => (
  <CookiesProvider>
    <MobxProvider {...{ store }}>
      <Provider theme='pharmacy'>
        <ApolloProvider client={Client}>
          <BrowserRouter basename={process.env.SERVICE ? `${process.env.SERVICE}/` : '/'}>
            {children}
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </MobxProvider>
  </CookiesProvider>
)

export { AppProvider }
