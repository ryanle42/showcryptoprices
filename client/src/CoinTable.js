import React, { Component } from 'react';
import './App.css';
import CoinRow from './CoinRow';

class CoinTable extends Component {
  render() {
    return (
      <div className="coinTableContainer">
        <table className="ui striped right aligned unstackable table">
          <thead>
            <tr>
              <th className="center aligned">#</th>
              <th className="left aligned">Name</th>
              <th 
                className="tableHeader"
                onClick={() => this.props.onClick('MarketCap')}
              >
                Market Cap
              </th>
              <th 
                className="tableHeader"
                onClick={() => this.props.onClick('Price')}
              >
                Price
              </th>
              <th 
                className="tableHeader"
                onClick={() => this.props.onClick('Volume')}
              >
                Volume (24h)
              </th>
              <th 
                className="tableHeader"
                onClick={() => this.props.onClick('Supply')}
              >
                Circulating Supply
              </th>
              <th 
                className="tableHeader"
                onClick={() => this.props.onClick('Change')}
              >
                Change (24h)
              </th>
            </tr>
          </thead>
          <CoinRow coinData={this.props.coinData}/>
        </table>
      </div>
    );
  }
}

export default CoinTable;