import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const FiltrarUnidade = (props) => {

    const { id } = useParams();

    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);

    const [statusEdicao, setStatusEdicao] = useState({
        type: '',
        mensagem: ''
    })

    const getUnidade = async () => {
        console.log(id);
        await fetch("http://localhost:8000/unidades?status=" + status)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.unidades)
            });
    }

    useEffect(() => {
        const getUnidade = async () => {
            console.log(id);
            await fetch("http://localhost:8000/unidades?status=" + status)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.unidades)
                });
        }
        getUnidade();
    }, [id]);

    const apagarUnidade = async (idUnidade) => {
        await fetch("http://localhost:8000/unidades/" + idUnidade, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: 'Unidade apagado com sucesso'
                    });
                    getUnidade();
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "Erro: Unidade não apagada com sucesso, tente mais tarde"
                });
            });
    };

    return (
        <div>
            <h1>Filtrar</h1>


            <Link to="/">
                <button type="submit">Listar</button>
            </Link>

            {statusEdicao.type === 'erro' ? <p>{statusEdicao.mensagem}</p> : ""}
            {statusEdicao.type === 'success' ? <p>{statusEdicao.mensagem}</p> : ""}
            <br />
            <br />
            <label>Status:                </label>
            <input type="text" name="nome" placeholder="Status da Unidade"
                onChange={e => setStatus(e.target.value)} /><br /><br />

            <Link to={"/unidades/filtrar/" + status}>
                <button type="button">Filtrar</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bloco</th>
                        <th>Status</th>
                        <th>ID Empreendimento</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(unidade => (
                        <tr key={unidade.id}>
                            <td>{unidade.id}</td>
                            <td>{unidade.bloco}</td>
                            <td>{unidade.status}</td>
                            <td>{unidade.id_empreendimento}</td>
                            <td>{unidade.valor}</td>
                            <td>
                                <Link to={"/unidades/" + unidade.id}>
                                    <button type="button">Visualizar</button>
                                </Link>
                                <Link to={"/unidades/editar/" + unidade.id}>
                                    <button type="button">Editar</button>
                                </Link>
                                <button onClick={() => apagarUnidade(unidade.id)}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}