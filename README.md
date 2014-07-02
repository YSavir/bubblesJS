# BubblesJS

A simple library for creating bubbles.

## Dependencies

None! BubblesJS is written in pure javascript--no need for jQuery or any other libraries.

## Usage

To make a new bubble, use `Bubble.make({})`.

### Customization

Bubbles can be customized by passing the following parameters:

```javascript
// parameters shown are the defaults
Bubble.make({
  color: 'pink',

  size: 100, // the diamter of the bubble in pixels

  klass: 'bubble', // the class of the bubble div.

  parent: document.getElementsByTagName('body')[0], // the parent element for the bubble div

  offsetX: 0, // how many pixels to the right should the bubble be rendered

  offsetY: 0, // how many pixels from the top should the bubble be rendered

  drift: true, // setting to false will make the bubble stationary

  verticalSpeed: 20, // how many pixels up should the bubble drift at a time

  horizontalSpeed: 20, // how many pixels to the right or left the bubble should drift at a time

  driftRate: 900 // how long it takes the bubble to complete a single drift animation
})
```

## Wishlist

Anyone should feel free to submit a pull request. Here are a couple of features that can be added:

* Allowing a bubble to drift consistently left or right instead of in a random direction.
* Inverting the drift direction (setting the bubble to consistently drift left or right instead of up or down)
* More bubble shapes!
* Anything that strikes your imagination