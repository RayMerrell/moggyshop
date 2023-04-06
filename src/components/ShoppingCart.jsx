const ShoppingCart = (cartData) => {

const ShoppingCart= ({cartData}) => {
  console.log("arraylength", cartData.length);
  console.log("input", cartData);
  if (cartData.length===undefined){
    return(
      <div className="shoppingCart">
        <h2>Your shopping cart is empty</h2>
      </div>
    )
  }else{
    cartData.map((cat) => {
      console.log("in loop", cat.name);
      return (
        <div className="shoppingCart">
          <h1>This is a cat</h1>
          <h2>{cat.name}</h2>
          <img src={cat.image} />
          <p>Price:£{cat.price}</p>
        </div>
      );      
    });
    return (<div><h2>footer</h2></div>);
  }
}      

export default ShoppingCart;
