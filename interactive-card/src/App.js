import React, {useState} from "react";
import {format} from "date-fns";

import InputComponentYup from "./InputComponent/InputComponenteYup";
import SelectComponentYup from "./InputComponent/SelectComponentYup";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import bgMobile from "./images/bgMobile.png";
import bgDesktop from "./images/bgDesktop.png";
import cardFront from "./images/card-front.png";
import cardBack from "./images/card-back.png";
import ckeck from "./images/ckeck.png"

import "./index.css";

export default function App(){

  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("01/23");
  const [cvc, setCVC] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    cardNumber: Yup.string().required("Número do cartão é obrigatório"),
    expDate: Yup.string().required("Selecione uma data"),
    cvc: Yup.string().required("CVC é obrigatório"),
})

  return (<>
    <section>
      <div className="absolute -z-10 w-full">
        <picture>
          <source media = "(min-width: 1024px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="" className="w-full lg:w-1/3"/>
        </picture>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="mt-12 mx-5 lg:grid lg:grid-cols-1 lg:gap-5">
          <article className="front-card p-5 flex flex-col justify-between">
            <div></div>
            <div>
              <h2 className="text-white text-xl lg:text-3xl mb-1 mt-20 tracking-widest">{cardNumber}</h2>
            </div>
            <div>
            <ul className="flex items-center justify-between mb-6">
                <li className="text-white uppercase tracking-widest">{name}</li>
                <li className="text-white tracking-widest">{format(new Date(expDate), "MM/yy")}</li>
              </ul>
            </div>
            
          </article>
          <article className="back-card relative">
            <p className="absolute right-16 text-white tracking-widest">{cvc}</p>
          </article>
        </div>

        <div className="container">
          {!confirmed && (
            <>

            <Formik 
            validationSchema={validationSchema}>
            {({ isValid }) => (
              <>
              <h1 className="title">Inserir dados do cartão</h1>
              <Form className="flex flex-col justify-center gap-6">
                    <div>
                      <label htmlFor="name">Nome no cartão</label>
                      <input type="text" name="nome" id="name" placeholder="ex.: Ana Carolina S" required
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div>
                      <label htmlFor="number">Número do cartão</label>
                      <input type="text" name="nome" id="name" placeholder="ex.: 1234 5678 9123 4567" maxLength={19} required
                        value={cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                        onChange={(e) => setCardNumber(e.target.value)} />

                    </div>
                    <article className="flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <label htmlFor="data_exp">Data de expiração (MM/YY)</label>
                        <input type="month" name="data_exp" id="data_exp" placeholder="MM YY" required
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)} />

                      </div>
                      <div className="flex-1">
                        <label htmlFor="CVC">CVC</label>
                        <input type="number" name="CVC" id="CVC" placeholder="123" maxLength={3} required
                          value={cvc}
                          onChange={(e) => setCVC(e.target.value)} />

                      </div>
                    </article>
                    <button className="btn" onClick={() => setConfirmed(true)}>Confirmar</button>
                  </Form></>
             )}
            </Formik>
            </>
          )}
            
          

          {confirmed && <Obrigado setConfirmed={setConfirmed}/>}
        </div>
      </div>
    </section>
  
  
  </>
  )
}

function Obrigado({setConfirmed}){
  return(
    <>
      <div className="container flex flex-col mt-10 mx-auto">
        <img src={ckeck} alt="" className="block mx-auto"/>
        <h1 className="title text-3xl mb-6">Obrigado!</h1>
        <p className="subtitle text-center mb-6">Seu cartão foi adicionado</p>
        <button className="btn" onClick={() => setConfirmed(false)}>Confirmar</button>

      </div>
    
    
    </>
  )
}