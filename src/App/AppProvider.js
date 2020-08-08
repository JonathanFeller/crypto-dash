import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
    }
  }

  addCoin = (key) => {
    const favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  }

  removeCoin = (key) => {
    const favorites = this.state.favorites.filter(e => e !== key);
    this.setState({ favorites });
  }

  isInFavorites = (key) => {
    return this.state.favorites.includes(key);
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  }

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard',
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }));
  }

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true }
    }
    const { favorites } = cryptoDashData;
    return { favorites };
  }

  setPage = page => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }

}