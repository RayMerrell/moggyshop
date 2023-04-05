import "./App.css";
import CatCard from "./components/CatCard";
import { useState, useEffect } from "react";

function App() {
  const [allCats, setAllCats] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=2&has_breeds=1&api_key=live_ED3UDvCoh1PzVa03jM2uVJgmxVG6rVICzdmxLK3gxZniymcZxVAtfEtUwcoV1Rmu"
        );
        if (!response.ok) {
          console.log("response not ok");
          throw new Error(response.statusText);
        }
        let data = await response.json();
        setAllCats(data);
        moggyArray = data;
        console.log("MoggyArray", moggyArray);
      } catch (err) {
        setErrorMsg(err);
        console.log(errorMsg);
      }
    };
    fetchData();
  }, []);

  if ((allCats === undefined) | (allCats === [])) {
    return <>Loading...</>;
  } else {
      return (
        <div className="App">
          {allCats.map((cat) => {
            return (
              <CatCard
                key={cat.id}
                url={cat.url}
                name={cat.breeds[0].name}
                country={cat.breeds[0].origin}
                temperament={cat.breeds[0].temperament}
              />
            );
          })}
        </div>
    );
  }
}
export default App;
