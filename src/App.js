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
    fetch("https://sandbox.iexapis.com/stable/stock/market/collection/sector?collectionName=Technology&token=Tpk_5413e3416f7a433c8dc366d0d66a3fa8")
      .then(res => res.json())
      .then(
        result => {
          let lVol = result.filter((r) => {
            return r.latestVolume
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

  showStockDetails = (e) => { // toggle stock details when user will click on Stock name
    e.stopPropagation();
    let symbol = e.target.dataset.symbol;
    let countPerStock = this.state.stockDetails.filter((s) => s.symbol === symbol);
    this.setState({
      active: !this.state.active
    })
    if (countPerStock.length < 1 ) {  
      this.setState({
        isLoaded: true
      });
      fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/logo?token=Tpk_5413e3416f7a433c8dc366d0d66a3fa8`)
        .then(res => res.json())
        .then(
          result => {
            let selectedStockItem = this.state.stockItems.filter((i) => {
              return i.symbol === symbol
            })[0];

            let selectedItemStockDetails = {
              ...selectedStockItem,
              // logoUrl: result.url
              logoUrl: `https://storage.googleapis.com/iex/api/logos/${symbol}.png`
            }
            this.addStockDetails = [
              ...this.addStockDetails,
              selectedItemStockDetails
            ];
            this.setState({
              stockDetails: this.getUniqueStocks(this.addStockDetails),
              isLoaded: false
            })
          },
          error => {
            console.log('error in fetching logo', error);
          }
        );
    } else {
      this.removeStockDetails(symbol);
    }
  }

  handlerRemoveStock = (e) => {
    e.stopPropagation();
    let symbol = e.target.dataset.symbol;
    let filtered = this.state.uniqueStocks.filter(function(el) { return el.symbol !== symbol; });
    // remove selected stock and set filtered stock to uniqueStocks
    this.setState({
      uniqueStocks: filtered
    });
    // again set uniqueStocks to addedStock object
    this.addedStock = filtered;
    this.removeStockDetails(symbol);
  }

  removeStockDetails = (sym) => {
    let filtered = this.state.stockDetails.filter(function(el) { return el.symbol !== sym; });
    // remove selected stock from stockDetails
    this.setState({
      stockDetails: this.getUniqueStocks(filtered)
    });
    this.addStockDetails = []
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