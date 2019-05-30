import React from 'react';

import shortid from 'shortid';
import { Dropdown } from 'react-bootstrap';

function StockList(props) {
    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Stock
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.symbols.map(item => (
                        <Dropdown.Item data-price={item.latestPrice} href="#" onClick={props.addStock} key={shortid.generate()}>
                            { item.companyName }
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

export default StockList