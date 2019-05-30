import React from 'react';

import shortid from 'shortid';
import { ListGroup, Badge } from 'react-bootstrap';

function StockWatchList(props) {
    return (
        <React.Fragment>
          <ListGroup>
            { props.addedStock.map(item => (
                <ListGroup.Item action key={ shortid.generate() }>
                    { item.companyName } <Badge variant="light" className="float-right">{ item.latestPrice }</Badge>
                </ListGroup.Item>
            )) }
          </ListGroup>
        </React.Fragment>
    )
}

export default StockWatchList