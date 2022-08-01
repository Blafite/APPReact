import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


export const VisualizarUnidade = (props) => {

    const { id } = useParams()

    const [bloco, setBloco] = useState('');
    const [status, setStatus] = useState('');
    const [valor, setValor] = useState('');
    const [idEmpreendimento, setIdEmpreendimento] = useState('');


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
            <h1>Cadastrar</h1>


            <Link to="/unidades">
                <button type="submit">Listar</button>
            </Link>

            <form>
                <label>Bloco:                </label>
                <input type="text" name="bloco" placeholder="Bloco" value={bloco}
                    readOnly /><br /><br />
                <label>Status:         </label>
                <input type="text" name="status" placeholder="Status da Unidade"
                    value={status} readOnly /><br /><br />
                <label>Valor:         </label>
                <input type="text" name="valor" placeholder="Valor da Unidade"
                    value={valor} readOnly /><br /><br />
                <label>Id Empreendimento:    </label>
                <input type="text" name="idEmpreendimento" value={idEmpreendimento}
                    readOnly /><br /><br />
            </form>
        </div>
    );
}