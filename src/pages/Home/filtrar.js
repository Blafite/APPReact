import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const Filtrar = (props) => {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getEmpreendimento = async () => {
        await fetch("http://localhost:8000/empreendimentos?nome=" + nome)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.empreendimentos)
            });
    }

    useEffect(() => {
        const getEmpreendimento = async () => {
            await fetch("http://localhost:8000/empreendimentos?nome=" + nome)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.empreendimentos)
                });
        }
        getEmpreendimento();
    }, [id]);

    const apagarEmpreendimento = async (idEmpreendimento) => {
        await fetch("http://localhost:8000/empreendimentos/" + idEmpreendimento, {
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
                        mensagem: 'Empreendimento apagado com sucesso'
                    });
                    getEmpreendimento();
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "Erro: Produto não apagado com sucesso, tente mais tarde"
                });
            });
    };

    return (
        <div>
            <h1>Filtrar</h1>


            <Link to="/">
                <button type="submit">Listar</button>
            </Link>

            {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
            <br />
            <br />
            <label>Nome:                </label>
            <input type="text" name="nome" placeholder="Nome do Empreendimento"
                onChange={e => setNome(e.target.value)} /><br /><br />

            <Link to={"/empreendimento/filtrar/" + nome}>
                <button type="button">Filtrar</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Localização</th>
                        <th>Previsão Entrega</th>
                        <th>Valor Reservado</th>
                        <th>Valor Vendido</th>
                        <th>Estoque Disponivel</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(empreendimento => (
                        <tr key={empreendimento.id}>
                            <td>{empreendimento.id}</td>
                            <td>{empreendimento.nome}</td>
                            <td>{empreendimento.localizacao}</td>
                            <td>{empreendimento.previsao_entrega}</td>
                            <td>{empreendimento.reservado}</td>
                            <td>{empreendimento.vendido}</td>
                            <td>{empreendimento.estoqueDisponivel}</td>
                            <td>
                                <Link to={"/empreendimento/" + empreendimento.id}>
                                    <button type="button">Visualizar</button>
                                </Link>
                                <Link to={"/empreendimento/editar/" + empreendimento.id}>
                                    <button type="button">Editar</button>
                                </Link>
                                <button onClick={() => apagarEmpreendimento(empreendimento.id)}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}