import { Component } from "react";
import { connect } from "react-redux";
import BuyForm from "../components/BuyForm/BuyForm";

class BuyPage extends Component {
    render() {
        return (
            <div>
                <BuyForm {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(BuyPage)