import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker/locale/en_GB";
import "./../css/Catalogue.css";
import ShoppingCart from "./ShoppingCart";

const ITEMS_PER_PAGE = 6;

const Catalogue = () => {
  const [allCats, setAllCats] = useState([]);
  const [displayCats, setdisplayCats] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [scStyle, setSCStyle] = useState("shoppingCartHidden");
  const [buttonText, setButtonText] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [displayHTML, setDisplayHTML] = useState("<>Loading data</>");

  const setButtons = () => {
    try {
      let arrButtonText = [];
      for (let index = 0; index < ITEMS_PER_PAGE; index++){
          displayCats[index].inBasket
            ? (arrButtonText[index] = "Remove")
            : (arrButtonText[index] = "Add to cart");
      }
      setButtonText([...arrButtonText]);
    } catch (e) {
      console.log(e);
    }
  };

  const showDisplayCats = () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    let index = pageNumber * ITEMS_PER_PAGE;
    if (allCats[index] === undefined) {
      //we need more cats
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?page=${pageNumber}&limit=${ITEMS_PER_PAGE}&size=small&has_breeds=1&api_key=live_ED3UDvCoh1PzVa03jM2uVJgmxVG6rVICzdmxLK3gxZniymcZxVAtfEtUwcoV1Rmu`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }         let data = await response.json();
        let newCats = allCats;
        data.map((cat) => {
          cat.name = faker.name.firstName();
          cat.price = faker.finance.amount(10, 100, 2, "", false);
          cat.inBasket = false;
          cat.index = index;
          newCats[index] = cat;
          index++;
        });
        setAllCats([...newCats]);
      } catch (e) {
        console.log(e);
      }
    }else{//no data, so fire update manually
      showDisplayCats();
    }
  };

  const handlePageForward = () => {
    setPageNumber(pageNumber=>pageNumber+1);
  };

  const handlePageBack = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber=>pageNumber-1);
    }
  };
//useEffect chain...Start/page button => Fetch Data => set cats to be shown => set button text (add/remove from cart) => update screen
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    showDisplayCats();
  }, [allCats]);

  useEffect(() => {
    setButtons();
  }, [displayCats]);

  useEffect(() => {
    setDisplayHTML(showScreen());
  }, [buttonText]);

  useEffect(()=>{
    setDisplayHTML(showScreen());
  }, [scStyle]);

  const openShoppingCart = () => {
    setSCStyle("shoppingCartOpen");
  };

  const closeShoppingCart = () => {
    setSCStyle("shoppingCartHidden");
  };

  const addToCart = (index) => {
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
    //output to session storage for later use by checkout
    sessionStorage.setItem("shoppingCart", JSON.stringify(newCart));
  };

  const handleCartButton = (index, displayIndex) => {
    if ((allCats[index].inBasket === true)) {
      //remove from basket
      let newCart = [];
      let newCats = allCats;
      shoppingCart.map((cat) => {
        if (!cat.id === allCats[index].id) {
          newCart.push(cat);
        }
      });
      setShoppingCart([...newCart]);
      //output to session storage for later use by checkout
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
    let cardIndex = -1;
    try {
      return (
        displayCats &&
        displayCats.length > 0 && (
          <div className="mainDisplayContainer" key="Catalogue">
            <div className="gridBox">
              {displayCats.map((cat) => {                
                cardIndex++;
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
