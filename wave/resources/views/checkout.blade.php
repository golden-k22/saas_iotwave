<script src="https://cdn.paddle.com/paddle/paddle.js"></script>
<script>

    window.vendor_id = parseInt('{{ config("wave.paddle.vendor") }}');

    if(vendor_id){
        Paddle.Environment.set('sandbox');
        Paddle.Setup({ vendor: vendor_id });
    }

    let checkoutBtns = document.getElementsByClassName("checkout");
    for( var i=0; i < checkoutBtns.length; i++ ){
        checkoutBtns[i].addEventListener('click', function(){
            waveCheckout(this.dataset.plan, 'checkoutComplete')
        }, false);
    }

    let updateBtns = document.getElementsByClassName("checkout-update");
    for( var i=0; i < updateBtns.length; i++ ){
        updateBtns[i].addEventListener('click', waveUpdate, false);
    }

    let cancelBtns = document.getElementsByClassName("checkout-cancel");
    for( var i=0; i < cancelBtns.length; i++ ){
        cancelBtns[i].addEventListener('click', waveCancel, false);
    }


    function waveCheckout(plan_id, callback) {
        if(vendor_id){
            let product = parseInt(plan_id);
            Paddle.Checkout.open({
                product: product,
                email: '@if(!auth()->guest()){{ auth()->user()->email }}@endif',
                successCallback: callback,
            });
        } else {
            alert('Paddle Vendor ID is not set, please see the docs and learn how to setup billing.');
        }
    }

    window.smsCheckoutComplete = function(data) {
        var checkoutId = data.checkout.id;

        Paddle.Order.details(checkoutId, function(data) {
            // Order data, downloads, receipts etc... available within 'data' variable.
            document.getElementById('fullscreenLoaderMessage').innerText = 'Finishing Up Your Order';
            document.getElementById('fullscreenLoader').classList.remove('hidden');
            axios.post('/buy-sms', { _token: csrf, checkout_id: data.checkout.checkout_id })
                .then(function (response) {
                    if(parseInt(response.data.status) == 1){
                        popToast('success' ,response.data.message)
                    }
                });
        });
    }

    function waveUpdate(){
        Paddle.Checkout.open({
            override: this.dataset.url,
            successCallback: "checkoutUpdate",
        });
    }

    function waveCancel(){
        Paddle.Checkout.open({
            override: this.dataset.url,
            successCallback: "checkoutCancel",
        });
    }

</script>
