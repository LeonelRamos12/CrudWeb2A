const Api = "https://retoolapi.dev/Cnm9gT/Employees_SSO";

async function GetEmployees(){
    const Respuesta = await fetch(Api)

    const data = await Respuesta.json();

    MostrarDatosEmpleados(data);
}

//DATOS REPRESENTARA AL JSON DONDE VIENEN LA INFORMACION
function MostrarDatosEmpleados(datos) {
  const tabla = document.querySelector("#tabla tbody");


  //para inyectar codigo HTML usmos "innerHTML"
  tabla.innerHTML = "";

  datos.forEach(Employee => {
    tabla.innerHTML += `
        <tr>
          <td>${Employee.id}</td>
          <td>${Employee.FirstName}</td>
          <td>${Employee.LastName}</td>
          <td>${Employee.Email}</td>
          <td>
           <button onclick = "abrirModal('${Employee.id}','${Employee.FirstName}', '${Employee.LastName}','${Employee.Email}')"> Editar </button>
           <button onclick = "EliminarPersona(${Employee.id})"> Eliminar </button>
         </td>
        </tr>
        `;
  });
}


GetEmployees();

//proceso para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar") //cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar")//boton para agregar
const btnCerrar = document.getElementById("btnCerrar")//boton para cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();//se abrira el formulario para agregar nuevo integrante
});

btnCerrar.addEventListener("click", ()=>{
  modal.close();
})


//Agregar nuevo integrante 
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//"e" representa a submit y evita que el formulario se envie de un solo.
  const FirstName = document.getElementById("txtNombre").value.trim();
  const LastName = document.getElementById("txtApellido").value.trim();
  const Email = document.getElementById("txtCorreo").value.trim();

  if(!FirstName || !LastName || !Email){
    alert("ingrese los valores correctamente");
    return;
  }
//llamar a la api para enviar el registro
  const Respuesta = await fetch(Api,{
    //Metodo que usaremos para agregar
  method: "POST",
  //
  headers: {"Content-Type": "application/json"},
  //apartados a los cuales se le agregaran los valores nuevos
  body: JSON.stringify({FirstName, LastName, Email})
  });
  //verificar si la API responde que los datos fueron enviados correctamente
  if(Respuesta.ok){
    // si la API devuelve un código 200-299 
  alert("el registro fue agregado correctamente");


    //limpiar el formulario
    document.getElementById("frmAgregar").reset();

    //cerrar el modal
    modal.close();
    //Actualiza la tabla
    GetEmployees();
  }
  else{
    //en caso de que la API devuelva un código diferente de 200-299
    alert("El registro no pudo ser agregado");
  }
});

//funcion para borrar registros
async function EliminarPersona(id){
  const confirmacion = confirm("Quieres eliminar el registro");

  //Validamos si el usuario escogio borrar
  if(confirmacion){
    await fetch(`${Api}/${id}`, {
      method : "DELETE"
    });
    //recargar tabla
    GetEmployees();
  }

}

/*Proceso para editar un registro*/ 
const modalEditar = document.getElementById("mdActualizar");
const cerrar = document.getElementById("btnCerrarActualizar");

cerrar.addEventListener("click" , ()=>{
  modalEditar.close(); //cerramos el modal
});

function abrirModal(id, FirstName, LastName, Email){
  //se asignan los valores a los input del registro
  document.getElementById("txtIdEditar").value = id;
  document.getElementById("txtNombreActualizar").value = FirstName;
  document.getElementById("txtApellidoActualizar").value = LastName;
  document.getElementById("txtCorreoActualizar").value = Email;

  //abrimos rl modal
  modalEditar.showModal();
}

