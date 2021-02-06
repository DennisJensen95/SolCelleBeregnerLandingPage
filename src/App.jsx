import UserProvider from './components/providers/user_provider'
import Application from './components/application'
import React, { Component } from 'react'

export class App extends Component {
  render() {
    return (
      <UserProvider>
        <Application />
      </UserProvider>
    )
  }
}

export default App;