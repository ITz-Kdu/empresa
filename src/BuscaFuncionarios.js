import React, { useState } from 'react';

const BuscaFuncionarios = ({ funcionarios }) => {
  const [search, setSearch] = useState('');
  const [filteredFuncionarios, setFilteredFuncionarios] = useState(funcionarios);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredFuncionarios(
      funcionarios.filter(
        (funcionario) =>
          funcionario.nome.toLowerCase().includes(query) ||
          funcionario.funcao.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar por nome ou função"
      />
      <ul>
        {filteredFuncionarios.map((funcionario) => (
          <li key={funcionario.id}>
            {funcionario.nome} - {funcionario.funcao} - {funcionario.salario} - {funcionario.admissao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuscaFuncionarios;
