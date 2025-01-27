function Product( {title, desc, amount, colors} ) {
    return ( // Using Probs
        <div className="component-box">
            <h2>Title: {title}</h2>
            <h4>Description: {desc}.</h4>
            <h4>Amount: {amount}.</h4>
            <h4>{colors}</h4>
        </div>
    );
}

export default Product;