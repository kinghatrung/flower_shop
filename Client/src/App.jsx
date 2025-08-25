import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { publicRouters, privateRouters, commonRouters } from '~/routes'
import DefaultLayout from '~/layouts/DefaultLayout'
import ContentOnly from '~/layouts/ContentOnly'
import NotFound from '~/pages/CommonPages/NotFound'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRouters.map((route, index) => {
            const Page = route.page
            let LayoutPublic = DefaultLayout

            if (route.layout) {
              LayoutPublic = route.layout
            } else if (route.layout === null) {
              LayoutPublic = Fragment
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutPublic>
                    <Page />
                  </LayoutPublic>
                }
              />
            )
          })}

          {privateRouters.map((route, index) => {
            const Page = route.page
            let LayoutPrivate = DefaultLayout

            if (route.layout) {
              LayoutPrivate = route.layout
            } else if (route.layout === null) {
              LayoutPrivate = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutPrivate>
                    <Page />
                  </LayoutPrivate>
                }
              />
            )
          })}

          {commonRouters.map((route, index) => {
            const Page = route.page
            let LayoutCommon = ContentOnly

            if (route.layout) {
              LayoutCommon = route.layout
            } else if (route.layout === null) {
              LayoutCommon = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutCommon>
                    <Page />
                  </LayoutCommon>
                }
              />
            )
          })}

          <Route
            path='*'
            element={
              <DefaultLayout>
                <NotFound />
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
