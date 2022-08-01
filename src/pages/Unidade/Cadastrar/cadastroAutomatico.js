import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const CadastrarUnidadeAutomatico = () => {

    const [unidade, setUnidade] = useState({
        quantidadeBlocos: '',
        unidadesBloco: '',
        valor: '',
        idEmpreendimento: ''
    });

    const [data, setData] = useState([]);

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

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setUnidade({ ...unidade, [e.target.name]: e.target.value });

    const cadastrarUnidadeAutomatico = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/unidadesAutomatico", {
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
                        mensagem: 'Unidades Cadastradas com sucesso'
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
            <form onSubmit={cadastrarUnidadeAutomatico}>
                <label>Quantidade Blocos:                </label>
                <input type="text" name="quantidadeBlocos" placeholder="Quantidade Blocos:" onChange={valorInput} /><br /><br />
                <label>Quantidade de Unidades por Bloco:         </label>
                <input type="text" name="unidadesBloco" placeholder="Quantidade de Unidades por Bloco: "
                    onChange={valorInput} /><br /><br />
                <label>Valor:         </label>
                <input type="text" name="valor" placeholder="Valor das Unidades"
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