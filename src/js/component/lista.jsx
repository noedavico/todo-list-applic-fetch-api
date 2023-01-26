import React, {useState, useEffect}  from "react";

const Lista = () => {
  const [tarea, settarea] = useState("");
  const [arrayTareas, setArrayTareas] = useState ([]);
  
  
   //1 PASO creo mi usuario   
  function crearUsuario () {
  fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },  
      //body: JSON.stringify(data)
      body: JSON.stringify([]) // body data type must match "Content-Type" header
  })//busca la info en la url pasada como valor
  .then((response)=>response.json())//esta linea convierte la respuesta en un json
  .then((data)=> {if (data.result === "ok") {getTarea()} 
  console.log(data)})//esta linea guarda la info transformada en un objeto en data
  .catch((err)=>console.log(err))//el catch te comunica si algo salió mal
}


  // 2 PASO REALIZO EL GET PARA LEER LA INFORMACION
 function getTarea () {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87',{
			method: 'GET', // *GET, POST, PUT, DELETE, etc.	
		})//busca la info en la url pasada como valor
		.then((response) => {console.log(response.status);
    if (response.status === 404) {crearUsuario()} //ERROR 404 usuario no existe llama a la funcion para crearlo
    return response.json()})//esta linea convierte la respuesta en un json
		.then((data)=>setArrayTareas(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
  }

// cuando se carga la pagina lee infomrmacion al estar vacio el array 
  useEffect(() => {
   getTarea()
  },[])

  //3 HAGO UN PUT PARA ACTUALIZAR LA INFORMACION
const actualizarTarea = () => {
fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87', {
  method: 'PUT', // or 'POST'
  body: JSON.stringify(arrayTareas), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then((response)=>response.json())
.then(arrayTareas => console.log( JSON.stringify(arrayTareas)))
.catch(error => console.error('Error:', error));
}

//funcion esta atenta si el arrayTarea cambia ejecuta el put
useEffect(() => {
  if (arrayTareas.length > 0 ) {
    actualizarTarea(arrayTareas);
  }
}, [arrayTareas]);
 
//fetch borrar todo 
function deleteTarea () {
fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87', {
      method: 'DELETE',
})
.then(response => response.json())
.then(response=> {
      console.log(response);
});
}


//funcion agregar tarea 
  const agregartarea = () => {
    setArrayTareas ([...arrayTareas, { label: tarea, done: false }])
    settarea("")
  }

//funcion borrar tarea
const handleDelete = (borrarTarea) => {
  const newArray = arrayTareas.filter((item) => item !== borrarTarea);
  setArrayTareas(newArray);
}

  return (
  <div className="boxbig container container col-xs-8 col-sm-6 col-md-8 ">
    <p className="text-danger  fs-1 text-center "> Lista de tareas </p>
   <div className="input-group col-xs-8 col-sm-6 col-md-8 ">

  
   <input type="text" name="tarea"
   className="form-control" 
   placeholder="Escribir tarea" 
   onChange={(e) => settarea(e.target.value)}
	 value={tarea}
   required/>
 

   <button className="btn btn-outline-secondary" 
   type="button" 
   id="button-addon2" 
   onClick={agregartarea}>Agregar</button>

      </div>
        <ul className="list-group glow" > {arrayTareas.length > 0 ?  arrayTareas.map((item, index) => 
          <li className="list-group-item glow d-flex " key={index}> <span style={{width:"95%"}}>{item.label} </span>
            <button className="btn btn-outline-secondary " type="button"  onClick={ () => handleDelete(item)}>x</button>
           </li>
           ) : null } 
           </ul>
      <div><button className="btn btn-outline-secondary m-2" 
   type="button" 
   id="button-addon2" 
   onClick={deleteTarea}>Borrar todo</button>
   </div>
</div>
  );
};

export default Lista;