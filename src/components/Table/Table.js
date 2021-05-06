import './Table.css';

const Table = (props) => {
    let list = props.list.map(it => {
        return (
            <tr key={it}>
                <td>2021-04-01 10:00</td>
                <td>AAAA</td>
                <td>100</td>
                <td>2</td>
                <td>1 MOON = 50 THBT | 0.02</td>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date and time</th>
                        <th>ID</th>
                        <th>THBT</th>
                        <th>MOON</th>
                        <th>RATE</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>)
}

export default Table;