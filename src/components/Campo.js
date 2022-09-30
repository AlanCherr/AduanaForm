import React from 'react'
import { useCarga } from '../Context/CargaContext';

export const Campo = (props) => {
    const {carga, setCarga} = useCarga()
    
    function handleChange(evt) {
       
        const { name, value } = evt.target;
      
        const newValues = {
            ...carga,
            [name]: value,
        };
        setCarga(newValues);
    }
    
    
  return (
    <>
        
            <>
                <b>{props.label}</b>
                <div className="section-input">
                    <input onChange={handleChange} placeholder={props.holder} type={props.input} id={props.id} name={props.name} className={props.classProp} value={props.value} disabled={props.disabled}  />
                </div>
            </>
            

    </>
  )
}
