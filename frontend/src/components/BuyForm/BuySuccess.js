const BuySuccess = (props) => {
    return (
        <div className="container">
            <h1 className="header">SUCCESS</h1>
            <p className="msg">You bought <span data-atd="success-moon-label">{props.moon}</span> MOON </p>
            <p className="msg">with <span data-atd="success-thbt-label">{props.thbt}</span> THBT</p>
            <a className="back" data-atd="back-btn" onClick={props.reset}>back to Buy</a>
        </div>
    )
}

export default BuySuccess