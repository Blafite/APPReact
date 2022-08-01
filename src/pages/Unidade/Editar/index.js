import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const EditarUnidade = () => {

    const { id } = useParams()

    const [bloco, setBloco] = useState('');
    const [status, setStatus] = useState('');
    const [valor, setValor] = useState('');
    const [idEmpreendimento, setIdEmpreendimento] = useState('');
    const [data, setData] = useState([]);

    const [statusEdicao, setStatusEdicao] = useState({
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

    const editUnidade = async e => {
        e.preventDefault();

        await fetch("http://localhost:8000/unidades/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, bloco, status, idEmpreendimento, valor })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.erro) {
                    setStatusEdicao({
                        type: 'erro',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatusEdicao({
                        type: 'success',
                        mensagem: 'Unidade editada com sucesso'
                    });
                }
            }).catch(() => {
                setStatusEdicao({
                    type: 'erro',
                    mensagem: "Unidade não editada com sucesso, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getUnidade = async () => {
            await fetch("http://localhost:8000/unidades/" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setBloco(responseJson.unidade.bloco);
                    setStatus(responseJson.unidade.status);
                    setIdEmpreendimento(responseJson.unidade.id_empreendimento);
                    setValor(responseJson.unidade.valor);
                });
        }
        getUnidade();
    }, [id]);

    return (
        <div>
            <h1>Editar</h1>


            <Link to="/unidades">
                <button type="submit">Listar</button>
            </Link>

            {statusEdicao.type === 'erro' ? <p>{statusEdicao.mensagem}</p> : ""}
            {statusEdicao.type === 'success' ? <p>{statusEdicao.mensagem}</p> : ""}

            <form onSubmit={editUnidade}>
                <br />
                <label>Bloco:                </label>
                <input type="text" name="bloco" placeholder="Bloco" value={bloco}
                    onChange={e => setBloco(e.target.value)} /><br /><br />

                <label>Status:         </label>
                <select name="status" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value='' key='0'>Selecione</option>
                    <option value='DISPONIVEL'>DISPONIVEL</option>
                    <option value='RESERVADA'>RESERVADA</option>
                    <option value='VENDIDA'>VENDIDA</option>
                </select>
                <br /><br />
                <label>Valor:         </label>
                <input type="text" name="valor" placeholder="Valor da Unidade"
                    value={valor} onChange={e => setValor(e.target.value)} /><br /><br />
                <label>Id Empreendimento:    </label>
                <select name="idEmpreendimento" value={idEmpreendimento} onChange={e => setIdEmpreendimento(e.target.value)}>
                    {Object.values(data).map(empreendimento => (
                        <option value={empreendimento.id} key={empreendimento.id}>{empreendimento.nome}</option>
                    ))}
                </select>
                <br /><br />
                <button type="submit">Editar</button>
            </form>
        </div>
    );
}