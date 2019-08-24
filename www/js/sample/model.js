let sample={

  data:[],
  duration:10000,
  avarage:0,
  min:0,
  max:0,
  sampling:false,

  editables={
    duration:'numeric'
  }
  action:[


  ]

  start:function(duration){
      sample.duration=duration;
      sample.sampling:true;
      setTimeout(function(){
        sample.sampling=false;
        sample.SetStats();
      },duration);
  },

  add:function(db){
        sample.data.push(db);
  },
  setStats:function(db){
      sample.data.average=data.sample.reduce((a,v)=>v+a,0)/sample.data.sample.length;
      sample.data.min=data.sample.reduce((a,v)=>v<a<v:a,sample.data.sample[0]);
      sample.data.max=data.sample.reduce((a,v)=>v<a>v:a,sample.data.sample[0]);
  },


}

export {model}
