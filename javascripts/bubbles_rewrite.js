var Bubble = {
  make: function(options){
    // bubble defaults
    var bubble = {
      size: "100px",
      color: "pink",
      klass: 'bubble',
      parent: 'body',
      offsetX: "0px",
      offsetY: "0px",
      drift: true,
      verticalDriftRate: 4, // negative will cause downward drifting
      horizontalDriftRate: 4
    };
    // add some functionality:
    Object.defineProperties(bubble, {
      // initialization
      initialize: {
        value: function(){
          this.render();
          // set listener for pop
          $(this.bubble).on("click", function(){
            this.pop();
          }.bind(this));
          // Unless drift is false, call the drfit function corresponding
          // to it's drift.
          if (this.drift) {
            this.driftBubble();
          }
        }
      },
      render: {
        value: function(){
          // append the template to the DOM and save the element as
          // this.bubble
          this.bubble = $(this.template()).appendTo(this.parent);
        }
      },
      template: {
        value: function(){
          var bubbleTemplate = [];

          if (this.url) bubbleTemplate.push('<a href="', this.url, '" target="_blank">');
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
        }
      },
      pop: {
        value: function(){
          var bubble = $(this.bubble);
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
          });
          // remove the bubble entirely
          setTimeout(function(){ bubble.detach() }, 100)
        }
      },
      driftBubble: {
        // Make that bubble move.
        // Direction along x axis determined randomly each time.
        value: function(){
          var directionY = "-=" + 5 * this.verticalDriftRate;
          var directionX = "+=" + (5 * (Math.round(Math.random() * 100) % 2 === 0 ? 1 : -1)) * this.horizontalDriftRate;
          this.bubble.animate({
            top: directionY,
            left: directionX
            },
            900,
            "linear",
            // Never let it stop
            function(){
              this.driftBubble();
            }.bind(this)
          );
        }
      }
    });
    var newBubble = Object.create(bubble);
    for (option in options){
      newBubble[option] = options[option]
    }
    newBubble.initialize();
    return newBubble;
  }
}