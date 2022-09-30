import axios from "axios";

const getData = ()=>{
  return localStorage.getItem("token")
}
const clearStorage = ()=>{
  return localStorage.clear()
}
const token = getData()

axios.interceptors.request.use(
  config =>{
    config.headers.authorization = `Bearer ${token}`
    return config
  }
)

function Home() {
    const model = {
      "FechaDesde": "25/08/2022",
      "FechaHasta": "28/08/2022",
      "cuitDespachante": "20040410024", // valor obligatorio
      "cuitImpoExpo": "", // enviar vacío
      "aduana": "777" // valor obligatorio
      }
      
      
    const peticion = ()=>{
      axios.post("https://apiadv.sintia.com.ar/KitMaria/getDeclaracionesOficializadas",model)
      .then(response=>  clearStorage())
      .catch((e)=>{
        if(e.response.status === 401){
          console.log("Es igual");
          //DEBERIA REFRESCAR TOKEN
          clearStorage()
         
        }
      })
    }  
    return (
      <div className="App">
      <button onClick={peticion}>Peticion</button>
      </div>
    );
  }
  
  export default Home;
  