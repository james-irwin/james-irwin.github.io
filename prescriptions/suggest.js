function AutoSuggestControl(oTextbox, oTargets, oData) {
    this.textbox = oTextbox;
    this.target = oTargets;
    this.data = oData;
    this.init();
}

lastWord = function(s) {
    var b=s.split(" ");
    var offset=1;
    if (b.length==1) return s;
    while (b[b.length-offset]=="") { offset++; }
    return b[b.length-offset];
}

AutoSuggestControl.prototype.scoreThem = function() {
  var words = this.textbox.value.split(' ');
  for (practice in this.data) {
    this.data[practice].searchScore = 0;
    for (wordID = 0; wordID < words.length; ++wordID) {
        if (this.data[practice].searchText.indexOf(words[wordID] > -1)
        this.data[practice].searchScore ++;
    }
  }
}

AutoSuggestControl.prototype.handleKeyUp = function (oEvent) {
     var iKeyCode = oEvent.keyCode;

     if (iKeyCode !=8 && (iKeyCode < 32 || (iKeyCode >= 33 && iKeyCode <= 46) || (iKeyCode >= 112 && iKeyCode <= 123))) {
        //ignore
    } else {
    this.scoreThem();

    // Search for the words in the text box and score +1 for each
    // match then dump the highest scores in the targets.
    // By taking the maximum score from the set and then knobbling it's score
    // for the next target.
        for (var targetID=0; targetID<this.target.length; targetID++) {
            this.target[targetID].innerHTML = "<h4>" +
                this.textbox.value +
                " <small>" + 'Boom' + targetID + "</small></h4>";
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
        str+=this.data[practice].address[i];
      }
    practice.searchText = str;
  }
  console.log(str);
};
