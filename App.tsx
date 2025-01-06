import React from 'react'
import AppRoute from './src'
import { Provider } from 'react-redux'
import store from './src/store'
const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  )
}

export default App