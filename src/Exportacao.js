import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const Exportacao = ({ funcionarios }) => {

  // Função para exportar para PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lista de Funcionários', 14, 20);

    let y = 30; // Começar na linha 30

    // Cabeçalho do PDF
    doc.setFontSize(12);
    doc.text('Nome', 14, y);
    doc.text('Função', 60, y);
    doc.text('Salário', 120, y);
    doc.text('Admissão', 160, y);
    doc.text('Demissão', 210, y);
    
    y += 10; // Pular uma linha

    // Dados dos funcionários
    funcionarios.forEach((funcionario) => {
      doc.text(funcionario.nome, 14, y);
      doc.text(funcionario.funcao, 60, y);
      doc.text(funcionario.salario, 120, y);
      doc.text(funcionario.admissao, 160, y);
      doc.text(funcionario.demissao || 'Não aplicável', 210, y);
      y += 10;
    });

    doc.save('funcionarios.pdf');
  };

  // Função para exportar para Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(funcionarios.map((funcionario) => ({
      Nome: funcionario.nome,
      Função: funcionario.funcao,
      Salário: funcionario.salario,
      Admissão: funcionario.admissao,
      Demissão: funcionario.demissao || 'Não aplicável',
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Funcionários');
    
    // Gerar e baixar o arquivo Excel
    XLSX.writeFile(wb, 'funcionarios.xlsx');
  };

  return (
    <div>
      <button onClick={exportToPDF} style={{ backgroundColor: '#FF5722' }}>
        Exportar para PDF
      </button>
      <button onClick={exportToExcel} style={{ backgroundColor: '#4CAF50', marginLeft: '10px' }}>
        Exportar para Excel
      </button>
    </div>
  );
};

export default Exportacao;
