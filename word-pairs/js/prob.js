var ratio=1.6/3.0;
var dist=function(elements) {
    var index=0;
    var r=Math.random();
    var rangeBottom=ratio;
    while (r>rangeBottom && index<(elements-1)) {
        index++;
        rangeBottom+=(1-rangeBottom)*ratio;
    }
    return index;
}

module.exports.dist=dist;