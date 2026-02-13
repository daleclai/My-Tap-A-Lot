import React from 'react';
import './ranking.css';

export function Ranking() {
  return (
    <div class="ranking_body">
        <div class="ranking_header">
            <header>
                <h1>Rankings</h1>
            </header>
        </div>

        <div class="jokeAPI">
            <h2><a href="https://sv443.net/jokeapi/v2/">jokeAPI HERE</a></h2>
        </div>

        <div class="ranks">
            <div class="gold row">
                <span class="rank">🏆 1</span>
                <span class="name">PlayerOne</span>
                <span class="score">125,000</span>
            </div>

            <div class="silver row">
                <span class="rank">🏆 2</span>
                <span class="name">PlayerTwo</span>
                <span class="score">110,000</span>
            </div>

             <div class="bronze row">
                <span class="rank">🏆 3</span>
                <span class="name">PlayerThree</span>
                <span class="score">100,000</span>
            </div>

            <div class="rest row">
                <span class="rank">4</span>
                <span class="name">PlayerFour</span>
                <span class="score">90,000</span>
            </div>
        </div>
    </div>
  )
}
