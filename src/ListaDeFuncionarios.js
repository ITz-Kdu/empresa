import React, { useState } from 'react';

const ListaDeFuncionarios = ({ funcionarios, removerFuncionario, editarFuncionario }) => {
  const [editMode, setEditMode] = useState(null);
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [demissao, setDemissao] = useState('');

  const handleEdit = (funcionario) => {
    setEditMode(funcionario.id);
    setNome(funcionario.nome);
    setFuncao(funcionario.funcao);
    setSalario(funcionario.salario);
    setAdmissao(funcionario.admissao);
    setDemissao(funcionario.demissao || '');
  };

  const handleSave = (id) => {
    if (!nome || !funcao || !salario || !admissao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    editarFuncionario(id, nome, funcao, salario, admissao, demissao);
    setEditMode(null);
    setNome('');
    setFuncao('');
    setSalario('');
    setAdmissao('');
    setDemissao('');
  };

  if (funcionarios.length === 0) {
    return <p>Não há funcionários cadastrados.</p>;
  }

  return (
    <div className="lista-container">
      <table className="lista-funcionarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Salário</th>
            <th>Admissão</th>
            <th>Demissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>
                {editMode === funcionario.id ? (
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                  />
                ) : (
                  funcionario.nome
                )}
              </td>
              <td>
                {editMode === funcionario.id ? (
                  <input
                    type="text"
                    value={funcao}
                    onChange={(e) => setFuncao(e.target.value)}
                    placeholder="Função"
                  />
                ) : (
                  funcionario.funcao
                )}
              </td>
              <td>
                {editMode === funcionario.id ? (
                  <input
                    type="number"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Salário"
                  />
                ) : (
                  funcionario.salario
                )}
              </td>
              <td>
                {editMode === funcionario.id ? (
                  <input
                    type="date"
                    value={admissao}
                    onChange={(e) => setAdmissao(e.target.value)}
                    placeholder="Data de Admissão"
                  />
                ) : (
                  funcionario.admissao
                )}
              </td>
              <td>
                {editMode === funcionario.id ? (
                  <input
                    type="date"
                    value={demissao}
                    onChange={(e) => setDemissao(e.target.value)}
                    placeholder="Data de Demissão"
                  />
                ) : (
                  funcionario.demissao || 'Não aplicável'
                )}
              </td>
              <td>
                {editMode === funcionario.id ? (
                  <button onClick={() => handleSave(funcionario.id)}>Salvar</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(funcionario)}>Editar</button>
                    <button onClick={() => removerFuncionario(funcionario.id)}>Remover</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDeFuncionarios;
