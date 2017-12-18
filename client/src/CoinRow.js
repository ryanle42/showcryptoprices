import React, { Component } from 'react';

class CoinRow extends Component {
  formatNumberLength = (number) => {
    var len = (number.split(".")[0]).length;
    if (len > 4) {
      return parseFloat(number, 10)
        .toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else if (len > 3) {
      return parseFloat(number, 10)
        .toLocaleString(undefined, { maximumFractionDigits: 2 });
    } else {
      return parseFloat(number, 10)
        .toLocaleString(undefined, { maximumFractionDigits: 5 });
    }
  }
  
  marketCap = (price, supply) => {
    let totalMarketCap = price * supply;
    return totalMarketCap
      .toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  pctChange = (open, now) => {
    var change = (((now - open) / now) * 100).toFixed(2);
    var color = null;
    if (change > 0) {
      color = 'green';
    } else if (change < 0) {
      color = 'red';
    }
    return (
      <td style={{color: color}}>{change}%</td>
    );
  }
  render() {
    const coinRows = this.props.coinData.map((data, index) => (
      <tr key={index + 1}>
        <td className="center aligned">{index + 1}</td>
        <td className="left aligned">{data.NAME}</td>
        <td>${this.marketCap(data.SUPPLY, data.PRICE)}</td>
        <td>${this.formatNumberLength(data.PRICE)}</td>
        <td>
          ${(parseFloat(data.VOLUME24HOURTO, 10))
            .toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </td>
        <td>
          {(parseFloat(data.SUPPLY))
            .toLocaleString(undefined, { maximumFractionDigits: 0 })}
          {' '}{data.FROMSYMBOL}
        </td>
        {this.pctChange(data.OPEN24HOUR, data.PRICE)}
      </tr>
    ));
    return (
      <tbody>
        {coinRows}
      </tbody>
    );
  }
}

export default CoinRow;