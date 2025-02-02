function Product( {title, desc, amount, colors, feature } ) {
    // let list = colors.map((color) => <li>{color}</li>);

    // ==> Applying conditions
    // let isDiscount = amount > 20 ? "Discount of 5% (more then 20)." : "";
    let isDiscount = amount > 20;

    let styles = {backgroundColor : isDiscount ? "lightpink" : ""}; // ==> Dynanically changing component
    return ( // ==> Using Probs
        <div className="component-box" style={styles}>
            <h2>Title: {title}</h2>
            <p>Description: {desc}.</p>
            <h4>Amount: {amount}.</h4>
            {isDiscount ? <p>Discount of 5% (more then 20).</p> : null}
            <p>{colors}</p>
            <p>{feature.a}</p>
        </div>
    );

    // if(amount > 20) {
    //     return (
    //         
    //     );
    // } 
    // else {
    //     return (
    //         
    //     ); 
    // }
}

export default Product;