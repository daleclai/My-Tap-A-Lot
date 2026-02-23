import React from 'react';
import './store.css';

export function Store() {
  return (
    <div class="storebody">
        <div class="storeheader">
            <header>
                <h1>Store</h1>
            </header>
        </div>

    <div class="points_available">
        <p>
            🪙 Scores: <span id="countscore">0</span>
        </p>
    </div>

        <div class="buy_buttons">
            <h2>Button Skins</h2>
            <div class="btn_items">
                <button class="options">
                    <div class="base">
                        <div class="blue_button"></div>
                    </div>
                    100
                </button>

                <button class="options">
                    <div class="base">
                        <div class="neon_button"></div>
                    </div>
                    200
                </button>

                <button class="options">
                    <div class="base">
                        <div class="gold_button"></div>
                    </div>
                    300
                </button>
                <button class="options">
                    <div class="base">
                        <div class="fire_button"></div>
                    </div>
                    500
                </button>
            </div>
        </div>

        <div class="buy_backgrounds">
            <h2>Backgrounds</h2>
            <div class="back_options">
                <button class="options">
                        <div class="bg_preview green"></div>
                    1000
                </button>
                <button class="options">
                    <div class="bg_preview orange"></div>
                    2000
                </button>
                <button class="options">
                    <div class="bg_preview purple"></div>
                    3000
                </button>
                <button class="options">
                    <div class="bg_preview pink"></div>
                    5000
                </button>
            </div>
        </div>
    </div>
  )
}
