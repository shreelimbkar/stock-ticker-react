import React from 'react';

import LoadingSpinner from './LoadingSpinner';
import shortid from 'shortid';
import { ListGroup } from 'react-bootstrap';

function StockDetails(props) {
    return (
        <React.Fragment>
          <ListGroup>
            { props.stocks.map(item => (
                <ListGroup.Item action as="div" key={ shortid.generate() } 
                    data-symbol={ item.symbol } 
                >
                    <div className="row">
                        <div className="col-2 border text-center">
                            <img width="80" height="80" src={item.logoUrl} alt={ item.companyName } />
                        </div>
                        <div className="col-10 border">
                            <div className="row font-weight-bold">
                                <div className="col-3">Symbol</div>
                                <div className="col-3">Open</div>
                                <div className="col-3">Close</div>
                                <div className="col-3">Latest Price</div>
                            </div>
                            <div className="row">
                                <div className="col-3">{ item.symbol }</div>
                                <div className="col-3">{ item.open }</div>
                                <div className="col-3">{ item.close }</div>
                                <div className="col-3">{ item.latestPrice }</div>
                            </div>
                        </div>
                    </div>
                </ListGroup.Item>
            )) }
          </ListGroup>
        { props.isLoaded ? <LoadingSpinner /> : <div /> }
        </React.Fragment>
    )
}

export default StockDetails