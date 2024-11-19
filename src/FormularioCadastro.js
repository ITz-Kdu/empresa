import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FormularioCadastro = ({ setFuncionarios, funcionarios }) => {
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [demissao, setDemissao] = useState('');

  // Função para validar o salário
  const validarSalario = (salario) => {
    return !isNaN(salario) && parseFloat(salario) > 0;
  };

  // Função para adicionar ou editar funcionário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Valida o salário
    if (!validarSalario(salario)) {
      Swal.fire('Erro', 'Salário inválido. Deve ser um número positivo.', 'error');
      return;
    }

    const novoFuncionario = {
      id: Date.now(), // Gerando um id único com base no timestamp
      nome,
      funcao,
      salario: `R$ ${parseFloat(salario).toFixed(2)}`,
      admissao,
      demissao,
    };

    setFuncionarios([...funcionarios, novoFuncionario]);

    // Limpar o formulário após o envio
    setNome('');
    setFuncao('');
    setSalario('');
    setAdmissao('');
    setDemissao('');
    Swal.fire('Sucesso', 'Funcionário cadastrado com sucesso!', 'success');
  };

  return (
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
  );
};

export default FormularioCadastro;
