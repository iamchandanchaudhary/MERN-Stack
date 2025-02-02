let styles = {backgroundColor : "darkblue", color: "white", padding: 10};
let styles2 = {marginBottom: 10};

function Information({name}) {
    return (
        <div>
            <p style={styles}>Hello👋, I'm {name}!</p>
            <p style={{backgroundColor : "brown", color: "white", padding: 10}}>Hello, my Aman!</p>
            <p style={styles}>This is a Paragraph</p>
        </div>
    );
}

export default Information;