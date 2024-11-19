import React, { useState, useEffect } from 'react';
import './App.css';
import FormularioCadastro from './FormularioCadastro'; // Componente do formulário
import BuscaFuncionarios from './BuscaFuncionarios'; // Componente de busca
import Exportacao from './Exportacao'; // Componente de exportação
import ListaDeFuncionarios from './ListaDeFuncionarios'; // Componente para lista de funcionários
import Swal from 'sweetalert2'; // Para alertas

function App() {
  const [funcionarios, setFuncionarios] = useState([]); // Lista de funcionários
  const [showCadastro, setShowCadastro] = useState(false); // Controle da exibição do cadastro
  const [showBusca, setShowBusca] = useState(false); // Controle da exibição da busca
  const [showLista, setShowLista] = useState(false); // Controle da exibição da lista
  const [showExportacao, setShowExportacao] = useState(false); // Controle da exibição da exportação
  const [showLgpdModal, setShowLgpdModal] = useState(false); // Controle do modal LGPD

  // Carregar os funcionários do LocalStorage ao iniciar a aplicação
  useEffect(() => {
    const funcionariosSalvos = JSON.parse(localStorage.getItem('funcionarios')) || [];
    setFuncionarios(funcionariosSalvos);
  }, []);

  // Salvar os funcionários no LocalStorage sempre que a lista mudar
  useEffect(() => {
    if (funcionarios.length > 0) {
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    }
  }, [funcionarios]);

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

  // Função para fechar o modal da LGPD
  const closeLgpdModal = () => {
    setShowLgpdModal(false);
  };

  // Função para limpar o localStorage e resetar o estado
  const limparStorage = () => {
    localStorage.clear();  // Limpa o localStorage
    setFuncionarios([]);   // Limpa a lista de funcionários no estado
    Swal.fire('Sucesso', 'Todos os dados foram removidos!', 'success');
  };

  return (
    <div className="App">
      <h1>Cadastro de Funcionários</h1>

      {/* Container adicional com uma descrição */}
      <div className="info-container">
        <p>Bem-vindo ao sistema de gerenciamento de funcionários. Aqui você pode cadastrar, editar, buscar e exportar informações dos funcionários.</p>
      </div>

      {/* Botões para mostrar as seções */}
      <div className="section-buttons">
        <button style={{ margin: "10px" }} onClick={() => setShowCadastro(!showCadastro)}>
          {showCadastro ? 'Esconder Cadastro' : 'Mostrar Cadastro'}
        </button>
        <button style={{ margin: "10px" }} onClick={() => setShowBusca(!showBusca)}>
          {showBusca ? 'Esconder Busca' : 'Mostrar Busca'}
        </button>
        <button style={{ margin: "10px" }} onClick={() => setShowLista(!showLista)}>
          {showLista ? 'Esconder Lista' : 'Mostrar Lista'}
        </button>
        <button style={{ margin: "10px" }} onClick={() => setShowExportacao(!showExportacao)}>
          {showExportacao ? 'Esconder Exportação' : 'Mostrar Exportação'}
        </button>

        {/* Botão para limpar o localStorage */}
        <button style={{ margin: "10px" }} onClick={limparStorage}>Limpar Dados</button>
      </div>

      {/* Exibindo as seções com base nos estados */}
      {showCadastro && (
        <div className="area-formulario">
          <h2>Cadastro de Funcionário</h2>
          <FormularioCadastro setFuncionarios={setFuncionarios} funcionarios={funcionarios} />
        </div>
      )}

      {showBusca && (
        <div className="area-busca">
          <h2>Busca de Funcionários</h2>
          <BuscaFuncionarios funcionarios={funcionarios} />
        </div>
      )}

      {showLista && (
        <div className="area-lista">
          <h2>Lista de Funcionários Cadastrados</h2>
          <ListaDeFuncionarios 
            funcionarios={funcionarios}
            removerFuncionario={removerFuncionario}
            editarFuncionario={editarFuncionario}
          />
        </div>
      )}

      {showExportacao && (
        <div className="area-exportacao">
          <h2>Exportar Dados</h2>
          <Exportacao funcionarios={funcionarios} />
        </div>
      )}

      {/* Botão "O que é LGPD?" */}
      <button className="lgpd-btn" onClick={() => setShowLgpdModal(true)}>
        O que é LGPD?
      </button>

      {/* Modal LGPD */}
      {showLgpdModal && (
        <div className="lgpd-modal">
          <div className="lgpd-modal-content">
            <h2>O que é LGPD?</h2>
            <p>
              A Lei Geral de Proteção de Dados (LGPD) é uma legislação brasileira que regula
              o tratamento de dados pessoais de indivíduos no Brasil. Ela foi criada com o objetivo
              de garantir a privacidade e a proteção dos dados pessoais, estabelecendo regras para
              a coleta, armazenamento, tratamento e compartilhamento de informações.
            </p>
            <p>
              A LGPD exige que empresas e organizações tratem os dados de forma transparente e
              responsável, e que forneçam aos indivíduos mais controle sobre seus dados pessoais.
            </p>
            <button onClick={closeLgpdModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
