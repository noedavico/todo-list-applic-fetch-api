import React, {useState, useEffect}  from "react";

const Lista = () => {
  const [tarea, settarea] = useState("");
  const [arrayTareas, setArrayTareas] = useState ([]);
  

  //1 PASO creo mi usuario 

  // fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87',{
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },  
  //     //body: JSON.stringify(data)
  //     body: JSON.stringify([]) // body data type must match "Content-Type" header
  // })//busca la info en la url pasada como valor
  // .then((response)=>response.json())//esta linea convierte la respuesta en un json
  // .then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto en data
  // .catch((err)=>console.log(err))//el catch te comunica si algo salió mal


  // 2 PASO REALIZO EL GET PARA LEER LA INFORMACION
 function getTarea () {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87',{
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: { 'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  },	
		})//busca la info en la url pasada como valor
		.then((response)=>response.json())//esta linea convierte la respuesta en un json
		.then((data)=>setArrayTareas(data))//esta linea guarda la info transformada en un objeto
		.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
  }

  useEffect(() => {
   getTarea()
  },[])

  //3 HAGO UN PUT PARA ACTUALIZAR 
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


useEffect(() => {
  if (arrayTareas.length > 0 ) {
    actualizarTarea(arrayTareas);
  }
}, [arrayTareas]);
 
function deleteTarea () {
fetch('https://assets.breatheco.de/apis/fake/todos/user/noedavico87', {
      method: 'DELETE',
})
.then(res => res.json())
.then(res=> {
      console.log(res);
});
}

  //funcion atada a un evento cuando cambia  se actualiza tarea 
  function handletarea(e) {
    settarea(e.target.value)
  }

  function enviarDatos(e) {
	e.preventDefault()//detiene el comportamiento predeterminado del formulario
	  console.log(tarea);
	  settarea("")
  }

//funcion agregar tarea 
  const agregartarea = () => {
    if (tarea === "") {
      alert("Debes ingresar alguna tarea")
  } else {
    setArrayTareas ([...arrayTareas, { label: tarea, done: false }])}
    settarea("")
}
//funcion borrar tarea
const handleDelete = (borrarTarea) => {
  const newArray = arrayTareas.filter((item) => item !== borrarTarea);
  setArrayTareas(newArray);
}

  return (
  <div className="boxbig container col-6 ">
     <div className="box container col-6 pagination justify-content-center"></div>
    <p className="text-danger  fs-1 text-center ">Lista de tareas </p>
   <div className="input-group ">
   <input type="text" 
   className="form-control" 
   placeholder="Escribir tarea" 
   aria-label="Recipient's username" 
   aria-describedby="button-addon2" 
   onChange={handletarea}
	 value={tarea}/>
   <button className="btn btn-outline-secondary" 
   type="button" 
   id="button-addon2" 
   onClick={agregartarea}>Agregar</button>
      </div>
        <ul className="list-group glow" > {arrayTareas.map((item, index) => 
          <li className="list-group-item glow d-flex " key={index}> <span style={{width:"90%"}}>{item.label} </span>
            <button className="btn btn-outline-secondary " type="button"  onClick={ () => handleDelete(item)}>x</button>
           </li>
           )} </ul>
      <div><button className="btn btn-outline-secondary" 
   type="button" 
   id="button-addon2" 
   onClick={deleteTarea}>Borrar todo</button>
   </div>
      
      
    </div>
  );
};

export default Lista;