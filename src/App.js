import React from 'react';
import './App.css';

import StockList from './StockList';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stockItems: [],
      addedStock: []
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
    let newStock = {
      companyName: e.target.text,
      latestPrice: e.target.dataset.price
    }
    this.setState(prevState => ({
      addedStock: [
        ...prevState.addedStock,
        newStock
      ]
    }))
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
          <div className="col-3 pr-0">
            <aside>
              Sidebar
            </aside>
          </div>
          <div className="col-9">
            <section>
              Content
            </section>
          </div>
        </div>
      </div>
    );
  }
}