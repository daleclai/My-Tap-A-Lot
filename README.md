# Tap a Lot

A game website where you tap a button, earn points for each click, and compete with friends. You can exchange points for different button skins and backgrounds. Create an account (email and name) to store scores and skins and so your name can be ranked on the website. Rankings show ranking, name, and points (diff colors).

## 🚀 Specification Deliverable

### Elevator pitch

Want to play a fun game with friends to compete to see who can tap the most? Then get Tap-a-Lot, a simple, yet fun game about tapping a button and seeing whom among you can do it the most! Tap a lot of times and unlock fun button skins and backgrounds to elevate your experience. Login with your name and email to save your points and skins. See how you rank among oyur friends and everyone who has played before. 

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Design
<img src="tapfirstimage.png" width="200" height="300">
<img src="tapsecondimage.png" width="200" height="300">
<img src="tapthirdimage.png" width="200" height="300">

```mermaid
sequenceDiagram
    actor Bob
    actor Bill
    actor Joe
    actor Website
    Bob->>Website: Bob tap:1000
    Bill->>Website: Bill tap:3050
    Joe->>Website: Joe tap:4444
    Website-->>Bob: 3rd place:1000 
    Website-->>Bill: 2nd place:3030
    Website-->>Joe: 1st place:4444
```

### Key features

- Login over HTTPS
- Each tap adds a point
- Use points to buy button skins and backgrounds (will subtract from total points)
- Ability to store and use bought skins.
- People who create accounts can see other account names, points, and rankings.
- Save points, skins, and ranking using name and email

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Four HTML pages. Use hyperlinks to move between them. One for the main page with the tapping button. Another to view and use the store to buy skins. Another to view rankings. Lastly, one to create/login and see your account.
- **CSS** - Style each page that can be used on different sceens. Uses good styling to look like a game app.
- **React** - Provides login, use points, and save taps as points.
- **Service** - Used for backend such as login accounts, make taps/points functional, rank accourding to points, and adding/subracting points.
- **DB/Login** - Store usernames, points, rankings, and 'skin' images. Accounts saved so people can save their points. 
- **WebSocket** - Every tap is saved and automatically applies to ranking for other users to see. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://tapalot.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I have four pages; the main page, the store, the rankings, and the setting page.
- [x] **Proper HTML element usage** - I added head, header, footer, body, p (paragraph), images, hyperlinks, buttons and div classes so i can easily define sections and refer to them in CSS. In my settings, i included inputs for email and passwords.
- [x] **Links** - I included hyperlinks to get between the pages. And as a placeholder, included a hyperlink to set up my 3rd party API. I also included a hyperlink to my Github repo.
- [x] **Text** - I included text as a place holder for rankings and to show points. I made sure to include a header and footnotes.
- [x] **3rd party API placeholder** - On my rankings page, I plan to place a box with random jokes(called jokeAPI) above the rankings.
- [x] **Images** - For my button nav bars, I included images for each button.
- [x] **Login placeholder** - In my Settings page, I included a login/password. 
- [x] **DB data placeholder** - In my rankings, I plan to include DB to store player points and accounts. 
- [x] **WebSocket placeholder** - In my rankings, I plan to continuously update the rankings and when they receive their points. 

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - Yes, I used linear gradient to make the background visually appealing. 
- [x] **Use of a CSS framework** - yes, I used Bootstrap to stylize the settings create/login buttons.
- [x] **All visual elements styled using CSS** - I used font color/sizes, margins, padding, width/height, position, display, background, flex-direction,align-item, box-shadow, border, border-radius, different transformations, and linear gradients.
- [x] **Responsive to window resizing using flexbox and/or grid display** - I stays visually appealling, even on different devices. 
- [x] **Use of a imported font** - i used Kalam and Cherry Bomb fonts from google. 
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used selectors like body, h1, classes, ID< and pseudo selectors. 

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
>>>>>>> 34c270209bca0337593fa7dc5a00a25c65baa827
