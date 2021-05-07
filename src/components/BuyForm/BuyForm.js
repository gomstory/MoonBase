import { Component } from "react";
import { exchange_thbt_moon, exchange_moon_thbt, calculateMoonRate } from '../../helpers/exchange'
import BuySuccess from "./BuySuccess";
import Error from './Error'
import './BuyForm.css';
import { BUY_MOON } from '../../redux/action-types'
import { buy, addHistory, updateRate } from '../../redux/actions'
import axios from 'axios';

class BuyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buySuccess: 'init',
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
        const { totalSold, moonRate } = this.props;
        const thbtAmount = exchange_moon_thbt(moonAmount, moonRate, totalSold);
        this.setState({ moonAmount: moonAmount, thbtAmount: thbtAmount });
    }

    slipageChange() {

    }

    onBuy() {
        axios.post('http://localhost:3001/exchange', {
            id: this.props.id,
            thbtAmount: +this.state.thbtAmount
        }).then(resp => {
            this.setState({ buySuccess: 'success' })
        }).catch(() => {
            this.setState({ buySuccess: 'fail' })
        })
    }

    reset() {
        this.setState({
            buySuccess: 'init',
            thbtAmount: 0,
            moonAmount: 0
        })
    }

    render() {
        let content = "";
        let status = this.state.buySuccess;

        if (status == 'init' && this.props.moonLeft <= 0) {
            status = 'sold';
        }

        switch(status) {
            case 'sold': {
                content = (
                    <div className="container">
                        <h2 className="msg">MOON has been sold</h2>
                    </div>)
                break;
            }

            case 'init': {
                content = (<div className='container'>
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
                        <input data-atd="slippage-input" onChange={this.slipageChange} type="text" value={this.state.slipage} />
                    </div>

                    <button onClick={this.onBuy} data-atd="buy-btn" type="submit">Buy</button>
                </div>
            </div>)
                break;
            }

            case 'fail': {
                content = <Error moon={this.state.moonAmount} thbt={this.state.thbtAmount} reset={this.reset} />
                break;
            }

            case 'success': {
                content = <BuySuccess moon={this.state.moonAmount} thbt={this.state.thbtAmount} reset={this.reset} />
                break;
            }
        }

        return content;
    }
}

export default BuyForm