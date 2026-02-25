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
  const userName = localStorage.getItem('userName');

  const buttonSkins = [
    { id: 'blue', cost: 100 },
    { id: 'neon', cost: 200 },
    { id: 'gold', cost: 300 },
    { id: 'fire', cost: 5}
  ];

  const backgrounds = [
    { id: 'green', cost: 1000 },
    { id: 'orange', cost: 2000 },
    { id: 'purple', cost: 3000 },
    { id: 'pink', cost: 5000 }
  ];

React.useEffect(() => {
  if (!userName) return;

  const storedOwned =
    JSON.parse(localStorage.getItem(`owned_${userName}`)) || [];
  setOwned(storedOwned);

  const storedBackground =
    localStorage.getItem(`activeBackground_${userName}`);
  if (storedBackground) setActiveBackground(storedBackground);

  const storedButton =
    localStorage.getItem(`activeButtonSkin_${userName}`);
  if (storedButton) setActiveButtonSkin(storedButton);
}, [userName]);

  React.useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) return;

    localStorage.setItem(`owned_${userName}`, JSON.stringify(owned));
    if (activeBackground) localStorage.setItem(`activeBackground_${userName}`, activeBackground);
    if (activeButtonSkin) localStorage.setItem(`activeButtonSkin_${userName}`, activeButtonSkin);
  }, [owned, activeBackground, activeButtonSkin]);

  React.useEffect(() => {
  if (!userName || score === null) return;
  localStorage.setItem(`score_${userName}`, score);
}, [score, userName]);

React.useEffect(() => {
  if (!userName) return;

  const storedScore =
    parseInt(localStorage.getItem(`score_${userName}`)) || 0;
  setScore(storedScore);
}, [userName]);

  function buy(item) {
    if (score < item.cost || owned.includes(item.id)) return;
    setScore(score - item.cost);
    setOwned([...owned, item.id]);
  }

  function resetBackground() {
    setActiveBackground(null);
    const userName = localStorage.getItem('userName');
    if (userName) localStorage.removeItem(`activeBackground_${userName}`);
  }

  function resetButtonSkin() {
    setActiveButtonSkin(null);
    const userName = localStorage.getItem('userName');
    if (userName) localStorage.removeItem(`activeButtonSkin_${userName}`);
  }

  function buy(item) {
    if (owned.includes(item.id) || score < item.cost) return;
    setScore(prev => prev - item.cost);
    setOwned(prev => [...prev, item.id]);
  }

  return (
    <div className="storebody">
      <div className="storeheader">
        <header>
          <h1>Store</h1>
        </header>
      </div>

      <div className="points_available">
        <p>🪙 Scores: <span id="countscore">{score}</span></p>
      </div>

      <div className="buy_buttons">
        <h2>Button Skins</h2>
        <div className="btn_items">
          {buttonSkins.map((skin) => (
            <button
                key={skin.id}
                className={`options ${owned.includes(skin.id) ? 'owned-btn' : ''}`}
                disabled={!owned.includes(skin.id) && score < skin.cost} 
                onClick={() => {
                  if (owned.includes(skin.id)) {
                    setActiveButtonSkin(skin.id); 
                  } else {
                    buy(skin); 
                  }
                }}
              >
              <div className="base">
                <div className={`${skin.id}_button`}></div>
              </div>

              <div className={`button_label ${owned.includes(skin.id) ? 'owned' : ''} ${activeButtonSkin === skin.id ? 'active' : ''}`}>
                {owned.includes(skin.id)
                  ? activeButtonSkin === skin.id
                    ? 'Active'
                    : 'Owned'
                  : skin.cost}
              </div>
            </button>
          ))}
        </div>
        {activeButtonSkin && (
          <button className="btn btn-primary" onClick={resetButtonSkin}>
            Reset
          </button>
        )}
      </div>

      <div className="buy_backgrounds">
        <h2>Backgrounds</h2>
        <div className="back_options">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              className={`options ${owned.includes(bg.id) ? 'owned-btn' : ''}`} 
                disabled={!owned.includes(bg.id) && score < bg.cost}
              onClick={() => {
                if (owned.includes(bg.id)) {
                  setActiveBackground(bg.id);
                } else {
                  buy(bg); 
                }
              }}
            >
              <div className={`bg_preview ${bg.id}`}></div>

              <div
                className={`button_label
                  ${owned.includes(bg.id) ? 'owned' : ''}
                  ${activeBackground === bg.id ? 'active' : ''}
                `}
              >
                {owned.includes(bg.id)
                  ? activeBackground === bg.id
                    ? 'Active'
                    : 'Owned'
                  : bg.cost}
              </div>
            </button>
          ))}
        </div>

        {activeBackground && (
          <button className="btn btn-primary" onClick={resetBackground}>
            Reset
          </button>
        )}
        
      </div>
    </div>
  );
}