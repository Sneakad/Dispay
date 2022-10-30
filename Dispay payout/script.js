// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const otherParam = {
    headers: {
        "content-type":"application/json; charset=UTF-8"
    },
    method:"GET"
}

let result;

window.onload = () => {
    var refId = getParameterByName('id');
    const url = `http:localhost:8080/paymentDetailRefID/${refId}`;
    fetch(url, otherParam).then(data => {
        return data.json()
    }).then(res => {
        result = res;
        console.log(result);
    }).then(() => {
        const amt = document.getElementById('amt');
        const to = document.getElementById('to');
        const from = document.getElementById('from');
        const refId = document.getElementById('refId');
        // const email = document.getElementById('email');
        amt.innerHTML = "₹ "+result.amount;
        to.innerHTML = result.to;
        from.innerHTML = result.from;
        refId.innerHTML = result.reference_id;
        // email.innerHTML = result.contact.email;
    })
}