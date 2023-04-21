import Card from "./components/card"
import { useState, useEffect } from "react"
import styles from "./styles/app.module.css"
import carsJson from "./components/cars.json"
const images = require.context('./components/assets/images/', true, /\.(png|jpg|jpeg|gif)$/);

function App() {
  const [allCards, setAllCards] = useState([]);
  const [activeCard1, setActiveCard1] = useState(null)
  const [activeCard2, setActiveCard2] = useState(null)

  const [correctSelection, setCorrectSelection] = useState(null)

  const [correctCards, setCorrectCards] = useState([])
  const [lastClicked, setLastClicked] = useState([])
  const [timeoutId, setTimeoutId] = useState(null);
  

  // Fisher-Yates algorithm not mine
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  //set cards array and sort
  useEffect(() => {
    setAllCards(carsJson.concat(carsJson));
    setAllCards(cards => shuffle(cards));
  }, []);

  //handleCard
  function handleCardClick(cardIndex) {
    if (activeCard1 === null) {
      setActiveCard1(cardIndex);
      setCorrectSelection(null);
      setLastClicked([])
    } else {
      setActiveCard2(cardIndex);
    }
  }

  //compare cards
  useEffect(() => {
    if (activeCard1 !== null && activeCard2 !== null) {
      const index1 = activeCard1;
      const index2 = activeCard2;
      const card1 = allCards[activeCard1];
      const card2 = allCards[activeCard2];
      if (card1.name === card2.name) {
        setCorrectSelection(true);
        setCorrectCards([...correctCards, index1, index2]);
        setActiveCard1(null);
        setActiveCard2(null);
      } else {
        setCorrectSelection(false);
        setActiveCard1(null);
        setActiveCard2(null);
        setLastClicked([...lastClicked, index1, index2]);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
          setLastClicked([]);
          setTimeoutId(null);
        }, 2000);

        setTimeoutId(newTimeoutId);

      }
    }
  }, [activeCard1, activeCard2, correctCards, allCards, lastClicked]);

  return (
    <div className={styles["container"]}>
      <div className={styles["memory-grid"]}>
        {allCards.map((card, index) => (
          <>
            <Card
              key={index}
              completed={correctCards.includes(index) ? true : false}
              temporarilyVisible={lastClicked.includes(index) || activeCard1 === index || activeCard2 === index}
              onClick={() => handleCardClick(index)}
              imageSrc={require(`./components/assets/images/${card.image}`)}
            >
              {card}
            </Card>
          </>
        ))}
      </div>
      {correctSelection !== null && (
        correctSelection ? (
          <h1 className={styles["correct-message"]}>correct</h1>
        ) : (
          <h1 className={styles["incorrect-message"]}>incorrect</h1>
        )
      )}
    </div>
  );
}

export default App;
