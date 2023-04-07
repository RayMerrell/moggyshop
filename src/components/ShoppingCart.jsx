import "./../css/ShoppingCart.css";

const ShoppingCart = (cartData, styleData, close) => {
  console.log("Style", styleData);
  let cartItems = cartData.cartData;
  let strClass= "ShoppingCart " + styleData;
  return ( 
    cartItems &&
    cartItems.length > 0 && (
      <div className={strClass} id="idShoppingCart" key="shoppingCart">
        {cartItems.map((cat) => {
          console.log("in loop", cat.name);
          return (
            <div className="cartItem">
              <h1>This is a cat</h1>
              <h2>{cat.name}</h2>
              <img src={cat.image} className="CartPic" />
              <p>Price:£{cat.price}</p>
              <button onClick={close}>Close</button>
            </div>
          );
        })}
        <div className="cartTotal">
          <h2>footer</h2>
        </div>
      </div>
    )
  );
};
export default ShoppingCart;
