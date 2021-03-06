import { Component } from "react";
import { exchange_thbt_moon, exchange_moon_thbt } from '../../helpers/exchange'
import BuySuccess from "./BuySuccess";
import Error from './Error'
import './BuyForm.css';
import axios from 'axios';
import { ENDPOINT } from "../../config";

class BuyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buySuccess: 'init',
            moonRate: props.moonRate,
            thbtAmount: '',
            moonAmount: '',
            slipage: ''
        }

        this.exchange_thbt_to_moon = this.exchange_thbt_to_moon.bind(this);
        this.exchange_moon_to_thbt = this.exchange_moon_to_thbt.bind(this);
        this.slipageChange = this.slipageChange.bind(this);
        this.onBuy = this.onBuy.bind(this);
        this.reset = this.reset.bind(this);
    }

    exchange_thbt_to_moon(event) {
        const thbtAmount = +event.target.value

        if (thbtAmount) {
            thbtAmount && axios.get(`${ENDPOINT}/ask`, { params: { thbt: thbtAmount }})
            .then(resp => {
                this.setState({ moonAmount: resp.data.moon, thbtAmount: resp.data.thbt });
            })
        } else {
            this.setState({ moonAmount: '', thbtAmount: '' });
        }
    }

    exchange_moon_to_thbt(event) {
        const moonAmount = +event.target.value

        if (moonAmount) {
            axios.get(`${ENDPOINT}/ask`, { params: { moon: moonAmount }})
            .then(resp => {
                this.setState({ moonAmount: resp.data.moon, thbtAmount: resp.data.thbt });
            })
        } else {
            this.setState({ moonAmount: '', thbtAmount: '' });
        }
    }

    slipageChange() {

    }

    onBuy() {
        axios.post(`${ENDPOINT}/exchange`, {
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

        if (status === 'init' && this.props.moonLeft <= 0) {
            status = 'sold';
        }

        switch(status) {
            case 'sold': {
                content = (
                    <div className="container">
                        <h2 className="msg">all MOON coins had sold out</h2>
                    </div>)
                break;
            }

            case 'init': {
                content = (<div className='container'>
                <h1 className="header">MOON = <label data-atd="moon-price-label">{this.props.moonRate}</label> THBT</h1>
                <p className="balance">You have <label data-atd="balance-label">{this.props.thbtBalance}</label> THBT</p>

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

            default:
                content = "";
                break;
        }

        return content;
    }
}

export default BuyForm