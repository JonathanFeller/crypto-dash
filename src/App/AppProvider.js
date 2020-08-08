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
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
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
    this.fetchPrices();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({prices});
  }

  prices = async () => {
    let returnData = [];
    for (let i=0; i < this.state.favorites.length; i++) {
      try {
        const priceData = await cc.priceFull(this.state.favorites[i], 'USD');
        returnData.push(priceData);
      } catch (err) {
        console.warn('Fetch price error: ', err);
      }
    }
    return returnData;
  }

  confirmFavorites = () => {
    const currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavorite: currentFavorite,
    }, () => {
      this.fetchPrices();
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite: currentFavorite
    }));
  }

  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true }
    }
    const { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  }

  setPage = page => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }

}