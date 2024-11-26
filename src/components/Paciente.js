import React, { useEffect,useState } from 'react';
import { saveAs } from 'file-saver';  // Importa a biblioteca file-saver
import Footer from './Footer';
import Header from './Header';
import styles from './Admin.modulo.css';


function Paciente() {
  const [nomePaciente, setNomePaciente] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [error, setError] = useState('');
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);


  const baseUrl = "https://site-tc-1-back-end-f2y7.vercel.app"
  const APICEP = "https://viacep.com.br/ws/"

  const handleFetch = async () => {
    setError(null); // Limpa o erro anterior
    setData(null); // Limpa os dados anteriores

    try {
      const response = await fetch(`${APICEP}${cep}/json/`);
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleNomeChange = (e) => {
    setNomePaciente(e.target.value);
  };

  const handleDataChange = (e) => {
    setDataConsulta(e.target.value);
  };

  const handleHorarioChange = (e) => {
    setHorarioConsulta(e.target.value);
  };

  const handleTipoChange = (e) => {
    setTipoConsulta(e.target.value);
  };

  const handleSaveConsulta = () => {
    if (!nomePaciente || !dataConsulta || !horarioConsulta || !tipoConsulta) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    // Verifica se a data da consulta é maior que a data atual
    const dataAtual = new Date();
    const dataSelecionada = new Date(dataConsulta);

    if (dataSelecionada <= dataAtual) {
      setError('A data da consulta deve ser maior que a data atual.');
      return;
    }

    // Cria o conteúdo do arquivo
    const consulta = `Nome do Paciente: ${nomePaciente}
        Rua/Logradouro: ${data.logradouro}
        Bairro: ${data.bairro}
        Cidade: ${data.localidade}
        Estado: ${data.uf}
    Data da Consulta: ${dataConsulta}
    Horário da Consulta: ${horarioConsulta}
    Tipo da Consulta: ${tipoConsulta}
    ==============================
    `;
    const blob = new Blob([consulta], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Consultas.txt');

    // Limpa os campos após salvar
    setNomePaciente('');
    setDataConsulta('');
    setHorarioConsulta('');
    setTipoConsulta('');
    setError('');
    alert('Consulta salva com sucesso!');
  };

  return (
    <div>
      <Header/>
      <h1>Agendar Consulta</h1>

      <div>
        <label>
          Nome do Paciente:
          <input
            type="text"
            value={nomePaciente}
            onChange={handleNomeChange}
            placeholder="Digite o nome do paciente"
          />
        </label>
      </div>
      <div>
        <h1>Buscar CEP do médico:</h1>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
        />
        <button onClick={handleFetch}>Buscar</button>

        {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
        {data && (
          <div>
            <h2>Endereço:</h2>
            <p>Rua: {data.logradouro}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Cidade: {data.localidade}</p>
            <p>Estado: {data.uf}</p>
          </div>
        )}
      </div>
      <div>
        <label>
          Data da Consulta:
          <input
            type="date"
            value={dataConsulta}
            onChange={handleDataChange}
          />
        </label>
      </div>

      <div>
        <label>
          Horário da Consulta:
          <input
            type="time"
            value={horarioConsulta}
            onChange={handleHorarioChange}
          />
        </label>
      </div>

      <div>
        <label>
          Tipo da Consulta:
          <input
            type="text"
            value={tipoConsulta}
            onChange={handleTipoChange}
            placeholder="Digite o tipo de consulta"
          />
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleSaveConsulta}>Salvar Consulta</button>
      <button className='buttonvoltar' onClick={() => { window.location.href = "http://localhost:3001/login"; }}>Voltar</button>
      <Footer/>

    </div>
  );
}

export default Paciente;