function Product( {title, desc, amount, colors, feature } ) {
    // let list = colors.map((color) => <li>{color}</li>);

    return ( // Using Probs
        <div className="component-box">
            <h2>Title: {title}</h2>
            <p>Description: {desc}.</p>
            <h4>Amount: {amount}.</h4>
            <p>{colors}</p>
            <p>{feature.a}</p>
        </div>
    );
}

export default Product;