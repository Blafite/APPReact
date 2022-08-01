import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const CadastrarUnidade = () => {

    const [data, setData] = useState([]);

    const [empreendimento, setEmpreendimento] = useState();

    const [unidade, setUnidade] = useState({
        bloco: '',
        status: '',
        valor: '',
        idEmpreendimento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getEmpreendimentos = async () => {
        fetch("http://localhost:8000/empreendimentos")
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson.empreendimentos)
            ));
    }

    useEffect(() => {
        getEmpreendimentos()
    }, []);

    const valorInput = e => setUnidade({ ...unidade, [e.target.name]: e.target.value });

    const cadastrarUnidade = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/unidades", {
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
                        mensagem: 'Unidade Cadastrada com sucesso'
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
            <form onSubmit={cadastrarUnidade}>
                <label>Bloco:                </label>
                <input type="text" name="bloco" placeholder="Bloco" onChange={valorInput} /><br /><br />
                <label>Status:         </label>
                <select name="status" onChange={valorInput}>
                    <option value='' key='0'>Selecione</option>
                    <option value='DISPONIVEL'>DISPONIVEL</option>
                    <option value='RESERVADA'>RESERVADA</option>
                    <option value='VENDIDA'>VENDIDA</option>
                </select>
                <br /><br />
                <label>Valor:         </label>
                <input type="text" name="valor" placeholder="Valor da Unidade"
                    onChange={valorInput} /><br /><br />
                <label>Id Empreendimento:    </label>
                <select name="idEmpreendimento" onChange={valor => setUnidade({ ...unidade, ['idEmpreendimento']: valor.target.value })}>
                    <option value='0' key='0'>Selecione</option>
                    {Object.values(data).map(empreendimento => (
                        <option value={empreendimento.id} key={empreendimento.id}>{empreendimento.nome}</option>
                    ))}
                </select>
                <br /><br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}