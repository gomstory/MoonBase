import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import Table from "../components/Table/Table";


class HistoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        const id = this.props.id
        id && axios.get(`http://localhost:3001/history/${id}`)
        .then(resp => {
            this.setState({ history: resp.data })
        })
    }

    render() {
        return (
            <div>
                <h3>MOON left {this.props.moonLeft} MOON</h3>
                <Table list={this.state.history} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        moonLeft: state.moonLeft,
        id: state.id
    };
}

export default connect(mapStateToProps)(HistoryPage)