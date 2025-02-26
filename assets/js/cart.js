$(document).ready(function() {

    // Add to cart
    $('#add-cart').on('click', function() {
        var productId = $(this).data('product-id');
        var price = $(this).data('price');
        var quantity = $('#quantity').val();
        var user_id = $(this).data('user-id');

        
        $.ajax({
            url: 'includes/cart.inc.php',
            method: 'POST',
            data: {
                'add_item': true,
                product_id: productId,
                price: price,
                quantity: quantity,
                user_id: user_id
            },
            success: function(response) {
                console.log('Success response:', response);
                try {
                    var result = typeof response === 'string' ? JSON.parse(response) : response;
                    if (result.status === 'success') {
                        alert(result.message);
                        $('#checkout').show();
                        location.reload();
                    } else {
                        alert('Error: ' + result.message);
                    }
                } catch (error) {
                    alert('An error occurred!. Please try again.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX request failed', textStatus, errorThrown);
                alert('An error occurred. Please try again.');
            }
        });
    });

    // update payment details in cart
    function updateTotals(){
        var subtotal = 0;
        $('.quantity-input').each(function(){
            var price = $(this).data('price');
            var quantity = $(this).val();
            subtotal += price * quantity;
        });
        $('#subtotal').text('GH₵' + subtotal.toFixed(2));
        $('#total').text('GH₵' + subtotal.toFixed(2));
    }

    $('.quantity-input').on('change', function(){
        updateTotals();

        // update cart item quantity
        var productId = $(this).data('product-id');
        var quantity = $(this).val();
        var userId = $(this).data('user-id');
        $.ajax({
            url: 'includes/cart.inc.php',
            method: 'POST',
            data: {
                'update_quantity': true,
                product_id: productId,
                quantity: quantity,
                user_id: userId
            },
            success: function(response){
                console.log('Success response:', response);
                try {
                    var result = typeof response === 'string' ? JSON.parse(response) : response;
                    console.log('Parsed result:', result);
                    if (result.status === 'success'){
                        location.reload();
                    } else {
                        alert('Error: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error parsin response: ', error);
                    alert('An error occurred. Please try again.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.error('AJAX request failed', textStatus, errorThrown);
                alert('An error occurred. Please try again.');
            }
        });
    });

    updateTotals();
    // delete item from cart
    $('.delete-item').on('click', function(){
        var productId = $(this).data('product-id');
        var cartId = $(this).data('cart-id');
        var userId = $(this).data('user-id');
        $.ajax({
            url: 'includes/cart.inc.php',
            method: 'POST',
            data: {
                'delete-item': true,
                product_id: productId,
                cart_id: cartId,
                user_id: userId
            },
            success: function(response){
                console.log('Success response:', response);
                try {
                    var result = typeof response === 'string' ? JSON.parse(response) : response;
                    console.log('Parsed result:', result);
                    if (result.status === 'success'){
                        alert(result.message);
                        location.reload();
                    } else {
                        alert('Error: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error parsin response: ', error);
                    alert('An error occurred. Please try again.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.error('AJAX request failed', textStatus, errorThrown);
                alert('An error occurred. Please try again.');
            }
        });
    });
    // Quantity increment and decrement
    $('.inc').click(function() {
        var $input = $(this).siblings('input');
        $input.val(parseInt($input.val()) + 1);
    });

    $('.dec').click(function() {
        var $input = $(this).siblings('input');
        var value = parseInt($input.val()) - 1;
        $input.val(value > 0 ? value : 1);
    });

    const shippingCosts = {
        'Accra': 50.00,
        'Kumasi': 70,
    }

    //delivery handling
    $('#delivery-options').on('change', function() {
        var deliveryOption = $(this).val();
        var deliveryLocation = $('#delivery-location').val();

        if(deliveryOption == 'door-delivery'){
            $('#delivery-location').show();
        }else{
            $('#delivery-location').hide(); 
        }
        
    });
});