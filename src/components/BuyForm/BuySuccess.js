const BuySuccess = (props) => {
    return (
        <div className="container">
            <h1>SUCCESS</h1>
            <p>You bought <span data-atd="success-moon-label">{props.moon}</span> MOON </p>
            <p>With <span data-atd="success-thbt-label">{props.thbt}</span> THBT</p>
            <a data-atd="back-btn" href="#" onClick={props.reset}>back to buy</a>
        </div>
    )
}

export default BuySuccess