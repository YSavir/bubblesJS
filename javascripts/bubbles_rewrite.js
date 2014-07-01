var Bubble = {
  version: 0.2,
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
    // add some functionality:
    Object.defineProperties(bubble, {
      // initialization
      initialize: {
        value: function(){
          this.render();
          // set listener for pop
          this.bubble.addEventListener("click", function(){
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
          this.parent.insertAdjacentHTML('beforeend', this.template());
          this.bubble = this.parent.lastChild
        }
      },
      template: {
        value: function(){
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
      },
      pop: {
        value: function(){
          this.bubble.css({
            // make the bubble invisible
            "background": "none",
            "border": "none"
          })
          // add that crappy ascii for popping image
          this.bubble.append('<div class="popContainer" style="color:black"><div class="baloonPOP">\\</div><div class="baloonPOP">|</div><div class="baloonPOP">/</div><div class="baloonPOP">-</div><div class="baloonPOP">o</div><div class="baloonPOP">-</div><div class="baloonPOP">/</div><div class="baloonPOP">|</div><div class="baloonPOP">\\</div></div>')
          popContainers.forEach(function(popContainer){
            popContainer.style.width = "90px";
            popContainer.style.height = "90px";
            popContainer.style.position = "relative";
          })
          // $('.popContainer').css({
          //   "width": "90px",
          //   "height": "90px",
          //   "position": "relative"
          // });
          // assign sizes to the divs from above
          $('.baloonPOP').css({
            "width": "30px",
            "height": "30px",
            "text-align": "center",
            "position": "relative",
            "display": "inline-block"
          });
          // remove the bubble entirely
          setTimeout(function(){ this.bubble.detach() }.bind(this), 100)
        }
      },
      driftBubble: {
        var remainingMovementY = this.directionY;
        var remainingMovementX = this.directionX;
        var tick = function(){
          this.bubble.style.top = 
        }



        // Make that bubble move.
        // Direction along x axis determined randomly each time.
        value: function(){
          var directionY = "-=" + this.verticalSpeed;
          var directionX = "+=" + ((Math.round(Math.random() * 100) % 2 === 0 ? 1 : -1)) * this.horizontalSpeed;
          var makeItDrift = function(){
            var bubbleStyle = this.bubble.style
            bubbleStyle.top = bubbleStyle.top + directionY
            bubbleStyle.left = bubbleStyle.left + directionX
          }
          
          this.bubble.animate({
            top: directionY,
            left: directionX
            },
            this.driftRate,
            "linear",
            // Never let it stop
            function(){
              if (this.bubble.css("top") < -100) {
                this.bubble.detach();
              } else {
                this.driftBubble();
              }
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