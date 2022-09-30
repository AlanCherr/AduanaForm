import React, { useState, useEffect, useMemo } from 'react'

const CargaContext = React.createContext();

export const CargaProvider = (props) => {
    const cargaModel = {
        Despachante: "20040410024",
        Descripcion: "RODRIGUEZ CAMILO HERNESTO",
        FechaOff: "",
        CuitImportador: "",
        NombreImportador: "",
        DescripcionDeposito: "",
        CodigoDeposito: "",
        Calle: "",
        NumPuerta: "",
        Localidad: "",
        Telefono: "",
        Fecha: "",
        Hora: "",
        Observaciones: "",
        Aduana: "777",
        FechaDesde: "",
        FechaHasta: "",
        despacho:""
    }
    const [carga, setCarga] = React.useState(cargaModel);
    const envioModel = {
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
    const [envio, setEnvio] = React.useState(envioModel);
    const value = useMemo(() => {
        return ({
            carga,
            setCarga,
            cargaModel,
            envio, 
            setEnvio
        })
    }, [carga])

    return <CargaContext.Provider value={value} {...props} />
}

export function useCarga() {
    const context = React.useContext(CargaContext)
    if (!context) {
        throw new Error("useCarga debe estar dentro de CargaContext");
    }
    return context;
}
