import { Component } from "react";
import { exchange_thbt_moon, exchange_moon_thbt } from '../../helpers/exchange'
import BuySuccess from "./BuySuccess";
import './BuyForm.css';

class BuyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy_success: false,
            sold_n: props.totalSold,
            nextRate: props.nextIncreaseRate,
            moonRate: props.moonRate,
            currenBalance: props.thbtBalance,
            thbtAmount: 0,
            amountMoon: 0,
            slipage: 0
        }

        this.exchange_thbt_to_moon = this.exchange_thbt_to_moon.bind(this);
        this.exchange_moon_to_thbt = this.exchange_moon_to_thbt.bind(this);
        this.onBuy = this.onBuy.bind(this);
        this.reset = this.reset.bind(this);
    }

    exchange_thbt_to_moon(event) {
        const thbtAmount = event.target.value;
        const { totalCoin } = exchange_thbt_moon(event.target.value, this.state.moonRate, this.state.sold_n, this.state.nextRate);
        this.setState({ amountMoon: totalCoin, thbtAmount: thbtAmount });
    }

    exchange_moon_to_thbt(event) {
        const amountMoon = event.target.value;
        const thbtAmount = exchange_moon_thbt(event.target.value, this.state.moonRate);
        this.setState({ thbtAmount: thbtAmount, amountMoon: amountMoon })
    }

    onBuy() {
        // buyCoin
    }

    reset() {
        this.setState({ buy_success: false })
    }

    render() {
        let content = this.state.buy_success === false ?
            (<div className='container'>
                <h1 className="header">MOON = <label data-atd="moon-price-label">{this.state.moonRate}</label> THBT</h1>
                <p className="balance">You have <label data-atd="balance-label">{this.state.currenBalance}</label> THBT</p>

                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor='amount_to_buy'>Amount to buy (THBT)</label>
                        <input data-atd="thbt-input" type="number" onChange={this.exchange_thbt_to_moon} value={this.state.thbtAmount} />
                    </div>

                    <div className="form-control">
                        <label htmlFor='amount_moon'>Amount MOON </label>
                        <input data-atd="moon-input" type="number" onChange={this.exchange_moon_to_thbt} value={this.state.amountMoon} />
                    </div>

                    <div className="form-control">
                        <label htmlFor='amount_moon'>Slippage Tolerance (%)</label>
                        <input data-atd="slippage-input" type="text" />
                    </div>

                    <button onClick={this.onBuy} data-atd="buy-btn" type="submit">Buy</button>
                </div>
            </div>) : <BuySuccess moon='2' thbt='100' reset={this.reset} />

        return content;
    }
}

export default BuyForm