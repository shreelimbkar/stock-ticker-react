import React from 'react';

import shortid from 'shortid';
import { ListGroup, Badge, Button } from 'react-bootstrap';

function StockWatchList(props) {
    return (
        <React.Fragment>
          <ListGroup>
            { props.addedStock.map(item => (
                <ListGroup.Item action as="div" key={ shortid.generate() } 
                    data-symbol={ item.symbol } 
                    onClick={ props.showStockDetails }
                    className="stocklist"
                >
                    { item.companyName } 
                    <Badge variant="light" data-symbol={ item.symbol }>{ item.latestPrice }</Badge>
                    <Button className="float-right" onClick={props.handlerRemoveStock} data-symbol={ item.symbol }
                    >X</Button>
                </ListGroup.Item>
            )) }
          </ListGroup>
        </React.Fragment>
    )
}

export default StockWatchList