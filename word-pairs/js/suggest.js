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

AutoSuggestControl.prototype.handleKeyUp = function (oEvent) {
     var iKeyCode = oEvent.keyCode;

     if (iKeyCode !=8 && (iKeyCode < 32 || (iKeyCode >= 33 && iKeyCode <= 46) || (iKeyCode >= 112 && iKeyCode <= 123))) {
        //ignore
    } else {
        var typed_word=lastWord(this.textbox.value.toLowerCase().replace(/[^\w\s]|_/g, "")); // Replace depunctuates
        for (var targetID=0; targetID<this.target.length; targetID++) {
            var word=typed_word; // Reinitialise for each suggester
            var totalSuggestion="";
            for (var suggestionDepth=3; suggestionDepth>0; suggestionDepth--) {
                var suggestion="";
                if (word != undefined  && word !="" && this.data[targetID][word] != undefined) {
                    var index=dist(this.data[targetID][word].length-1);
                    suggestion=this.data[targetID][word][index];
                    }
                    if (typeof(suggestion) != "undefined") {
                        word = lastWord(suggestion);
                        totalSuggestion+=" " + suggestion;
                    }
                }
            this.target[targetID].innerHTML = "<h4>" +
                this.textbox.value.substring(this.textbox.value.length-20,
                                             this.textbox.value.length) +
                " <small>" + totalSuggestion + "</small></h4>";
        }
    }
};

AutoSuggestControl.prototype.init = function () {
    var oThis = this;
    this.textbox.onkeyup = function (oEvent) {
        if (!oEvent) {
            oEvent = window.event;
        }
        oThis.handleKeyUp(oEvent);
    };
};
