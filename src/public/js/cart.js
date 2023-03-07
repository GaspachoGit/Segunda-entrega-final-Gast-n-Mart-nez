const btnRemoveToCart = document.querySelectorAll('.btn-remove-to-cart');


btnRemoveToCart.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const productId = event.target.dataset.productId;
    const url = `http://localhost:8080/api/carts/63f52ce0c1bc48dbebc1caaf/products/${productId}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response =>{
      if(!response.ok){
        throw new Error('Error al eliminar el producto al carrito');
      }
      console.log('Producto agregado al carrito');
    })
    .catch(error => {
      console.error(error);
    });
  })
})
