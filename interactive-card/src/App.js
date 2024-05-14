import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import bgMobile from "./images/bgMobile.png";
import bgDesktop from "./images/bgDesktop.png";
import cardFront from "./images/card-front.png";
import cardBack from "./images/card-back.png";
import ckeck from "./images/ckeck.png";

import "./index.css";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);

  const initialValues = {
    name: "",
    cardNumber: "",
    expDate: "",
    cvc: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    cardNumber: Yup.string().matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Número do cartão inválido").required("Número do cartão é obrigatório"),
    expDate: Yup.string().matches(/^\d{2}\/\d{2}$/, "Data de expiração inválida").required("Data de expiração é obrigatória"),
    cvc: Yup.string().matches(/^\d{3}$/, "CVC inválido").required("CVC é obrigatório")
  });

  return (
    <section>
      <div className="absolute -z-10 w-full">
        <picture>
          <source media="(min-width: 1024px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="" className="w-full lg:w-1/3" />
        </picture>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setConfirmed(true);
            console.log(values);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <>
              <div className="mt-12 mx-5 lg:grid lg:grid-cols-1 lg:gap-5">
                <article className="front-card p-5 flex flex-col justify-between">
                  <div></div>
                  <div>
                    <h2 className="text-white text-xl lg:text-3xl mb-1 mt-20 tracking-widest">
                      {values.cardNumber || "0000 0000 0000 0000"}
                    </h2>
                  </div>
                  <div>
                    <ul className="flex items-center justify-between mb-6">
                      <li className="text-white uppercase tracking-widest">
                        {values.name || "SEU NOME AQUI"}
                      </li>
                      <li className="text-white tracking-widest">
                        {values.expDate || "MM/YY"}
                      </li>
                    </ul>
                  </div>
                </article>
                <article className="back-card relative">
                  <p className="absolute right-16 text-white tracking-widest">
                    {values.cvc || "000"}
                  </p>
                </article>
              </div>

              <div className="container">
                {!confirmed && (
                  <>
                    <h1 className="title">Inserir dados do cartão</h1>
                    <Form className="flex flex-col justify-center gap-6">
                      <div className="relative">
                        <label htmlFor="name">Nome no cartão</label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="ex.: Ana Carolina S"
                          className={`input ${touched.name && errors.name ? 'input-error' : ''}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="name" component="div" className="error-message absolute" />
                      </div>
                      <div className="relative">
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <Field
                          type="text"
                          name="cardNumber"
                          id="cardNumber"
                          placeholder="ex.: 1234 5678 9123 4567"
                          maxLength={19}
                          className={`input ${touched.cardNumber && errors.cardNumber ? 'input-error' : ''}`}
                          onChange={(e) => {
                            const formattedCardNumber = e.target.value
                              .replace(/\s/g, "")
                              .replace(/(\d{4})/g, "$1 ")
                              .trim();
                            handleChange({
                              target: {
                                name: "cardNumber",
                                value: formattedCardNumber
                              }
                            });
                          }}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="cardNumber" component="div" className="error-message absolute" />
                      </div>
                      <article className="date-cvc flex items-center justify-between gap-6">
                        <div className="relative flex-1">
                          <label htmlFor="expDate">Data de expiração (MM/YY)</label>
                          <Field
                            type="text"
                            name="expDate"
                            id="expDate"
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`input ${touched.expDate && errors.expDate ? 'input-error' : ''}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name="expDate" component="div" className="error-message absolute" />
                        </div>
                        <div className="relative flex-1">
                          <label htmlFor="cvc">CVC</label>
                          <Field
                            type="text"
                            name="cvc"
                            id="cvc"
                            placeholder="123"
                            maxLength={3}
                            className={`input ${touched.cvc && errors.cvc ? 'input-error' : ''}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name="cvc" component="div" className="error-message absolute" />
                        </div>
                      </article>
                      <button type="submit" className="btn" disabled={!isValid}>
                        Confirmar
                      </button>
                    </Form>
                  </>
                )}
                {confirmed && <Obrigado setConfirmed={setConfirmed} />}
              </div>
            </>
          )}
        </Formik>
      </div>
    </section>
  );
}

function Obrigado({ setConfirmed }) {
  return (
    <div className="container flex flex-col mt-10 mx-auto">
      <img src={ckeck} alt="" className="block mx-auto" />
      <h1 className="title text-3xl mb-6">Obrigado!</h1>
      <p className="subtitle text-center mb-6">Seu cartão foi adicionado</p>
      <button className="btn" onClick={() => setConfirmed(false)}>Confirmar</button>
    </div>
  );
}
