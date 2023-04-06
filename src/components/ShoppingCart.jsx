const ShoppingCart = (cartData) => {

  console.log(cartData.length);

  if (cartData.length === undefined) {

    return (
      <div className="shoppingCart">
        <h2>Your shopping cart is empty</h2>
      </div>
    )
  } else {
    cartData.map((cat) => {
      return (
        <div className="shoppingCart">
          <h2>Hello World</h2>
        </div>
      );
    });
    return(<h1>Footer</h1>)
  }
}

export default ShoppingCart;
