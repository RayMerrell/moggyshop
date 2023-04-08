import "./../css/ShoppingCart.css";

const ShoppingCart = ({cartData, styleData, close}) => {

  let strClass= "ShoppingCart " + styleData;
  return ( 
    cartData &&
    cartData.length > 0 && (
      <div className={strClass} id="idShoppingCart" key="shoppingCart">
        {cartData.map((cat) => {
          
          let strKey="cartItem"+cat.id;
          return (
            <div className="cartItem" key={strKey}>
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
