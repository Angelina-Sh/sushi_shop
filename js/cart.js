const cartWrapper = document.querySelector('.cart-wrapper')
window.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-cart')) {
        const cart = event.target.closest('.card')

        const productInfo = {
            id: cart.dataset.id,
            imgSrc: cart.querySelector('.product-img').getAttribute('src'),
            title: cart.querySelector('.item-title').innerText,
            itemsInBox: cart.querySelector('[data-items-in-box]').innerText,
            weight: cart.querySelector('.price__weight').innerText,
            price: cart.querySelector('.price__currency').innerText,
            counter: cart.querySelector('[data-counter]').innerText
        }

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]')
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter)
        } else {
            const cartItemHtml = 
            `<div class="cart-item" data-id="${productInfo.id}">
                <div class="cart-item__top">
                    <div class="cart-item__img">
                        <img src="${productInfo.imgSrc}" alt="">
                    </div>
                    <div class="cart-item__desc">
                        <div class="cart-item__title">${productInfo.title}</div>
                        <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                        <div class="cart-item__details">
                            <div class="items items--small counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter="">${productInfo.counter}</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>
                            <div class="price">
                                <div class="price__currency">${productInfo.price}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

            cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml)
        }

        cart.querySelector('[data-counter]').innerText = '1'

        toggleCartStatus()
    }
})

function toggleCartStatus() {
    const cartEmpty = document.querySelector('[data-cart-empty]')
    const cartTotal = document.querySelector('.cart-total')
    const orderForm = document.querySelector('#order-form')

    let totalPrice = 0

    if (cartWrapper.querySelectorAll('.cart-item').length > 0) {
        cartEmpty.classList.add('none')
        cartTotal.classList.remove('none')
        orderForm.classList.remove('none')
    } else {
        cartEmpty.classList.remove('none')
        cartTotal.classList.add('none')
        orderForm.classList.add('none')
    }

    cartWrapper.querySelectorAll('.cart-item').forEach(function(item) {
        const counter = item.querySelector('[data-counter]').innerText
        const priceOneItem = item.querySelector('.price__currency').innerText
        const price = parseInt(counter) * parseInt(priceOneItem)
        totalPrice = totalPrice + price
    })

    if (totalPrice > 1000) {
        cartTotal.querySelector('.delivery-cost').innerText = 'бесплатно'
        cartTotal.querySelector('.total-price').innerText = totalPrice
    } else {
        cartTotal.querySelector('.delivery-cost').innerText = '300 р'
        cartTotal.querySelector('.total-price').innerText = totalPrice + 300
    }
}