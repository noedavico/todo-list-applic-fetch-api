import React, { useState } from "react";

const Lista = () => {
  const [tarea, settarea] = useState("");
  const [arrayTareas, setArrayTareas] = useState ([]);

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
    setArrayTareas ([...arrayTareas, tarea])}
    settarea("")
}
//funcion borrar tarea
const handleDelete = (borrarTarea) => {
  const newArray = arrayTareas.filter((item) => item !== borrarTarea);
  setArrayTareas(newArray);
}




console.log (arrayTareas)
console.log (tarea)
  return (
  <div class="boxbig container col-6 ">
     <div class="box container col-6 pagination justify-content-center"></div>
    <p class="text-danger  fs-1 text-center ">Lista de tareas </p>
   <div class="input-group ">
   <input type="text" 
   class="form-control" 
   placeholder="Escribir tarea" 
   aria-label="Recipient's username" 
   aria-describedby="button-addon2" 
   onChange={handletarea}
	 value={tarea}/>
   <button class="btn btn-outline-secondary" 
   type="button" 
   id="button-addon2" 
   onClick={agregartarea}>Agregar</button>
      </div>
      
        <ul className="list-group glow"> {arrayTareas.map ((item) => 
          <li className="list-group-item glow d-flex "> <span style={{width:"90%"}}>{item} </span> <button class="btn btn-outline-secondary " 
          type="button"  onClick={ () => handleDelete(item)}>x</button></li>)}
          
        </ul>
      
      
    </div>
  );
};

export default Lista;