import React from "react"
import "../styles/AvisoDeCarga.css"
import { Campo } from "../components/Campo";
import { CargaProvider, useCarga } from "../Context/CargaContext"
import { Search } from "../components/Search";
import { Observaciones } from "../components/Observaciones";
const axios = require('axios').default;

const getData = () => {
    return localStorage.getItem("token")
}
const token = getData()

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${token}`
        return config
    }
)

export default () => <CargaProvider>
    <AvisoDeCarga></AvisoDeCarga>
</CargaProvider>

function AvisoDeCarga() {

    const clearStorage = () => {
        localStorage.clear()
        window.location.reload()
    }
    const { cargaModel, carga, setCarga } = useCarga()
    const envio = {
        Aduana: "777", // valor obligatorio
        despacho: "", // obtenido en sección 1 (identificador)
        CuitDespachante: "20040410024", // valor obligatorio
        FechaAviso: "", // cargado en sección 3
        HoraAviso: "", // cargado en sección 3
        Calle: "", // cargado en sección 3
        NroPuerta: "", // cargado en sección 3
        Localidad: "", // cargado en sección 3
        Observacion: "", // cargado en sección 3
        Telefono: "" // cargado en sección 3
        }

    function handleSubmit(evt) {

        evt.preventDefault();
        envio.despacho = carga.despacho
        envio.Calle = carga.Calle
        envio.FechaAviso = carga.Fecha
        envio.HoraAviso = carga.Hora
        envio.NroPuerta = carga.NumPuerta
        envio.Localidad = carga.Localidad
        envio.Observacion = carga.Observaciones
        envio.Telefono = carga.Telefono

       axios.post("https://apiadv.sintia.com.ar/KitMaria/avisoDeCargaEnviar",envio)
       .catch(e=>{
        if(e.response.data === "OK"){
            limpiarCampos()
            return(
                alert("Se cargo correctamente")
            )
            
        }else{
            alert("Faltan campos o los datos son incorrectos")
        }
       })
    //    setCarga(cargaModel)

        // Aquí puedes usar carga para enviar la información
    }

    const limpiarCampos = () => {
        setCarga(cargaModel)
    }



    return (
        <>
            <div className="avisoContainer">
                <h1 className="titleForm">Aviso De Carga</h1>


                <form onSubmit={handleSubmit} className="formsection">

                    <div className="cerrarSesion">
                        <button onClick={() => clearStorage()}>Cerrar sesion</button>
                    </div>
                    <div className="section">
                        <h3 className="SectionTitle">Habilitado</h3>
                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.Despachante} name="Despachante" disabled={true} class="input" label="Despachante" id="despachante" />
                            </div>

                            <div className="campo">
                                <Campo value={carga.Descripcion} name="Descripcion" class="inputDesc" disabled={true} id="descripcion" label="Descripción" />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="SectionTitle">Declaración</h3>
                        <div className="section-input">

                            <div className="campo">
                                <Search />
                            </div>

                            <div className="campo">
                                <Campo value={carga.FechaOff} name="FechaOff" class="input" disabled={true} id="FechaOff" holder="Fecha Oficialización" label="Fecha Oficialización" />
                            </div>
                        </div>

                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.CuitImportador} name="CuitImportador" class="input" disabled={true} id="cuitImportador" holder="Cuit" label="Importador:" />

                            </div>
                            <div className="campo">
                                <div className="section-input">
                                    <Campo value={carga.NombreImportador} name="NombreImportador" class="inputDesc" disabled={true} id="nombreImportador" holder="Nombre" label="" />
                                </div>
                            </div>
                        </div>
                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.CodigoDeposito} name="CodigoDeposito" class="input" disabled={true} id="codigoDeposito" holder="Codigo " label="Depósito:" />

                            </div>
                            <div className="campo">
                                <div className="section-input">
                                    <Campo value={carga.DescripcionDeposito} name="DescripcionDeposito" class="inputDesc" disabled={true} id="descDeposito" holder="Descripcion" label="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section">

                        <h3 className="SectionTitle">Aviso</h3>
                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.Calle} name="Calle" disabled={false} class="inputDesc" holder="Calle" label="Calle:" id="Calle" />
                            </div>
                            <div className="campo">
                                <Campo value={carga.NumPuerta} name="NumPuerta" disabled={false} class="input" holder="Num. puerta" label="Nro. Pta.:" id="Calle" />
                            </div>
                        </div>

                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.Localidad} name="Localidad" disabled={false} class="inputDesc" holder="Localidad" label="Localidad:" id="Localidad" />


                            </div>
                            <div className="campo">
                                <Campo value={carga.Telefono} name="Telefono" disabled={false} class="input" holder="Teléfono" label="Teléfono:" id="Telefono" />

                            </div>
                        </div>
                        <div className="section-input">
                            <div className="campo">
                                <Campo value={carga.Fecha} name="Fecha" disabled={false} input="date" class="input" holder="Fecha" label="Fecha:" id="Fecha" />
                            </div>
                            <div className="campo">
                                <Campo value={carga.Hora} name="Hora" disabled={false} class="input" holder="hh:mm" label="Hora:" id="Hora" />
                            </div>
                        </div>
                        <div className="section-input">

                                <Observaciones />
                        </div>

                    </div>
                    <div className="actions">
                        <button className="buttons" onClick={limpiarCampos}>Cancelar</button>
                        <input type="submit" className='buttons' />

                    </div>
                </form>

            </div>
        </>
    );
}
