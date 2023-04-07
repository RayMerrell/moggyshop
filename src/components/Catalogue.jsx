import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker/locale/en_GB";

import "./../css/Catalogue.css";

import ShoppingCart from "./ShoppingCart";

const Catalogue = () => {
    const [allCats, setAllCats] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [shoppingCart, setShoppingCart] = useState([]);
    const [scStyle, setSCStyle]=useState("shoppingCartHidden");

    let intPage=0;
    const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.thecatapi.com/v1/images/search?page="+intPage + "&limit=6&size=small&has_breeds=1&api_key=live_ED3UDvCoh1PzVa03jM2uVJgmxVG6rVICzdmxLK3gxZniymcZxVAtfEtUwcoV1Rmu"
          );
          if (!response.ok) {
            console.log("response not ok");
            throw new Error(response.statusText);
          }
          let data = await response.json();
          data.map((cat) => {
            cat.name = faker.name.firstName();
            cat.price = faker.finance.amount(50, 200, 2, "", false);
          });
          console.log("All Data", data);
          setAllCats(data);
        } catch (err) {
          setErrorMsg(err);
          console.log(errorMsg);
        }
      };

    useEffect(() => {
        fetchData();
    }, [intPage]);

  const addToCart = (id, name, price, url) => {
    console.log("Add to cart", id, name, price, url);
    let newArray = shoppingCart;
    console.log("newArray", newArray);
    let item = {
      id: id,
      name: name,
      price: price,
      image: url,
    };
    newArray.push(item);
    setShoppingCart([...newArray]);
    console.log("Shopping Cart", shoppingCart);
    openShoppingCart();
  };
  const openShoppingCart =()=>{
    setSCStyle("shoppingCartOpen");
    console.log("Opening");
  }
  const closeShoppingCart=()=>{
    console.log("Closing");
    setSCStyle("shoppingCartHidden");
    
  }

  return (
    allCats &&
    allCats.length > 0 && (
      <div className="mainDisplayContainer" key="Catalogue">
        <div className="gridBox">
          {allCats.map((cat) => {
            let strKey = "CatCard" + cat.id;
            let strBreed = cat.breeds[0].name;
            let strPicTitle =
              "Click for information about the " + strBreed + "breed";
            let breed = cat.breeds[0];
            return (
              <div className="shadowCard card small" key={strKey} >
                <div className="card-image waves-effect waves-block waves-light">
                  <div className="imageContainer">
                    <img
                      className="activator mainCatPic"
                      src={cat.url}
                      title={strPicTitle}
                    />
                  </div>
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                    id={cat.id}
                  >
                    {cat.name} the {strBreed} for £{cat.price}{" "}
                    <i className="material-icons right"></i>
                  </span>
                  <p>
                    <button
                      className="addToCart clsRotatingGlow"
                      onClick={() =>
                        addToCart(cat.id, cat.name, cat.price, cat.url)
                      }
                    >
                      Add to cart
                    </button>
                  </p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    {strBreed}
                    <i className="material-icons right">close</i>
                  </span>
                  <p>{breed.temperament}</p>
                  <p>{breed.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <ShoppingCart cartData={shoppingCart} styleData={scStyle} close={() =>closeShoppingCart()} />
        <div className="cataloguePageNavContainer">
            <nav className="pageLeft">Back</nav>  
            <nav className="pageRight">Forward</nav>   
        </div>
        
      </div>
    )
  );
};

export default Catalogue;
