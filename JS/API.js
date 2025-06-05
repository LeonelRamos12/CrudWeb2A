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
           <button> Editar </button>
           <button> Eliminar </button>
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
    
});
