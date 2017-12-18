import React, { Component } from 'react';
import './App.css';
import CoinTable from './CoinTable';
import Client from "./Client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData : [],
      marketCapSort: 0,
      sortedCategory: 'MarketCap',
    }
  }

  componentWillMount() {
    Client.coinData(data => {
      this.setState({
        coinData: data
      });
      this.sortByMarketCap();
    });
  }

  sortByMarketCap() {
    this.setState({coinData: 
      this.state.coinData.sort((a, b) => {
        const aCap = a.SUPPLY * a.PRICE;
        const bCap = b.SUPPLY * b.PRICE;        
        return (bCap - aCap);
      })
    });
  }

  sortByPrice() {
    this.setState({
      coinData:
        this.state.coinData.sort((a, b) => {
          return (b.PRICE - a.PRICE);
        })
    });
  }

  sortByVolume() {
    this.setState({
      coinData:
        this.state.coinData.sort((a, b) => {
          return (b.VOLUME24HOURTO - a.VOLUME24HOURTO);
        })
    });
  }

  sortBySupply() {
    this.setState({
      coinData:
        this.state.coinData.sort((a, b) => {
          return (b.SUPPLY - a.SUPPLY);
        })
    });
  }

  sortByChange() {
    this.setState({
      coinData:
        this.state.coinData.sort((a, b) => {
          const aChange = (a.OPEN24HOUR - a.PRICE) / a.OPEN24HOUR;
          const bChange = (b.OPEN24HOUR - b.PRICE) / b.OPEN24HOUR;
          return (bChange - aChange);
        })
    });
  }

  clickHandler(category) {
    switch (category) {
      case this.state.sortedCategory:
        this.setState({ coinData: this.state.coinData.reverse() });
        break;
      case 'MarketCap':
        this.sortByMarketCap();
        break;
      case 'Price':
        this.sortByPrice();
        break;
      case 'Volume':
        this.sortByVolume();
        break;
      case 'Supply':
        this.sortBySupply();
        break;
      case 'Change':
        this.sortByChange();
        break;
      default:
        break;
    }
    this.setState({ sortedCategory: category });
  }

  render() {
    const { coinData } = this.state;
    return (
      <CoinTable 
        onClick={this.clickHandler.bind(this)}
        coinData={coinData}
      />
    );
  }
}

export default App;
