function save(){
  localStorage.sample= JSON.stringify(sample);
}

function load(){
    let dataStored=JSON.parse(localStorage.sample)
    sample.data=dataStored.database
    sample.setStats()
    sample.duration=dataStored.duration
}
export {save,load}
