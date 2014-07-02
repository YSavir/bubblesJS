# BubblesJS

A simple library for creating bubbles.

## Dependencies

None! BubblesJS is written in pure javascript--no need for jQuery or any other libraries.

## Usage

Make a new bubble with `Bubble.make()`.

### Customization

Bubbles can be customized by passing the following parameters:

```javascript
// parameters shown are the defaults
Bubble.make({
  // color
  color: 'pink',
  // the diameter of the bubble in pixels
  size: 100, 
  // the class of the bubble div.
  klass: 'bubble', 
  // the parent element for the bubble div
  parent: document.getElementsByTagName('body')[0], 
  // how many pixels to the right should the bubble be rendered
  offsetX: 0, 
  // how many pixels from the top should the bubble be rendered
  offsetY: 0, 
  // setting to false will make the bubble stationary
  drift: true, 
  // how many pixels up should the bubble drift at a time
  verticalSpeed: 20, 
  // how many pixels to the right or left the bubble should drift at a time
  horizontalSpeed: 20, 
  // how long it takes the bubble to complete a single drift animation
  driftRate: 900 
})
```

## Wishlist

Anyone should feel free to submit a pull request. Here are a couple of features that can be added:

* Allowing a bubble to drift consistently left or right instead of in a random direction.
* Inverting the drift direction (setting the bubble to consistently drift left or right instead of up or down)
* More bubble shapes!
* Anything that strikes your imagination