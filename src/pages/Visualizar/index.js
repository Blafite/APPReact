import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const Visualizar = (props) => {

    const { id } = useParams()

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [previsaoEntrega, setPrevisaoEntrega] = useState('');

    useEffect(() => {
        const getEmpreendimento = async () => {
            await fetch("http://localhost:8000/empreendimentos/" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setNome(responseJson.empreendimento.nome);
                    setLocalizacao(responseJson.empreendimento.localizacao);
                    setPrevisaoEntrega(responseJson.empreendimento.previsaoEntrega);
                });
        }
        getEmpreendimento();
    }, [id]);

    return (
        <div>
            <h1>Visualizar</h1>


            <Link to="/">
                <button type="submit">Listar</button>
            </Link>

            <form>
                <label>Nome:                </label>
                <input type="text" name="nome" placeholder="Nome do Empreendimento" value={nome}
                    readOnly /><br /><br />
                <label>Localização:         </label>
                <input type="text" name="localizacao" placeholder="Localização do Empreendimento"
                    value={localizacao} readOnly /><br /><br />
                <label>Previsão Entrega:    </label>
                <input type="date" name="previsaoEntrega" value={previsaoEntrega}
                    readOnly /><br /><br />
            </form>
        </div>
    );
}