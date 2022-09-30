import axios from 'axios';
import React, { useState } from 'react'
import { Campo } from "../components/Campo";
import { useCarga } from "../Context/CargaContext"

const getData = () => {
  return localStorage.getItem("token")
}
const clearStorage = () => {
  return localStorage.clear()
}
const token = getData();

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${token}`
    return config
  }
)

export const Modal = () => {
  const { carga, setCarga } = useCarga()
  const [declaracion, setDeclaracion] = useState([])
  const refrescarModel = {
    UserName: localStorage.getItem("UserName"),
    RefreshToken: localStorage.getItem("RefreshToken")
  }
  const nuevoToken = refrescarModel

  const model = {
    "FechaDesde": "",
    "FechaHasta": "",
    "cuitDespachante": "20040410024", // valor obligatorio
    "cuitImpoExpo": "", // enviar vacío
    "aduana": "777" // valor obligatorio
  }

  function limpiarFecha() {
    const FechaDesde = "FechaDesde";
    const FechaHasta = "FechaHasta"
    const newValues = {
      ...carga,
      [FechaDesde]: "",
      [FechaHasta]: ""
    };
    setCarga(newValues)
    console.log("Carga limpiar fecha",carga);
    setDeclaracion([])
  }

  function convertirFecha(fecha) {
    const newFecha = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    return newFecha;
  }

  function refrescarToken(){
          axios.post("https://apiadv.sintia.com.ar/Account/ValidRefreshToken",nuevoToken)
          .then(response=>{
            localStorage.setItem("token", response.data.AccessToken + ":" + localStorage.getItem("UserName"))
            localStorage.setItem("RefreshToken", response.data.RefreshToken)
            window.location.reload()
          })
          .catch((e)=>{
            localStorage.clear()
            window.location.reload()
          })
  }


  const buscarDeclaracion = () => {
    if (carga.FechaDesde && carga.FechaHasta) {
      const FechaDesde = carga.FechaDesde;
      const FechaHasta = carga.FechaHasta
      model.FechaDesde = convertirFecha(FechaDesde)
      model.FechaHasta = convertirFecha(FechaHasta)
      axios.post("https://apiadv.sintia.com.ar/KitMaria/getDeclaracionesOficializadas", model)
        .then(response => setDeclaracion(response.data.ListDespachosOficializados))
        .catch((e) => {
          if (e.response.status === 401) {
            console.log("Es igual");
            refrescarToken()

          }
        })
     
    } else {
      console.log("error");
    }
  }
  const filaSeleccionada = (nroDespacho)=>{
      const modelConsulta = {
        despacho: nroDespacho,
        cuitDespachante: carga.Despachante,
        aduana: carga.Aduana
      }  
      console.log(carga);
      console.log(modelConsulta);
      axios.post("https://apiadv.sintia.com.ar/KitMaria/avisoDeCargaConsulta", modelConsulta)
      .then(response=> {

        carga.FechaOff = response.data.ConsultaAvisoDatos.FechaOficializacion
        carga.NombreImportador = response.data.ConsultaAvisoDatos.DescripcionImportador
        carga.CuitImportador = response.data.ConsultaAvisoDatos.CuitImportador
        carga.DescripcionDeposito = response.data.ConsultaAvisoDatos.DescripcionDeposito
        carga.CodigoDeposito = response.data.ConsultaAvisoDatos.CodigoDeposito
        carga.despacho = nroDespacho;
        console.log("luego de hacer peticion fila ",response.data.ConsultaAvisoDatos);
      })
      

  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    const newValues = {
      ...carga,
      [name]: value,
    };
    setCarga(newValues);
    console.log("Carga handlechange",carga);

  }
  return (
    <div className="modal fade formModel" id="form" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog modalcssDialog">
        <div className="modal-content modalcss">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Declaraciones</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={limpiarFecha} aria-label="Close"></button>
          </div>
          <div className="modal-body bodyModal">
            <div className='ModalFechas'>
              <div >
                <Campo value={carga.FechaDesde} onChange={handleChange} input="date" name="FechaDesde" disabled={false} class="input " label="Fecha desde:" id="FechaDesde" />
              </div>
              <div >
                <Campo value={carga.FechaHasta} onChange={handleChange} input="date" name="FechaHasta" disabled={false} class="input " label="Fecha hasta:" id="FechaHasta" />
              </div>
            </div>
            {declaracion.length > 0 ? <div>
              <button onClick={limpiarFecha}>Limpiar Fechas</button>
              <table>
                <thead className='thead'>
                  <tr className='cabeceraContainer'>
                    <th className='tableCabecera'>Despacho</th>
                    <div className='separador'>
                      <th className='tableCabecera'>Fecha Ofic.</th>
                      <th className='tableCabecera'>Nombre Imp.</th>
                    </div>
                  </tr>
                </thead>
                { declaracion.map(dec => {
                  return(
                  <tbody className='tbody' key={dec.Despacho} >
                    <tr className='infoContainer' id={dec.Despacho} onClick={()=>filaSeleccionada(dec.Despacho) }>
                      <td className='tableInfoDesp'  >{dec.Despacho}</td> 
                      <td className='tableInfo' >{dec.FechaOficializacion}</td>
                      <td className='tableInfo' >{dec.NombreImportador}</td>
                    </tr>
                  </tbody>
                  )
                })}
              </table>
            </div> : (<div>No hay resultados</div>)}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={limpiarFecha} data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={buscarDeclaracion}>Buscar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
