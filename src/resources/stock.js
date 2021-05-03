import {iex} from "../config/iex";

export const stock = {

    latestPrice: (ticker, callback) => {
        fetch(stock.latestPriceURL(ticker))
            .then((response) => response.json())
            .then((data) =>  callback(stock.formatPriceData(data)))
    },

    latestPriceURL: (ticker) => {
        return `${iex.base_url}stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`
    },

    formatPriceData: (data) => {
    const stockData = data[data.length - 1]
    const formattedData = {}
    formattedData.price = stockData.close
    formattedData.date = stockData.date
    formattedData.time = stockData.label
    return formattedData;
    },

    getYesterdaysClose: (ticker, lastTradingDate, callback) => {
        if (lastTradingDate !== "" && lastTradingDate !== undefined){
        const url = stock.yesterdaysCloseUrl(ticker, stock.formatDate(lastTradingDate))
        fetch(url)
            .then((response) => response.json())
            .then((data) =>  callback(stock.formatPriceData(data)))
        }
        // })
    },

        getLastTradingDate: () => {
            const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
            const url = `${iex.base_url}ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`
            console.log(url)
            return fetch(url).then((res) => res.json());
        },

    yesterdaysCloseUrl: (ticker, lastTradingDate) => {
        console.log('last trading date in stock.js   :    ' + lastTradingDate)

        return `${iex.base_url}stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${iex.api_token}`
    },


    formatDate: (date) => {
       return date.replace(/-/g, '')
    }
}