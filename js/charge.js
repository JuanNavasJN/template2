// Stripe API Key
var stripe = Stripe('pk_test_18jhvjlK9Pc70j9aMmr8jfBZ00i3f9q6qX');
var elements = stripe.elements();
// Custom Styling
var style = {
    base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4',
        },
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
    },
};
// Create an instance of the card Element
var card = elements.create('card', { style: style });
// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');
// Handle real-time validation errors from the card Element.
card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

$('#form-payment-2').submit(e => {
    e.preventDefault();
    console.log('esperando token de stripe....');
    createToken(2);
});

$('#form-payment-1').submit(e => {
    e.preventDefault();
    console.log('esperando token de stripe....');
    createToken(1);
});

function createToken(opt) {
    stripe.createToken(card).then(function (result) {
        if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            stripeTokenHandler(result.token, opt);
        }
    });
}
// Send Stripe Token to Server
function stripeTokenHandler(token, opt) {
    const fd = new FormData();
    fd.append('stripeToken', token.id);
    fd.append('opt', opt);

    fetch('./php/charge.php', {
        method: 'POST', // or 'PUT'
        body: fd, // data can be `string` or {object}!
        mode: 'cors',
    })
        .then(res => res.json())
        .then(res => {
            if (res.id) {
                console.log('Pago exitoso');

                const data = {
                    name: $('#name-' + opt).val(),
                    email: $('#email-' + opt).val(),
                    amount: res.amount / 100,
                    currency: res.currency,
                    created: new Date(res.created * 1000).toLocaleString(),
                    receipt_url: res.receipt_url,
                };

                console.log(data);
            } else {
                console.log('Pago no exitoso');
                console.log(res);
            }
        })
        .catch(err => {
            console.log('err', err);
        });
}

// Tarjetas de prueba

// Payment succeeds
// 4242424242424242

// Payment requires authentication
// 4000002500003155

// Payment is declined
// 4000000000009995

// en el resto de los datos del formulario de stripe (mm/yy , cvc, zip) colocar 2 en todo
