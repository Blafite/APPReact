import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Filtrar } from './pages/Home/filtrar';
import { Cadastrar } from './pages/Cadastrar';
import { Editar } from './pages/Editar';
import { Visualizar } from './pages/Visualizar';
import { HomeUnidades } from './pages/Unidade/Home';
import { FiltrarUnidade } from './pages/Unidade/Home/filtrar';
import { VisualizarUnidade } from './pages/Unidade/Visualizar';
import { EditarUnidade } from './pages/Unidade/Editar';
import { CadastrarUnidade } from './pages/Unidade/Cadastrar';
import { CadastrarUnidadeAutomatico } from './pages/Unidade/Cadastrar/cadastroAutomatico';
import { ReajustarValor } from './pages/Unidade/Editar/reajustarValor';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empreendimento" element={<Cadastrar />} />
          <Route path="/empreendimento/editar/:id" element={<Editar />} />
          <Route path="/empreendimento/:id" element={<Visualizar />} />
          <Route path="/unidades" element={<HomeUnidades />} />
          <Route path="/unidades/editar/:id" element={<EditarUnidade />} />
          <Route path="/unidades/:id" element={<VisualizarUnidade />} />
          <Route path="/unidades/novo" element={<CadastrarUnidade />} />
          <Route path="/unidades/cadastroAutomatico" element={<CadastrarUnidadeAutomatico />} />
          <Route path="/unidades/reajustarValor" element={<ReajustarValor />} />
          <Route path="/empreendimento/filtrar/:id" element={<Filtrar />} />
          <Route path="/empreendimento/filtrar/" element={<Filtrar />} />
          <Route path="/unidades/filtrar/:id" element={<FiltrarUnidade />} />
          <Route path="/unidades/filtrar/" element={<FiltrarUnidade />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
