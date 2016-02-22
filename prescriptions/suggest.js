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
  return pname;
}

AutoSuggestControl.prototype.practicename = function(practice, sep) {
  var str='';
  for (var i=0; i<this.data[practice].address.length-1; i++) {
    str+=this.data[practice].address[i] + sep;
  }
  str+=this.data[practice].address[i];

  return str;
}

AutoSuggestControl.prototype.oldtopscripts = function(practice) {
  var str='<ul>';
  for (var i=0; i<this.data[practice].list.length; i++) {
    if (bnfdecode[this.data[practice].list[i]] != undefined)
      str+='<li>' + bnfdecode[this.data[practice].list[i]];
  }
  str+='<ul>';

  return str;
}

AutoSuggestControl.prototype.drawChart = function(practice, id) {

        var data = google.visualization.arrayToDataTable([
          ['', '', '', '', '', '', '', '', '', '', ''],
          ['2014',  10, 9, 6, 8, 7, 3, 4, 5, 2, 0],
          ['2015',  10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        ]);

        var options = {
          chartArea: {left:30, top:0},
          legend: { position: 'none' },
          series: {0: {targetAxisIndex:1}},
          vAxes: {0:{gridlines:{count:0, color:'#fff'}},
                  1:{
                  gridlines:{count:10, color:'#fff'},
                  textPosition:'in',
                  ticks: [{v:0,f:''},
                          {v:1.5, f:'Other Food For Special Diet Preps'},
                          {v:2.5, f:'Levothyroxine Sodium'},
                          {v:3.5, f:'Metformin Hydrochloride'},
                          {v:4.5, f:'Lactulose'},
                          {v:5.5, f:'Alginic Acid Compound Preparations'},
                          {v:6.5, f:'Gluten Free Bread'},
                          {v:7.5, f:'Paracetamol'},
                          {v:8.5, f:'Co-Codamol (Codeine Phos/Paracetamol)'},
                          {v:9.5, f:'Other Emollient Preps'},
                          {v:10.5, f:'Enteral Nutrition'}
                         ],
                    }
                  },
          hAxis: {
                  viewWindow: {min:0.5,max:3}
                 }
        };

        var chart = new google.visualization.LineChart(
                        document.getElementById('chart'+id));

        chart.draw(data, options);

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
        this.target[targetID].innerHTML = '<div class="well"><strong>' +
            this.practicename(maxPractice, '<br>') +
            '<span class="map"><a href="https://www.google.co.uk/maps/place/' +
            this.data[maxPractice].latlng.lat + '+' +
            this.data[maxPractice].latlng.lng + '/@' +
            this.data[maxPractice].latlng.lat + ',' +
            this.data[maxPractice].latlng.lng + ',' +
            '16z">Map</a></span></strong></div>' +
            '<div id="chart' + targetID +
            '" style="width: 500px; height: 450px"></div>';
        this.data[maxPractice].searchScore = -1;
        this.drawChart(maxPractice, targetID);
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
  // Prepare the practice data to concatenate the strings in the names for searching
  for (practice in this.data) {
      var str='';
      for (var i=0; i<this.data[practice].address.length; i++) {
        str+=this.data[practice].address[i] +' ';
      }
    this.data[practice].searchText = str;
  }
};
