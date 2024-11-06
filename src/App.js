import React, { useState } from 'react';
import './App.css';

function FormularioFuncionario() {
  // Definindo os estados para os campos
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [demissao, setDemissao] = useState('');
  const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar os funcionários
  const [mensagem, setMensagem] = useState(''); // Mensagem de feedback ao usuário
  const [editando, setEditando] = useState(false); // Para verificar se estamos editando um funcionário
  const [funcionarioEditando, setFuncionarioEditando] = useState(null); // Funcionario que está sendo editado

  // Função para validar se o salário é válido
  const validarSalario = (salario) => {
    return !isNaN(salario) && parseFloat(salario) > 0;
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificando se o salário é válido
    if (!validarSalario(salario)) {
      setMensagem('Salário inválido. Deve ser um número positivo.');
      return;
    }

    const funcionario = {
      nome,
      funcao,
      salario: `R$ ${parseFloat(salario).toFixed(2)}`,
      admissao,
      demissao,
    };

    if (editando) {
      // Editando um funcionário existente
      setFuncionarios(funcionarios.map((f) =>
        f.id === funcionarioEditando.id ? { ...f, ...funcionario } : f
      ));
      setMensagem('Funcionário atualizado com sucesso!');
    } else {
      // Adicionando um novo funcionário
      const novoFuncionario = { ...funcionario, id: Date.now() };
      setFuncionarios([...funcionarios, novoFuncionario]);
      setMensagem('Funcionário cadastrado com sucesso!');
    }

    // Limpa os campos após o envio
    setNome('');
    setFuncao('');
    setSalario('');
    setAdmissao('');
    setDemissao('');
    setEditando(false);
    setFuncionarioEditando(null);
  };

  // Função para editar um funcionário
  const handleEdit = (funcionario) => {
    setNome(funcionario.nome);
    setFuncao(funcionario.funcao);
    setSalario(funcionario.salario.replace('R$', '').trim()); // Remover o "R$" para edição
    setAdmissao(funcionario.admissao);
    setDemissao(funcionario.demissao || '');
    setEditando(true);
    setFuncionarioEditando(funcionario);
  };

  // Função para remover um funcionário
  const handleRemove = (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja remover este funcionário?');
    if (confirmacao) {
      setFuncionarios(funcionarios.filter((f) => f.id !== id));
      setMensagem('Funcionário removido com sucesso!');
    }
  };

  return (
    <div>
      <h1>{editando ? 'Editar Funcionário' : 'Cadastro de Funcionário'}</h1>

      {/* Exibe a mensagem de sucesso ou erro */}
      {mensagem && <p>{mensagem}</p>}

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

        <button type="submit">{editando ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}</button>
      </form>

      <h2>Lista de Funcionários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Salário</th>
            <th>Data de Admissão</th>
            <th>Data de Demissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.funcao}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.admissao}</td>
              <td>{funcionario.demissao || 'Não demitido'}</td>
              <td>
                <button onClick={() => handleEdit(funcionario)}>Editar</button>
                <button onClick={() => handleRemove(funcionario.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormularioFuncionario;
