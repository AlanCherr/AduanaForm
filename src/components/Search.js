import React , {useState} from 'react'
import { useCarga } from '../Context/CargaContext';
import { Modal } from './Modal';
export const Search = () => {
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
            
            <b>Identificador:</b>
            <div className="section-input">
            
                <div className="search-container">
                    <input onChange={handleChange} name="Identificador" value={carga.despacho} placeholder="identificador" type="text" className='input' disabled/>

                    <button className="buttonSearch" type='button' data-bs-toggle="modal" data-bs-target={"#form"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <Modal />
                </div>

            </div>
        </>
    )
}
