const json_2_html={

 is_array:(o)=> Array.isArray(o),
 is_object:(o)=> !Array.isArray(o) && typeof o === 'object',
 is_array_of_similar_objects:function(a){
    return json_2_html.is_array(a)
       &&  a.every( o =>   json_2_html.is_object(o)  )
       &&  a.every ( o => Object.keys(a[0]).every ( k => o.hasOwnProperty(k))  );
     },


array_2_html:(array)=>{
  return  array.reduce( (acc,v) => `${acc}
    <li>${json_2_html.data_json(v)}</li>` , '<ul>')+`</ul>
    `;
},

object_2_html:(object)=>{

  return Object.keys(object).reduce( (acc,key)  => {
      if (json_2_html.is_object(object[key]) || json_2_html.is_array(object[key]) )
        return `${acc}  <li><details open><summary>${key}</summary>${json_2_html.data_json(object[key])}</details></li>`
      else return `${acc} <li> ${key} : ${object[key]}`
      },'<ul>')
      +`</ul>`
},


//array_of_similar_objects_2_html:(array_of_similar_objects_object)=>{
//    let keys=Object.keys(array_of_similar_objects_object[0])
//    return '<table><thead><tr>'
//        + keys.reduce((acc,key)=>`${acc}<th>${key}</th>` , '<tr>')+'</tr></thead><tbody>'
//        + array_of_similar_objects_object.reduce( (acc,row)  =>  `${acc}
//          <tr>`+keys.reduce( (acc,key)=> `${acc}<td>${json_2_html.data_json(row[key])}</td>`,'')+"</tr>")
//        +"</tbody></table>"
//},


data_json:(data)=>{
  if (json_2_html.is_array_of_similar_objects(data)) return json_2_html.array_2_html(data)
  else if (json_2_html.is_array(data)) return json_2_html.array_2_html(data)
  else if  (json_2_html.is_object(data)) return json_2_html.object_2_html(data)
  else return ''+data
  }

};

module.exports = json_2_html


//if (process.argv[2])
//  console.log(json_2_html.data_json(JSON.parse(process.argv[2])))
