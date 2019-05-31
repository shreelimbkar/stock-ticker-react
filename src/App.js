import React from 'react';
import './App.css';

import StockList from './StockList';
import StockWatchList from './StockWatchList';
import StockDetails from './StockDetails';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.addedStock = [];
    this.addStockDetails = [];
    this.state = {
      error: null,
      isLoaded: false,
      stockItems: [],
      uniqueStocks: [],
      stockDetails: []
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
            stockItems: lVol
          });
        },
        error => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      );
  }

  addStock = (e) => {
    // create object of newly added stock
    let symbol = e.target.dataset.symbol;
    let newStock = this.state.stockItems.filter((i) => {
      return i.symbol === symbol
    });

    // create array list of added stock
    this.addedStock = [
      ...this.addedStock,
      newStock[0]
    ];
    
    // add unique stock in the list of sidebar
    this.setState({
      uniqueStocks: this.getUniqueStocks(this.addedStock)
    });
  }

  getStockItemBySymbol = (sym) => {
    this.state.stockItems.filter((i) => {
      return i.symbol === sym
    });
  }

  showStockDetails = (e) => {
    let symbol = e.target.dataset.symbol;
    this.setState({
      isLoaded: true
    });
    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/logo`)
      .then(res => res.json())
      .then(
        result => {
          let selectedStockItem = this.state.stockItems.filter((i) => {
            return i.symbol === symbol
          })[0];

          let selectedItemStockDetails = {
            ...selectedStockItem,
            logoUrl: result.url
          }
          this.addStockDetails = [
            ...this.addStockDetails,
            selectedItemStockDetails
          ];
          this.setState({
            stockDetails: this.addStockDetails,
            isLoaded: false
          })
        },
        error => {
          console.log('error in fetching logo', error);
        }
      );
  }

  handlerRemoveStock = (e) => {
    e.stopPropagation();
    let filtered = this.state.uniqueStocks.filter(function(el) { return el.symbol !== e.target.dataset.symbol; });
    // remove selected stock and set filtered stock to uniqueStocks
    this.setState({
      uniqueStocks: filtered
    });
    // again set uniqueStocks to addedStock object
    this.addedStock = filtered;
  }

  getUniqueStocks = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));

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
              <StockWatchList addedStock={this.state.uniqueStocks} showStockDetails={this.showStockDetails} 
              handlerRemoveStock={this.handlerRemoveStock}
              />
            </aside>
          </div>
          <div className="col-8">
            <section>
              <StockDetails isLoaded={this.state.isLoaded} stocks={this.state.stockDetails} />
            </section>
          </div>
        </div>
      </div>
    );
  }
}