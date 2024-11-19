import React, { useState } from 'react';
import './App.css';
import FormularioCadastro from './FormularioCadastro'; // Componente do formulário
import BuscaFuncionarios from './BuscaFuncionarios'; // Componente de busca
import Exportacao from './Exportacao'; // Componente de exportação
import ListaDeFuncionarios from './ListaDeFuncionarios'; // Componente para lista de funcionários
import Swal from 'sweetalert2'; // Para alertas

function App() {
  const [funcionarios, setFuncionarios] = useState([]); // Lista de funcionários

  // Função para remover um funcionário
  const removerFuncionario = (id) => {
    setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id));
    Swal.fire('Sucesso', 'Funcionário removido com sucesso!', 'success');
  };

  // Função para editar um funcionário
  const editarFuncionario = (id, nome, funcao, salario, admissao, demissao) => {
    setFuncionarios(funcionarios.map(funcionario => 
      funcionario.id === id ? { ...funcionario, nome, funcao, salario, admissao, demissao } : funcionario
    ));
    Swal.fire('Sucesso', 'Funcionário editado com sucesso!', 'success');
  };

  return (
    <div className="App">
      <h1>Cadastro de Funcionários</h1>

      {/* Área de Formulário */}
      <div className="area-formulario">
        <h2>Cadastro de Funcionário</h2>
        <FormularioCadastro setFuncionarios={setFuncionarios} funcionarios={funcionarios} />
      </div>

      {/* Área de Busca */}
      <div className="area-busca">
        <h2>Busca de Funcionários</h2>
        <BuscaFuncionarios funcionarios={funcionarios} />
      </div>

      {/* Área de Exportação */}
      <div className="area-exportacao">
        <h2>Exportar Dados</h2>
        <Exportacao funcionarios={funcionarios} />
      </div>

      {/* Área de Lista de Funcionários */}
      <div className="area-lista">
        <h2>Lista de Funcionários Cadastrados</h2>
        <ListaDeFuncionarios 
          funcionarios={funcionarios}
          removerFuncionario={removerFuncionario}
          editarFuncionario={editarFuncionario}
        />
      </div>
    </div>
  );
}

export default App;
