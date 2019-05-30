import React from 'react';
import './App.css';

import StockList from './StockList';
import StockWatchList from './StockWatchList';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.addedStock = [];
    this.state = {
      error: null,
      isLoaded: false,
      stockItems: [],
      uniqueStocks: []
    }
  }

  componentDidMount() {
    // result is fetching more than 800 companies. So I have filtered only those companies whoes latest
    // volume is greater than 5000000
    fetch("https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Technology")
      .then(res => res.json())
      .then(
        result => {
          let lVol = result.filter((r) => {
            return r.latestVolume > 5000000
          })
          this.setState({
            isLoaded: true,
            stockItems: lVol
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  addStock = (e) => {
    // create object of newly added stock
    let newStock = {
      companyName: e.target.text,
      latestPrice: e.target.dataset.price
    }
    // create array list of added stock
    this.addedStock = [
      ...this.addedStock,
      newStock
    ];
    // add unique stock in the list of sidebar
    this.addedStock = Array.from(new Set(this.addedStock.map(s => s.latestPrice)))
      .map(latestPrice => {
        return {
          companyName: this.addedStock.find(s => s.latestPrice === latestPrice).companyName,
          latestPrice: latestPrice
        }
      });

    this.setState({
      uniqueStocks: this.addedStock
    })

  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <header>
              <StockList symbols={this.state.stockItems} addStock={this.addStock} />
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-4 pr-0">
            <aside>
              <StockWatchList addedStock={this.state.uniqueStocks} />
            </aside>
          </div>
          <div className="col-8">
            <section>
              Content
            </section>
          </div>
        </div>
      </div>
    );
  }
}