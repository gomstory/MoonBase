import { Component } from "react";
import { exchange_thbt_moon, exchange_moon_thbt, calculateMoonRate } from '../../helpers/exchange'
import BuySuccess from "./BuySuccess";
import './BuyForm.css';
import { BUY_MOON } from '../../redux/action-types'
import { buy, addHistory, updateRate } from '../../redux/actions'

class BuyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buySuccess: false,
            moonRate: props.moonRate,
            thbtBalance: props.thbtBalance,
            thbtAmount: 0,
            moonAmount: 0,
            slipage: 5
        }

        this.exchange_thbt_to_moon = this.exchange_thbt_to_moon.bind(this);
        this.exchange_moon_to_thbt = this.exchange_moon_to_thbt.bind(this);
        this.slipageChange = this.slipageChange.bind(this);
        this.onBuy = this.onBuy.bind(this);
        this.reset = this.reset.bind(this);
    }

    exchange_thbt_to_moon(event) {
        const thbtAmount = event.target.value;
        const { totalSold, moonRate } = this.props;
        const totalCoin = exchange_thbt_moon(thbtAmount, moonRate, totalSold);
        this.setState({ moonAmount: totalCoin, thbtAmount: thbtAmount });
    }

    exchange_moon_to_thbt(event) {
        const moonAmount = event.target.value;
        const { totalSold, moonRate  } = this.props;
        const thbtAmount = exchange_moon_thbt(moonAmount, moonRate, totalSold);
        this.setState({ moonAmount: moonAmount, thbtAmount: thbtAmount });
    }

    slipageChange() {

    }

    onBuy() {
        const date = new Date();
        const totalSold = this.props.totalSold + (+this.state.moonAmount);
        const newRate = calculateMoonRate(totalSold);
        const info = {
            date: date.toISOString(),
            id: date.getTime(),
            thbt: +this.state.thbtAmount,
            moon: +this.state.moonAmount,
            rate: {
                moonRate: this.props.moonRate,
                slipage: this.state.slipage
            }
        }

        this.props.dispatch(buy(info));
        this.props.dispatch(updateRate(newRate));
        this.setState({ buySuccess: true })
    }

    reset() {
        this.setState({ 
            buySuccess: false,
            thbtAmount: 0,
            moonAmount: 0
        })
    }

    render() {
        let content = this.state.buySuccess === false ?
            (<div className='container'>
                <h1 className="header">MOON = <label data-atd="moon-price-label">{this.props.moonRate}</label> THBT</h1>
                <p className="balance">You have <label data-atd="balance-label">{this.state.thbtBalance}</label> THBT</p>

                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor='amount_to_buy'>Amount to buy (THBT)</label>
                        <input data-atd="thbt-input" type="number" onChange={this.exchange_thbt_to_moon} value={this.state.thbtAmount} />
                    </div>

                    <div className="form-control">
                        <label htmlFor='amount_moon'>Amount MOON </label>
                        <input data-atd="moon-input" type="number" onChange={this.exchange_moon_to_thbt} value={this.state.moonAmount} />
                    </div>

                    <div className="form-control">
                        <label htmlFor='amount_moon'>Slippage Tolerance (%)</label>
                        <input data-atd="slippage-input" onChange={this.slipageChange} type="text"  value={this.state.slipage} />
                    </div>

                    <button onClick={this.onBuy} data-atd="buy-btn" type="submit">Buy</button>
                </div>
            </div>) : <BuySuccess moon={this.state.moonAmount} thbt={this.state.thbtAmount} reset={this.reset} />

        return content;
    }
}

export default BuyForm