import React, { useState } from 'react';
import './App.css';

function FormularioFuncionario() {
  // Definindo os estados para os campos
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [demissao, setDemissao] = useState('');

  // Função para lidar com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const funcionario = {
      nome,
      funcao,
      salario,
      admissao,
      demissao
    };
    
    // Exibe as informações no console (ou pode enviar para um servidor)
    console.log(funcionario);
    
    // Limpa os campos após o envio
    setNome('');
    setFuncao('');
    setSalario('');
    setAdmissao('');
    setDemissao('');
  };

  return (
    <div>
      <h1>Cadastro de Funcionário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do funcionário"
            required
          />
        </div>

        <div>
          <label>Função:</label>
          <input
            type="text"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            placeholder="Digite a função"
            required
          />
        </div>

        <div>
          <label>Salário:</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Digite o salário"
            required
          />
        </div>

        <div>
          <label>Data de Admissão:</label>
          <input
            type="date"
            value={admissao}
            onChange={(e) => setAdmissao(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data de Demissão (se aplicável):</label>
          <input
            type="date"
            value={demissao}
            onChange={(e) => setDemissao(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
}

export default FormularioFuncionario;
