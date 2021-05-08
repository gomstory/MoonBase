import './Table.css';

const Table = (props) => {
    let list = props.list.map(it => {
        return (
            <tr key={it.date}>
                <td>{it.date}</td>
                <td>{it.id}</td>
                <td>{it.thbt}</td>
                <td>{it.moon}</td>
                <td>1 MOON = {it.rate.moonRate} THBT | {it.rate.exchangeRate}</td>
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