
Array.prototype.each=function(t){const o=c=>{this[c]&&(t(this[c]),o(++c))};o(0)};
Array.prototype.each_rev=function(t){const o=c=>{this[c]&&(o(c++),t(this[c]))};o(0)};




let arr = [1,2,3,4,5]


arr.each_rev(e => {
  console.log(e)
})







































