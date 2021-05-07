const Error = (props) => {
    return (
        <div className="container">
            <h1 className="msg">Error</h1>
            <a className="back" data-atd="back-btn" href="#" onClick={props.reset}>back to Buy</a>
        </div>
    )
}

export default Error;