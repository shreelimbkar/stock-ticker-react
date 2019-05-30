import React from 'react';

import shortid from 'shortid';
import { ListGroup, Badge, Button } from 'react-bootstrap';

function StockWatchList(props) {
    return (
        <React.Fragment>
          <ListGroup>
            { props.addedStock.map(item => (
                <ListGroup.Item action as="div" key={ shortid.generate() } data-cname={ item.companyName } onClick={ props.showStockDetails }>
                    { item.companyName } 
                    <Badge variant="light" data-cname={ item.companyName }>{ item.latestPrice }</Badge>
                    <Button className="float-right" onClick={props.handlerRemoveStock} data-cname={ item.companyName }
                    >X</Button>
                </ListGroup.Item>
            )) }
          </ListGroup>
        </React.Fragment>
    )
}

export default StockWatchList