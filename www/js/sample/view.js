
function bind(){

  Object.keys(sample.editables).forEach(v=>{
    document.getElementByID(v).addEventListener('change',function(e){
      sample[v]=e.target.value
    })
  })

  Object.keys(sample.actions).forEach(v=>{
    document.getElementByID(v).addEventListener('click',function(e){
      sample[v]()
    })
  })

}


function init(){

    Object.keys(sample.editables).forEach(v=>
    document.getElementByID(v).value=sample[v]
  )

}
