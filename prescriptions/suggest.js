function AutoSuggestControl(oTextbox, oTargets, oData) {
    this.textbox = oTextbox;
    this.target = oTargets;
    this.data = oData;
    this.init();
}

AutoSuggestControl.prototype.scoreThem = function() {
  var words = this.textbox.value.toUpperCase().split(' ');
  for (practice in this.data) {
    this.data[practice].searchScore = 0;
    for (var wordID = 0; wordID < words.length; wordID++) {
        if (this.data[practice].searchText.indexOf(words[wordID]) > -1) {
          this.data[practice].searchScore = this.data[practice].searchScore + 1;
          console.log(this.data[practice].searchScore + 'for:' + this.data[practice].searchText);
        }
    }
  }
}

AutoSuggestControl.prototype.maxPractice = function() {
  var pname;
  var searchScore=-1;

  for (practice in this.data) {
    if (this.data[practice].searchScore > searchScore) {
        pname=practice;
        searchScore = this.data[practice].searchScore;
    }
  }
  console.log('score ' + searchScore + ' for ' + this.data[pname].searchText);
  return pname;
}

AutoSuggestControl.prototype.handleKeyUp = function (oEvent) {
     var iKeyCode = oEvent.keyCode;

     if (iKeyCode !=8 && (iKeyCode < 32 || (iKeyCode >= 33 && iKeyCode <= 46) || (iKeyCode >= 112 && iKeyCode <= 123))) {
        //ignore
    } else {
    this.scoreThem();
    // Take the maximum scoring practice each time (when you take it, knock out its
    // score so the next one bubbles up
    for (var targetID=0; targetID<this.target.length; targetID++) {
        var maxPractice = this.maxPractice();
        this.target[targetID].innerHTML = "<h4>" +
            this.textbox.value +
            " <small>" + this.data[maxPractice].searchText + ' ' + targetID + "</small></h4>";
        this.data[maxPractice].searchScore = -1;
        }
    }
};

AutoSuggestControl.prototype.init = function () {
    var oThis = this;
    console.log('Hello');
    this.textbox.onkeyup = function (oEvent) {
        if (!oEvent) {
            oEvent = window.event;
        }
        oThis.handleKeyUp(oEvent);
    };
  // Prepare the practice data to concatenate the strings in the names for searching
  for (practice in this.data) {
      var str='';
      for (var i=0; i<this.data[practice].address.length; i++) {
        str+=this.data[practice].address[i] +' ';
      }
    this.data[practice].searchText = str;
  }
  console.log(str);
};
