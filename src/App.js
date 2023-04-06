import "./App.css";
import CatCard from "./components/CatCard";
import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker/locale/en_GB'

function App() {
  const [allCats, setAllCats] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [shoppingCart, setShoppingCart]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=6&size=small&has_breeds=1&api_key=live_ED3UDvCoh1PzVa03jM2uVJgmxVG6rVICzdmxLK3gxZniymcZxVAtfEtUwcoV1Rmu"
        );
        if (!response.ok) {
          console.log("response not ok");
          throw new Error(response.statusText);
        }
        let data = await response.json();
        setAllCats(data);
        console.log("All Data", data);
      } catch (err) {
        setErrorMsg(err);
        console.log(errorMsg);
      }
    };
    fetchData();
  }, []);

 const addToCart=(id, name, price, url)=>{
  console.log("Add to cart", id, name, price, url);
  let newArray=shoppingCart;
  console.log("newArray", newArray);
  let item={
    id:id,
    name:name,
    price:price,
    image:url
  }
  newArray.push(item);
  setShoppingCart([...newArray]);
  console.log(shoppingCart);

 }
  if ((allCats === undefined) | (allCats === [])) {
    return <>Loading...</>;
  } else {
      return (
        <div className="App">
          <div className="gridBox">
            {allCats.map((cat) => {
              return (
                <CatCard
                  key={cat.id}
                  id={cat.id}
                  url={cat.url}
                  name={faker.name.firstName()}
                  breed={cat.breeds[0].name}
                  country={cat.breeds[0].origin}
                  temperament={cat.breeds[0].temperament}
                  description={cat.breeds[0].description}
                  price={faker.finance.amount(50, 200, 2, '£', true)}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </div>
    );
  }
}
export default App;
