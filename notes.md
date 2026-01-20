# CS 260 Notes

[My startup - Tap-a-Lot](https://github.com/daleclai/startup.git)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 34.237.100.40
Create EC2, then register domain name, then create a hosted zone to make it run.
In terminal: ssh -i C:\Users\clair\OneDrive\Desktop\cs260\tapalotcs260.pem ubuntu@tapalot.click
vi Caddyfile
save/exit by ESC then :wq
make sure to add sudo service caddy restart
my website: https://tapalot.click/

## Terminal stuff
cd - change directory
mkdir - make a new directory
fetch - latest info about the changes on GitHub without actually changing local repo.
status - differences btw clones
pull - verify you have the latest code
git commit then git push to commit code and add to GitHub
Have 10 commits a assignment

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

### Basic
I learned a lot. I learned to use code in the this format < ></ >. (HINT: type div (or another tag) then click tab for it to auto complete. I further learned about: html (page container), head, title, script(javascript ref), body, header, footer, nav, main, span, h<1-9>, p, b, table, tr(table row), th(table header), td(table data), ol(ordered list), ul(unordered list), li (list item), and many more (refer to helpful links).

I learned how to add an image (img src="image.jpg" alt="BYU  Cougar" width="100" height="100">) and add a hyperlink (a href="https://byu.edu">BYU - what will show up on page</a>).

Some helpful links: [HTML tags](https://developer.mozilla.org/en-US/docs/Web/HTML) and [HTML Standard](https://html.spec.whatwg.org/multipage/).

[Basic HTML example](https://codepen.io/claire_lin123/pen/pvbPpER)

### Inputs
- Label for "text", "password", "email", "textarea", "select", "optgroup", "checkbox" and etc to include inputs from the user.
- For text, password, and email, include "input type=", "id=", "name=", and "placeholder=".  
- For Select and optgroup include "select id=" and "name=", and "option#" or "optgroup label=". 
- For checkbox and radio include "label for=", "input type=", "id=", "name=". and "value=".  
- Input and label type for: file, search, tel, URL, number, etc.  
- [Input Examples](https://codepen.io/claire_lin123/pen/NPrjXep)

  ### Media
- For Youtube video: click "Share" then "Embeded" then copy code right into HTML
  - OR video controls width="300", <source src="video".
- Image: img alt="Name" src="image"
- [Media example](https://codepen.io/claire_lin123/pen/EaymQKJ)
  

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
