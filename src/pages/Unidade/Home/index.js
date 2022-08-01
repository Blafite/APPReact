import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const HomeUnidades = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const getUnidades = async () => {
        fetch("http://localhost:8000/unidades")
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson.unidades)
            ));
    }

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
                    getUnidades();
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "Erro: Unidade não apagada com sucesso, tente mais tarde"
                });
            });
    };

    useEffect(() => {
        getUnidades()
    }, []);

    return (
        <div className="App">
            <h1>Listar</h1>
            <Link to="/unidades/novo">
                <button type="submit">Cadastrar</button>
            </Link>
            {" "}
            <Link to="/unidades/cadastroAutomatico">
                <button type="submit">Cadastrar Automaticamente</button>
            </Link>
            {" "}
            <Link to="/unidades/reajustarValor">
                <button type="submit">Reajustar Valor</button>
            </Link>
            {" "}
            <Link to="/unidades/filtrar">
                <button type="submit">Filtrar</button>
            </Link>
            {" "}
            <Link to="/">
                <button type="submit">Empreendimentos</button>
            </Link>
            {status.type === 'erro' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
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
                            <td>{unidade.id_empreendimento} - {unidade.nome}</td>
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