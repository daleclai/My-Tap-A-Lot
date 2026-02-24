import React from 'react';
import './store.css';

export function Store({
  score,
  setScore,
  activeBackground,
  setActiveBackground,
  activeButtonSkin,
  setActiveButtonSkin
}) {
    const [owned, setOwned] = React.useState([]);

    const buttonSkins = [
        { id: 'blue', cost: 100 },
        { id: 'neon', cost: 200 },
        { id: 'gold', cost: 300 },
        { id: 'fire', cost: 500 }
    ];
    
    const backgrounds = [
        { id: 'green', cost: 1000 },
        { id: 'orange', cost: 2000 },
        { id: 'purple', cost: 3000 },
        { id: 'pink', cost: 5000 }
    ];

  function buy(item) {
    if (score < item.cost || owned.includes(item.id)) return;
    setScore(score - item.cost);
    setOwned([...owned, item.id]);
  }

    function resetBackground() {
        setActiveBackground(null);
        localStorage.removeItem('activeBackground');
    }


  return (
    <div className="storebody">
        <div className="storeheader">
            <header>
                <h1>Store</h1>
            </header>
        </div>

    <div className="points_available">
        <p>
            🪙 Scores: <span id="countscore">{score}</span>
        </p>
    </div>

        <div className="buy_buttons">
            <h2>Button Skins</h2>
            <div className="btn_items">
                <div className="btn_items">
  {buttonSkins.map((skin) => (
    <button
      key={skin.id}
      className="options"
      onClick={() =>
        owned.includes(skin.id)
          ? setActiveButtonSkin(skin.id)   
          : buy(skin)                 
      }
    >
      <div className="base">
        <div className={`${skin.id}_button`}></div>
      </div>

      {owned.includes(skin.id)
        ? activeButtonSkin === skin.id
          ? 'Active'
          : 'Apply'
        : skin.cost}
    </button>
  ))}
</div>
            </div>
        </div>

        <div className="buy_backgrounds">
            <h2>Backgrounds</h2>
            <div className  ="back_options">
                <div className="back_options">
  {backgrounds.map((bg) => (
    <button
      key={bg.id}
      className="options"
      onClick={() =>
        owned.includes(bg.id)
          ? setActiveBackground(bg.id)   
          : buy(bg)                  
      }
    >
      <div className={`bg_preview ${bg.id}`}></div>

      {owned.includes(bg.id)
        ? activeBackground === bg.id
          ? 'Active'
          : 'Apply'
        : bg.cost}
    </button>
  ))}
</div>
            </div>
        </div>
    </div>
  )
}
