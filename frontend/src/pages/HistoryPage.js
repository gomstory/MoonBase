import { Component } from "react";
import { connect } from "react-redux";
import Table from "../components/Table/Table";


class HistoryPage extends Component {
    render() {
        return (
            <div>
                <h3>MOON left {this.props.moonLeft} MOON</h3>
                <Table list={this.props.history} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        moonLeft: state.moonLeft,
        history: state.history
    };
}

export default connect(mapStateToProps)(HistoryPage)