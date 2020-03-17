import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Layout from '@pages/layout'
import { routersNotAuth } from '@configs'
import './index.scss'

const Routers = props => {
  const { store, history } = props
  const { Auth } = store
  const { isAuth, logout } = Auth
  return (
    <Switch>
      {routersNotAuth.map((route, idx) => (
        <Route
          key={idx}
          exact={route.exact}
          path={route.path}
          render={() => {
            const Component = React.lazy(() => import(/* webpackPrefetch: true */ `@pages/${route.component}`))
            return (
              <React.Suspense fallback={null}>
                {isAuth ? <Redirect to="/" /> : <Component />}
              </React.Suspense>
            )
          }}
        />
      ))}
      <Route
        path="/"
        render={() => {
          const Component = React.lazy(() => import(`@pages/app`))
          return (
            <React.Suspense fallback={null}>
              {isAuth ? (
                <Layout history={history} onLogout={logout}>
                  <Component history={history} store={store} {...props} />
                </Layout>
              ) : (
                <Redirect to={routersNotAuth[0].path} />
              )}
            </React.Suspense>
          )
        }}
      />
      <Route render={() => <>404</>} />
    </Switch>
  )
}

const AppRouters = inject('store')(observer(withRouter(Routers)))

export { AppRouters }
