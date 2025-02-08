function genTicket(n) {
    let arr = new Array(n);
    let sum = 0;

    for(let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 10);
        sum += arr[i];
        
    }
    // console.log(arr);
    // console.log(sum);

    return arr;
}

// genTicket(3);

function sum(arr) {
    return arr.reduce((sum, current) => sum + current, 0);
}

export {genTicket, sum};