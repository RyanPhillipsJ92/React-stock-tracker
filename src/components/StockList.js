import React, {Component, useCallback} from 'react';
import StockRow from './StockRow';
import {stock} from "../resources/stock";

class StockList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastTradingDate: null
        }
    }

    componentDidMount() {
        stock.getLastTradingDate().then((data) => {
            this.setState({
                lastTradingDate: data[0].date
            })
        })
    }

    render() {
        const lastTradingDate = this.state.lastTradingDate;
        return (
            <ul className="list-group list-group-flush">
                <StockRow ticker="amc"  lastTradingDate={lastTradingDate}/>
                <StockRow ticker="aapl" lastTradingDate={lastTradingDate}/>
                <StockRow ticker="goog" lastTradingDate={lastTradingDate}/>
                <StockRow ticker="msft" lastTradingDate={lastTradingDate}/>
                <StockRow ticker="tsla" lastTradingDate={lastTradingDate}/>
            </ul>
        )
    }
}

export default StockList;