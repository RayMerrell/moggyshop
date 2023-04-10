import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker/locale/en_GB";
import "./../css/Catalogue.css";
import ShoppingCart from "./ShoppingCart";

const ITEMS_PER_PAGE = 6;

const Catalogue = () => {
  const [allCats, setAllCats] = useState([]);
  const [displayCats, setdisplayCats] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);
  const [scStyle, setSCStyle] = useState("shoppingCartHidden");
  const [buttonText, setButtonText] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [displayHTML, setDisplayHTML] = useState("<>Loading data</>");

  const setButtons = () => {
    try {
      console.log("Set buttons");
      let arrButtonText = [];
      for (let index = 0; index < ITEMS_PER_PAGE; index++){
          displayCats[index].inBasket
            ? (arrButtonText[index] = "Remove")
            : (arrButtonText[index] = "Add to cart");
      }
      setButtonText([...arrButtonText]);
      console.log("Button Text", arrButtonText);
    } catch (e) {
      console.log(e);
    }
  };

  const showDisplayCats = () => {
    try {
      console.log("Setting display", displayCats, "from", allCats);
      //update the screen cats
      let arrScreenCats = [];
      let displayIndex=0;
      for (
        let index = pageNumber * ITEMS_PER_PAGE;
        index < pageNumber * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
        index++
      ) {
        arrScreenCats[displayIndex] = allCats[index];
        displayIndex++;
      }
      setdisplayCats([...arrScreenCats]);
      console.log("Display set", arrScreenCats);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    console.log("Fetching data", pageNumber);
    let index = pageNumber * ITEMS_PER_PAGE;
    if (allCats[index] === undefined) {
      //we need more cats
      console.log("We need more cats coz we have", allCats.length);
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?page=${pageNumber}&limit=${ITEMS_PER_PAGE}&size=small&has_breeds=1&api_key=live_ED3UDvCoh1PzVa03jM2uVJgmxVG6rVICzdmxLK3gxZniymcZxVAtfEtUwcoV1Rmu`
        );
        if (!response.ok) {
          console.log("response not ok");
          throw new Error(response.statusText);
        } else {
          console.log("Fetch respononse ok");
        }
        let data = await response.json();
        let newCats = allCats;
        console.log("Data fetched", data);
        data.map((cat) => {
          cat.name = faker.name.firstName();
          cat.price = faker.finance.amount(10, 100, 2, "", false);
          cat.inBasket = false;
          cat.index = index;
          newCats[index] = cat;
          index++;
        });
        console.log("Setting cats to", newCats);
        setAllCats([...newCats]);
        console.log("We now have", allCats);
      } catch (err) {
        setErrorMsg(err);
        console.log(errorMsg);
      }
    }else{//no data, so fire update manually
      showDisplayCats();
    }
    console.log("allCats", allCats);
  };

  const handlePageForward = () => {
    console.log("Page forward", pageNumber);
    setPageNumber(pageNumber=>pageNumber+1);
  };

  const handlePageBack = () => {
    console.log("Page back", pageNumber);    
    if (pageNumber > 0) {
      console.log("Reverse valid, calling stupid fucking shitarse function");
      setPageNumber(pageNumber=>pageNumber-1);
    }
  };

  useEffect(() => {
    console.log("Page fired", pageNumber);
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    showDisplayCats();
  }, [allCats]);

  useEffect(() => {
    setButtons();
  }, [displayCats]);

  useEffect(() => {
    console.log("Button text done, doing showScreen");
    setDisplayHTML(showScreen());
  }, [buttonText]);

  useEffect(()=>{
    setDisplayHTML(showScreen());
  }, [scStyle]);

  const openShoppingCart = () => {
    setSCStyle("shoppingCartOpen");
  };

  const closeShoppingCart = () => {
    console.log("Closing sc");
    setSCStyle("shoppingCartHidden");
  };

  const addToCart = (index) => {
    console.log("Adding to cart", allCats[index]);
    let newCart = shoppingCart;
    let newCats = allCats;
    let cat = allCats[index];
    let item = {
      id: cat.id,
      name: cat.name,
      price: cat.price,
      image: cat.url,
    };
    newCart.push(item);
    newCats[index].inBasket = true;
    setShoppingCart([...newCart]);
    setAllCats([...newCats]);
    sessionStorage.setItem("shoppingCart", JSON.stringify(newCart));
  };

  const handleCartButton = (index, displayIndex) => {
    console.log("Handle Cart Button");
    if ((allCats[index].inBasket === true)) {
      //remove from basket
      console.log("Basket removal in progress");
      let newCart = [];
      let newCats = allCats;
      shoppingCart.map((cat) => {
        if (!cat.id === allCats[index].id) {
          newCart.push(cat);
        }
      });
      setShoppingCart([...newCart]);
      sessionStorage.setItem("shoppingCart", JSON.stringify(newCart));
      newCats[index].inBasket = false;
      setAllCats([...newCats]);
    } else {
      //add to basket
      addToCart(index, displayIndex);
      openShoppingCart();
    }
    setButtons();
  };

  const showScreen = () => {
    console.log("showScreen", buttonText);
    let cardIndex = -1;
    try {
      return (
        displayCats &&
        displayCats.length > 0 && (
          <div className="mainDisplayContainer" key="Catalogue">
            <div className="gridBox">
              {displayCats.map((cat) => {                
                cardIndex++;
                console.log("cat", cat.name);
                let booFound = false;
                let strKey = "CatCard" + cat.id;
                let strBreed = cat.breeds[0].name;
                let strPicTitle =
                  "Click for information about the " + strBreed + "breed";
                let breed = cat.breeds[0];
                booFound = allCats[cat.index].inBasket;
                return (
                  <div className="shadowCard card small" key={strKey}>
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
                          className="addToCart"
                          onClick={() => {
                            handleCartButton(cat.index, cat.displayIndex);
                          }}
                        >
                          {buttonText[cardIndex]}
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
            <ShoppingCart
              cartData={shoppingCart}
              styleData={scStyle}
              close={closeShoppingCart}
            />
            <div className="cataloguePageNavContainer">
              <div className="pageLeft">
                <button onClick={handlePageBack}>Back</button>
              </div>
              <div>{pageNumber}</div>
              <div className="pageRight">
                <button onClick={handlePageForward}>Forward</button>
              </div>
            </div>
          </div>
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  return displayHTML;
};
export default Catalogue;
