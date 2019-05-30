import React from 'react';
import './App.css';

function App () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <header>
              Header
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-2 pr-0">
            <aside>
              Sidebar
            </aside>
          </div>
          <div className="col-10">
            <section>
              Content
            </section>
          </div>
        </div>
      </div>
    );
  }

export default App;