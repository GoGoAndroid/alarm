const array_extensions={


 min:function (array){ return  array.reduce((acc,v,i)=> acc>v?v:acc  ,array[0])},

 max:function(array) {  return array.reduce((acc,v,i)=> acc<v?v:acc,array[0]  )},
 amplitude:function (array) {return this.max(array)-this.min(array)},
 distance:function(array1,array2){ return Math.sqrt (
            array1.reduce(
              (acc,v,i)=>[ acc[0]+ Math.pow(v-acc[1][i],2) ,acc[1]]
              ,[0,array2]
            )[0])
},
similar: function(array1,array2) { return  this. distance(array1,array2)< this.amplitude(array1)/100;},
similarSquare: function(array1,array2) {
    return true
        && (Math.abs( this.min(array1) - this.min(array2) ) < this.min(array1) /100)
        && (Math.abs( this.max(array1) - this.max(array2) ) < this.max(array1) /100)
        && (Math.abs(  this.amplitude(array1) -  this.amplitude(array1) ) < this.amplitude(array1) /100)
      ;
    },

fastsimilarArray:function (array1,array2){ this.similar(array1.slice(0,3),array2  ) && this.similar(array1,array2) ;}

};
//export { array_extensions };
