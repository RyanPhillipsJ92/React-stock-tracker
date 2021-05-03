import React, {Component} from 'react';
import { stock } from '../resources/stock.js';


class StockRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price: null,
            date: null,
            time: null,
            dollar_change: null,
            percent_change: null
        }
    }
// (this.state.dollar_change > 0) ? '#4caf50' : '#e53935',
    changeStyle() {
        return {
            color: (this.state.percent_change > 0.00) ?'#4caf50' : '#e53935',
            fontSize: '0.8rem',
            marginLeft: 5
        }
    }

    applyData(data) {
        const formattedPrice = (data.price === undefined) ? null : data.price
        this.setState({
            price: formattedPrice,
            date: data.date,
            time: data.time,
        });

    }

    componentDidMount() {
        stock.latestPrice(this.props.ticker, this.applyData.bind(this))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setCanRetrieveClose(prevProps)

        if (this.state.canRetrieveClose && this.state.price != null) {

            stock.getYesterdaysClose(this.props.ticker, this.props.lastTradingDate, (yesterday) => {
                console.log(yesterday)
                // console.log(this.props.ticker, this.state.canRetrieveClose, this.state.price)
                // console.log(this.props.ticker, this.state.price, yesterday.price)
                const dollar_change = (this.state.price - yesterday.price).toFixed(2)
                const percent_change = (100 * dollar_change / yesterday.price).toFixed(2)

                this.setState({
                    //PRICE is a bad name change it to close for yesterday
                    dollar_change: `${dollar_change}`,
                    percent_change: `${percent_change}`,
                    canRetrieveClose: false
                })
            })
        }
    }
    setCanRetrieveClose(prevProps){
        if (prevProps.lastTradingDate === null && this.props.lastTradingDate !== null) {
            this.setState({
                canRetrieveClose: true
            })
        }
    }
    render() {
        return (
            <li className="list-group-item">
                <b>{this.props.ticker}</b> ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                    ${this.state.dollar_change}
                    ({this.state.percent_change})%
                </span>
            </li>
        );
    }
}

export default StockRow;