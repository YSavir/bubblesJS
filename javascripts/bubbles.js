function Bubble(){
  // append the template to the DOM and save the element as
  // this.bubble
  var _initialize = function(bubble){
    _render.call(bubble);
    // set listener for pop
    bubble.bubble.addEventListener("click", function(){
      _pop.call(bubble);
    });
    // Unless drift is false, call the drfit function corresponding
    // to it's drift.
    if (bubble.drift) {
      _driftBubble.call(bubble);
    }
  }
  var _render = function(){
    this.parent.insertAdjacentHTML('beforeend', _template.call(this));
    this.bubble = this.parent.lastChild
  }
  var _template = function(){
    var bubbleTemplate = [];
    // if (this.url) bubbleTemplate.push('<a href="', this.url, '" target="_blank">');
    // push all standard info
    bubbleTemplate.push('<div style="color:white;background-color:white;',
                          // gradient breakdowns
                          // Firefox
                          'background:-moz-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                          // Chrome, Safari
                          'background:-webkit-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                          // Opera
                          'background:-o-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                          // IE
                          'background:-ms-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                          // Size
                          'width:', this.size + "px",
                          ';height:', this.size + "px",
                          // Positioning
                          ';position:absolute;',
                          'top:', this.offsetY + "px",
                          ';left:', this.offsetX + "px",
                          // border
                          ';border:1px solid #eeeeee;border-radius:1000px;text-align:center;"',
                          // class
                          'class="', this.klass, '">');
    // only add text if it has text
    if (this.text) bubbleTemplate.push('<p>', this.text, '</p>');
    // push div close
    bubbleTemplate.push('</div>');
    // push anchor tag close if bubble has a url
    // if (this.url) bubbleTemplate.push('</a>');
    return bubbleTemplate.join("");
  }
  var _pop = function(){
    var innerBubble = this.bubble
    // make the bubble invisible
    innerBubble.style.background = "none";
    innerBubble.style.border = "none";
    // add that crappy ascii for popping image
    innerBubble.innerHTML = '<div class="popContainer" style="color:black"><div class="baloonPOP">\\</div><div class="baloonPOP">|</div><div class="baloonPOP">/</div><div class="baloonPOP">-</div><div class="baloonPOP">o</div><div class="baloonPOP">-</div><div class="baloonPOP">/</div><div class="baloonPOP">|</div><div class="baloonPOP">\\</div></div>' 
    popContainer = innerBubble.firstChild;
    // set up container of pop ascii
    popContainer.style.width = "90px";
    popContainer.style.height = "90px";
    popContainer.style.position = "relative";
    poppedBubbles = innerBubble.getElementsByClassName('baloonPOP');
    // set up css for each div inside the pop container
    // iterating over object using for(some in something) breaks
    // due to presence of item and namedItem. Is there a way to avoid
    // them, or a better way to iterate other than a for loop?
    for (var i = 0; i < 9; i++){
      poppedBubbles[i].style.width = "30px";
      poppedBubbles[i].style.height = "30px";
      poppedBubbles[i].style.textAlign = "center";
      poppedBubbles[i].style.position = "relative";
      poppedBubbles[i].style.display = "inline-block";
    }
    // remove the bubble entirely
    setTimeout(function(){ innerBubble.parentElement.removeChild(innerBubble); }.bind(this), 100)
  }

  var _driftBubble = function(){
    var innerBubble = this.bubble
    // Moves bubbles every 10 milliseconds.
    // Total starting ticks is driftrate devided by 10.
    var remainingTicks = Math.floor((this.driftRate/10))
    var movementYPerTick = Math.ceil(this.verticalSpeed / remainingTicks)
    // Assign bubble to move left or right randomly (movement to left is negative)
    var movementXPerTick = Math.round(Math.random() * 100) % 2 === 0 ? Math.ceil(this.horizontalSpeed / remainingTicks) : Math.ceil(this.horizontalSpeed / remainingTicks) * -1
    var tick = function(){
      innerBubble.style.top = (parseInt(innerBubble.style.top) - movementYPerTick);
      innerBubble.style.left = (parseInt(innerBubble.style.left) + movementXPerTick);
      remainingTicks-= 1
    }.bind(this)
    // create a promise to track the interval for a single run of ticks
    var runTick = new Promise(function(resolve, reject){
      var tickInterval = setInterval(function(){
        if (remainingTicks > 0){
          tick();
        } else {
          clearInterval(tickInterval);
          resolve();
        }
      }, 10);
    });
    // if the bubble is offscreen, remove it from the DOM
    // NOTE: currently only works for top
    runTick.then(function(){
      if (parseInt(innerBubble.style.top) < -100) {
        innerBubble.parentElement.removeChild(innerBubble);
      } else {
        _driftBubble.call(this);
      }
    }.bind(this))
  }

  Bubble = {
    version: 1.1,
    make: function(options){
      // bubble defaults
      var bubble = {
        size: 100,
        color: "pink",
        klass: 'bubble',
        parent: document.getElementsByTagName('body')[0],
        offsetX: 0,
        offsetY: 0,
        drift: true,
        verticalSpeed: 20, // negative will cause downward drifting
        horizontalSpeed: 20,
        driftRate: 900
      };
      // create a new bubble, set its stats, initialize, and return it
      var newBubble = Object.create(bubble);
      for (option in options){
        newBubble[option] = options[option]
      }
      _initialize(newBubble);
      return newBubble;
    }
  }
}
Bubble()