import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const Cadastrar = () => {

    const [empreendimento, setEmpreendimento] = useState({
        nome: '',
        localizacao: '',
        previsaoEntrega: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setEmpreendimento({ ...empreendimento, [e.target.name]: e.target.value });

    const cadastrarEmpreendimento = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/empreendimentos/novo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empreendimento })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Produto não cadastro com sucesso, tente mais tarde!'
                });
            });
    }

    return (
        <div>
            <h1>Cadastrar</h1>

            {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
            <Link to="/">
                <button type="submit">Listar</button>
            </Link>
            <form onSubmit={cadastrarEmpreendimento}>
                <label>Nome:                </label>
                <input type="text" name="nome" placeholder="Nome do Empreendimento" onChange={valorInput} /><br /><br />
                <label>Localização:         </label>
                <input type="text" name="localizacao" placeholder="Localização do Empreendimento" onChange={valorInput} /><br /><br />
                <label>Previsão Entrega:    </label>
                <input type="date" name="previsaoEntrega" onChange={valorInput} /><br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}