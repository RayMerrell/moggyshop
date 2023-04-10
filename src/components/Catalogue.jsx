import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker/locale/en_GB";

import "./../css/Catalogue.css";

import ShoppingCart from "./ShoppingCart";

const Catalogue = () => {
    const [allCats, setAllCats] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [shoppingCart, setShoppingCart] = useState([]);
    const [scStyle, setSCStyle]=useState("shoppingCartHidden");
    const [buttonText, setButtonText]=useState([]);

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
          setAllCats(data);
          let newArray=[];
          for(let x=0;x<6;x++){
            newArray.push("Add to cart");
          }
          setButtonText([...newArray]);          
        } catch (err) {
          setErrorMsg(err);
          console.log(errorMsg);
        }
      };

    useEffect(() => {
        fetchData();
    }, [intPage]);

  const addToCart = (id, name, price, url, count) => {
    let newArray = shoppingCart;
    let item = {
      id: id,
      name: name,
      price: price,
      image: url,
    };
    newArray.push(item);
    setShoppingCart([...newArray]);
    newArray=buttonText;
    console.log("Count", count);
    newArray[count]="Remove"; 
    setButtonText([...newArray]);
    openShoppingCart();
  };
  const removeFromCart=(id, count)=>{
    let newCart=[];
    shoppingCart.map(cat=>{
      if(!cat.id === id){
        newCart.push(cat);
      }
    });
    setShoppingCart([...newCart]);
    let newArray=buttonText;
    newArray[count]="Add to cart"; 
    setButtonText([...newArray]);
  }
  const openShoppingCart =()=>{
    setSCStyle("shoppingCartOpen");
  }
  const closeShoppingCart=()=>{
    setSCStyle("shoppingCartHidden");
    
  }
  let cardCounter=0;
  return (
    allCats &&
    allCats.length > 0 && (
      <div className="mainDisplayContainer" key="Catalogue">
        <div className="gridBox">
            {allCats.map((cat) => {
            let booFound=false;
            let strKey = "CatCard" + cat.id;
            let strBreed = cat.breeds[0].name;
            let strPicTitle =
              "Click for information about the " + strBreed + "breed";
            let breed = cat.breeds[0];
            cardCounter++;
            let CardNumber=(cardCounter%6)-1;//if i just used the counter, it always returned the highest value???
            shoppingCart.map(cartCat=>{
              if (cat.id === cartCat.id){
                booFound = true;
              }
            })
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
                    {!booFound?
                          <button
                            className="addToCart clsRotatingGlow"
                            onClick={() => {
                              addToCart(cat.id, cat.name, cat.price, cat.url, CardNumber);
                            }}
                          >
                            {buttonText[CardNumber]}
                        </button>
                      :
                        <button
                          className="addToCart clsRotatingGlow"
                          onClick={() => {
                              removeFromCart(cat.id, CardNumber);
                          }}>
                          {buttonText[CardNumber]}
                        </button>
                      }
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
        <ShoppingCart cartData={shoppingCart} styleData={scStyle} close={closeShoppingCart} />
        <div className="cataloguePageNavContainer">
            <nav className="pageLeft">Back</nav>  
            <nav className="pageRight">Forward</nav>   
        </div>
        
      </div>
    )
  );
};
export default Catalogue;
