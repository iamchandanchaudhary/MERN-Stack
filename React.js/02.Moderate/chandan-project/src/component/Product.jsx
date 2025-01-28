function Product( {title, desc, amount, colors, feature } ) {
    // let list = colors.map((color) => <li>{color}</li>);

    // ==> Applying conditions

    // let isDiscount = amount > 20 ? "Discount of 5% (more then 20)." : "";
    return ( // ==> Using Probs
        <div className="component-box">
            <h2>Title: {title}</h2>
            <p>Description: {desc}.</p>
            <h4>Amount: {amount}.</h4>
            {amount > 20 ? <p>Discount of 5% (more then 20).</p> : null}
            <p>{colors}</p>
            <p>{feature.a}</p>
        </div>
    );

    // if(amount > 20) {
    //     return (
    //         <div className="component-box">
    //             <h2>Title: {title}</h2>
    //             <p>Description: {desc}.</p>
    //             <h4>Amount: {amount}.</h4>
    //             <p>Discount of 5% (more then 20).</p>
    //             <p>{colors}</p>
    //             <p>{feature.a}</p>
    //         </div>
    //     );
    // } 
    // else {
    //     return (
    //         <div className="component-box">
    //             <h2>Title: {title}</h2>
    //             <p>Description: {desc}.</p>
    //             <h4>Amount: {amount}.</h4>
    //             <p>{colors}</p>
    //             <p>{feature.a}</p>
    //         </div>
    //     ); 
    // }
}

export default Product;