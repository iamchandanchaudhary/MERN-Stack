function Product( {title, desc, amount} ) {
    return ( // Using Probs
        <>
            <h2>Title: {title}</h2>
            <h4>Description: {desc}.</h4>
            <h4>Amount: {amount}.</h4>
        </>
    );
}

export default Product;