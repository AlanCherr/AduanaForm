import React from 'react'
import { useCarga } from '../Context/CargaContext';

export const Observaciones = () => {
    const {carga,setCarga} = useCarga()
    function handleChange(evt) {
        /*
          evt.target es el elemento que ejecuto el evento
          name identifica el input y value describe el valor actual
        */
        // const { target } = evt.target;
        const { name, value } = evt.target;
        /*
          Este snippet:
          1. Clona el estado actual
          2. Reemplaza solo el valor del
             input que ejecutó el evento
        */
        const newValues = {
            ...carga,
            [name]: value,
        };
        // Sincroniza el estado de nuevo
        setCarga(newValues);
    }
    return (
        <>
        <div className='observacionesContainer'>

                <b>Observaciones</b>
                <textarea onChange={handleChange} value={carga.Observaciones} name="Observaciones"  type="text" className="observaciones" />
        </div>
           
        </>
    )
}
