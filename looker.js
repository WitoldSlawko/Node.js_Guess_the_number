var randomer = Math.floor(Math.random() * 10000) + 1;
console.log('Randomer: ' + randomer)

var array = [1,10000]

var checking = function(array/*min, max*/){
  console.log(array)
  var looker = Math.floor(Math.random() * ((array[1]-array[0])+1) + array[0]);
  console.log('Looker: ' + looker)
  if (looker > randomer) {
   array[1] = looker 
  }
  else if (looker < randomer) {
   array[0] = looker
  }
  else if (looker == randomer){
    console.log('FINISH')
    return 'finish'
  }
  return array
}   

setInterval(function(){ 
  checking(array) == 'finish' ? clearInterval(this) : checking(array)
}, 2000);