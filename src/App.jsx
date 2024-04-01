import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import StatsBlock from "./components/StatsBlock";
import BubbleSelect from "./components/BubbleSelect";

const App = () => {
  const [cardsInfo, setCards] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    cardType: 'All',
    power: 0,
    tough: 0,
  });

  const originalCards = useRef(null);

  const bubbleOptions = ["Any", "1", "2", "3", "4", "5+"];

  // original API call
  useEffect(() => {
    getNewCards().catch(console.error);
  }, [])

  // update if filter is updated
  useEffect(() => {
    const updateCardsDisplay = () => {
      // apply search filter
      let filterSearch = filter.search.length !== 0 ? 
        originalCards.current.filter((card) => 
        card.name.toLowerCase().indexOf(filter.search) !== -1) :
        originalCards.current;
  
      // apply type filter
      if (filter.cardType === "other") {
        filterSearch = filterSearch.filter((card) => 
          card.type.toLowerCase().indexOf("creature") === -1 &&
          card.type.toLowerCase().indexOf("sorcery") === -1 &&
          card.type.toLowerCase().indexOf("enchantment") === -1);
      } else if (filter.cardType !== "all") {
        filterSearch = filterSearch.filter((card) => card.type.toLowerCase().indexOf(filter.cardType) !== -1);
      }
        
      // apply power filter
      filterSearch = filter.power !== 0 ? filterSearch.filter((card) => 
        card.power >= filter.power)
        : filterSearch;
        
      // apply toughness filter
      filterSearch = filter.tough !== 0 ? filterSearch.filter((card) => 
        card.toughness >= filter.tough)
        : filterSearch;
      
      setCards((prevJson) => ({
        ...prevJson,
        cards: filterSearch
      }))
  
    }

    if (cardsInfo) updateCardsDisplay();

    console.log(filter.power, filter.tough);

  }, [filter])

  const getNewCards = async () => {
    const apiURL = "https://api.magicthegathering.io/v1/cards?pageSize=50&random=true";
    const response = await fetch(apiURL);
    const json = await response.json();
    const cards = json.cards;
    // update the cards json
    setCards(prevJson => ({
      ...prevJson,
      cards
    }));
    originalCards.current = cards; // save this to be used during filters
  }

  const calcCards = (type) => {
    let total = 0;
    if (cardsInfo) {
      for(let t = 0; t < cardsInfo.cards.length; t++) {
        if (type === "other" &&
          cardsInfo.cards[t].type.toLowerCase().indexOf("creature") === -1 &&
          cardsInfo.cards[t].type.toLowerCase().indexOf("sorcery") === -1 &&
          cardsInfo.cards[t].type.toLowerCase().indexOf("enchantment") === -1) total++;
        else if (cardsInfo.cards[t].type.indexOf(type) != -1) total++;
      }
    }
    return total;
  }

  const handleFilterChange = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "selectType") {
      setFilter((prevState) => ({
        ...prevState,
        cardType: e.target.value,
      }));
    } else if (e.target.name === 'search') {
      setFilter((prevState) => ({
        ...prevState,
        search: e.target.value.trim().toLowerCase(),
      }));
    } else {
      // update the active index if a select filter was clicked
      const name = e.target.name;
      const start = name.indexOf("-") + 1;
      const end = name.indexOf("-", start);
      const type = name.substring(start, end);
      console.log(`val set: ${name.slice(-1)}`)
      setFilter((prevState) => ({
        ...prevState,
        [type]: name.slice(-1),
      }));

      // updateActiveFilter(type, name.slice(-1));
    }
  }

  // const updateActiveFilter = (target) => {

  //   target.classList.add('active');
  // }

  const refreshCards = () => {
    getNewCards();
    setFilter((prevState) => ({
      ...prevState,
      search: "",
      cardType: "All",
      power: 0,
      tough: 0
    }));
  }

  return (
    <>
      <Header 
        change={handleFilterChange}
        searchVal={filter.search}/>

      <div className="stats-container">
        <StatsBlock 
          type="Total Cards"
          info={cardsInfo ? cardsInfo.cards.length : 0}/>
        <StatsBlock 
          type="Creatures"
          info={calcCards('Creature')}/>
        <StatsBlock 
          type="Sorceries"
          info={calcCards('Sorcery')}/>
        <StatsBlock 
          type="Enchantments"
          info={calcCards('Enchantment')}/>
        <StatsBlock 
          type="Other"
          info={calcCards('other')}/>
      </div>

      <div className="filter-container dash-elem">
        <div className="select-container filter">
          <label htmlFor="selectType" className="filter-label">Card Type</label>
          <br />
          <select name="selectType" id="selectType" onChange={(e) => {handleFilterChange(e)}}>
            <option defaultValue={"all"} value="all" className="select-option">All</option>
            <option value="creature" className="select-option">Creature</option>
            <option value="sorcery" className="select-option">Sorcery</option>
            <option value="enchantment" className="select-option">Enchantment</option>
            <option value="other" className="select-option">Other</option>
          </select>
        </div>
        
        <BubbleSelect 
          label="Minimum Power"
          options={bubbleOptions}
          type="power"
          active={filter.power}
          handleClick={handleFilterChange}
          bOptionClasses = "power"
          classes="filter"/>
        
        <BubbleSelect 
          label="Minimum Toughness"
          options={bubbleOptions}
          type="tough"
          active={filter.tough}
          handleClick={handleFilterChange}
          bOptionClasses = "tough"
          classes="filter"/>

        <div className="refresh-block filter">
          <label htmlFor="refreshBtn filter-label">Refresh Cards</label>
          <button className="refreshBtn" id="refreshBtn" onClick={refreshCards}>
            <FontAwesomeIcon icon={faRotateRight} className="icon"/>
          </button>
        </div>  
      </div>

      <div className="data-body dash-elem">
        <Section 
          header="Name"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.name): null}
          keyInfo="name"/>
        <Section 
          header="Mana Cost"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.manaCost): null}
          keyInfo="mc"/>
        <Section 
          header="Type"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.type): null}
          keyInfo="type"/>
        <Section 
          header="Power"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.power): null}
          keyInfo="power"/>
        <Section 
          header="Toughness"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.toughness): null}
          keyInfo="tough"/>
      </div>
    </>
  );
}

export default App;