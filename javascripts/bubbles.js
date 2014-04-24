var bubbles = {
  models: {
    bubble: {
      size: "100px",
      color: "pink",
      text: null,
      drift: "up",
      parent: 'body',
      offsetX: "0px",
      offsetY: "0px",
      klass: 'bubble',
      initialize: function(){
        var model = this;
        model.render()
        $(model.bubble).on("click", function(){
          model.pop();
        })
        if (this.drift) {
          if (this.drift != "float") this.driftBubble();
        }
      },
      render: function(){
        // $('body').append(this.template());
        this.bubble = $(this.template()).appendTo(this.parent);
      },
      template: function(){
        var bubbleTemplate = []
        // push anchor tag if the bubble has a url
        // add url validation at some point
        if (this.url) bubbleTemplate.push('<a href="', this.url, '" target="_blank">');
        // push all standard info
        bubbleTemplate.push('<div style="color:white;background-color:white;',
                              // gradient breakdowns
                              // should add browser detection, etc
                              // Firefox
                              'background:-moz-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                              // Chrome, Safari
                              'background:-webkit-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                              // Opera
                              'background:-o-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                              // IE
                              'background:-ms-radial-gradient(35% 35%, circle cover, #ffffff 0%, ', this.color, ' 25%, ', this.color, ' 60%, #ffffff 80%);',
                              // Size
                              'width:', this.size,
                              ';height:',this.size,
                              // Positioning
                              ';position:absolute;',
                              'top:', this.offsetY,
                              ';left:', this.offsetX,
                              // border
                              ';border:1px solid #eeeeee;border-radius:1000px;text-align:center;"',
                              // class
                              'class="', this.klass, '">');
        // only add text if it has text
        if (this.text) bubbleTemplate.push('<p>', this.text, '</p>');
        // push div close
        bubbleTemplate.push('</div>');
        // push anchor tag close if bubble has a url
        if (this.url) bubbleTemplate.push('</a>');
        return bubbleTemplate.join("");
      },
      pop: function(){
        var bubble = $(this.bubble)
        bubble.css({
          // make the bubble invisible
          "background": "none",
          "border": "none"
        })
        // add that crappy ascii for popping image
        bubble.append('<div class="popContainer" style="color:black"><div class="baloonPOP">\\</div><div class="baloonPOP">|</div><div class="baloonPOP">/</div><div class="baloonPOP">-</div><div class="baloonPOP">o</div><div class="baloonPOP">-</div><div class="baloonPOP">/</div><div class="baloonPOP">|</div><div class="baloonPOP">\\</div></div>')
        $('.popContainer').css({
          "width": "90px",
          "height": "90px",
          "position": "relative"
        });
        // assign sizes to the divs from above
        $('.baloonPOP').css({
          "width": "30px",
          "height": "30px",
          "text-align": "center",
          "position": "relative",
          "display": "inline-block"
        })
        // remove the bubble entirely
        setTimeout(function(){ bubble.detach() }, 100)
      },
      driftBubble: function(){
        var self = this;
        // the "floating" drift has a different animation
        // ....which I'll definitely make some day
        // ....because this is such a critical project
        // ....not at all a silly waste of my time
        if (self.drift != "float") {
          // If it's going up, remove pixels from it's top css
          var directionY = this.drift == "up" ? "-=20" : "+=20"
          // randomly determine whether bubble goes left or right
          var directionX = Math.round(Math.random() * 100) % 2 == 0 ? "-=20" : "+=20"
          self.bubble.animate({
            top: directionY,
            left: directionX
          },
          900,
          "linear",
          // do it again!
          function(){
            self.driftBubble();
          });
        }
      }
    }
  },
  bubble: function(options){
    // If the user didn't provide an options hash, set it to empty
    if (!options) options = {}
    // Check each possible parameter, and if the user specified a value for it, add configuration/writable
    if (options["size"]) options["size"] = {configurable: true, value: options["size"]}
    if (options["color"]) options["color"] = {configurable: true, value: options["color"]} 
    if (options["drift"]) options["drift"] = {configurable: true, value: options["drift"]}
    if (options["klass"]) options["klass"] = {configurable: true, value: options["klass"]}
    if (options["parent"]) options["parent"] = {configurable: true, value: options["parent"]}
    if (options["offsetX"]) options["offsetX"] = {configurable: true, value: options["offsetX"]}
    if (options["offsetY"]) options["offsetY"] = {configurable: true, value: options["offsetY"]}
    if (options["text"]) options["text"] = {writable: true, value: options["text"]}
    if (options["url"]) options["url"] = {writable: true, value: options["url"]}
    // blow the bubble
    var newBubble = Object.create(bubbles.models.bubble, options)
    // initialize the blown bubble
    newBubble.initialize();
    // it's nice to return things
    return newBubble
  }
}