import React from 'react'
import {
  Header,
  Bridge,
  RelayEvents,
  Footer,
  SweetAlert,
  Loading,
  StatusPage,
  StatisticsPage
} from './components'
import { Route, Switch } from 'react-router-dom'
import './assets/stylesheets/application.css'
import { Disclaimer } from './components'
import { ModalContainer } from './components'
import { NoWallet } from './components'
import { setItem, getItem, DISCLAIMER_KEY } from './components/utils/localstorage'
import Banner from './components/Banner'
import SwithChainButton from './components/SwithChainButton'

export class App extends React.Component {
  state = {
    showDisclaimer: false,
    showMobileMenu: false,
  }

  componentDidMount() {
    const disclaimerDisplayed = getItem(DISCLAIMER_KEY)

    if (!disclaimerDisplayed) {
      this.setState({ showDisclaimer: true })
    }
  }

  closeDisclaimer = () => {
    setItem(DISCLAIMER_KEY, true)
    this.setState({ showDisclaimer: false })
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({ showMobileMenu: !prevState.showMobileMenu }))
  }

  render() {
    const { showDisclaimer, showMobileMenu } = this.state
    return (
      <div className={showMobileMenu ? 'mobile-menu-is-open' : ''}>
        <Route component={Loading} />
        <Route component={SweetAlert} />
        <Route
          render={() => (
            <Header onMenuToggle={this.toggleMobileMenu} showMobileMenu={showMobileMenu} />
          )}
        />
        <div className="app-container">
          <SwithChainButton />
          {showMobileMenu && <Route render={() => <div className="mobile-menu-open" />} />}
          <Switch>
            { /* <Route exact path="/events" component={RelayEvents} /> */ }
            <Route exact path={["/status", "/:id/status"]} component={StatusPage} />
            <Route exact path={["/statistics", "/:id/statistics"]} component={StatisticsPage} />
            <Route path={"/"} component={Bridge} />
          </Switch>
        </div>
        <Route component={Footer} />
        <ModalContainer showModal={showDisclaimer}>
          <Disclaimer onConfirmation={this.closeDisclaimer} />
        </ModalContainer>
        <NoWallet showModal={!showDisclaimer} />
      </div>
    )
  }
}
