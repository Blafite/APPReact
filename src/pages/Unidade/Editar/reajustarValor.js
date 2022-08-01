import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const ReajustarValor = () => {

    const [unidade, setUnidade] = useState({
        percentualReajuste: '',
        idEmpreendimento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setUnidade({ ...unidade, [e.target.name]: e.target.value });

    const reajustarValor = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/reajustarValor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ unidade })
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
                        mensagem: 'Unidades Reajustadas com sucesso'
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Unidade não cadastrada com sucesso, tente mais tarde!'
                });
            });
    }

    return (
        <div>
            <h1>Cadastrar</h1>

            {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
            <Link to="/unidades">
                <button type="submit">Listar</button>
            </Link>
            <form onSubmit={reajustarValor}>
                <label>Percentual de Reajuste:                </label>
                <input type="text" name="percentualReajuste" placeholder="Percentual de Reajuste"
                    onChange={valorInput} /><br /><br />
                <label>Id Empreendimento:    </label>
                <input type="text" name="idEmpreendimento" placeholder="ID do Empreendimento"
                    onChange={valorInput} /><br /><br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}