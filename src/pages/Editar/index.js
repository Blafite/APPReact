import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const Editar = (props) => {

    const { id } = useParams()

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [previsaoEntrega, setPrevisaoEntrega] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editEmpreendimento = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/empreendimentos/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nome, localizacao, previsaoEntrega })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: 'Empreendimento editado com sucesso'
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "Produto não editado com sucesso, tente mais tarde!"
                });
            });
    }

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
            <h1>Cadastrar</h1>


            <Link to="/">
                <button type="submit">Listar</button>
            </Link>

            {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}

            <form onSubmit={editEmpreendimento}>
                <label>Nome:                </label>
                <input type="text" name="nome" placeholder="Nome do Empreendimento" value={nome}
                    onChange={e => setNome(e.target.value)} /><br /><br />
                <label>Localização:         </label>
                <input type="text" name="localizacao" placeholder="Localização do Empreendimento"
                    value={localizacao} onChange={e => setLocalizacao(e.target.value)} /><br /><br />
                <label>Previsão Entrega:    </label>
                <input type="date" name="previsaoEntrega" value={previsaoEntrega}
                    onChange={e => setPrevisaoEntrega(e.target.value)} /><br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}