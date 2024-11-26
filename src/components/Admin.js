import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { MdDeleteForever } from "react-icons/md";
import styles from './Admin.modulo.css';


function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoMedico, setNovoMedico] = useState({ Usuario: '', Senha: '', cep:''});
  const [novoPaciente, setNovoPaciente] = useState({ Usuario: '', Senha: '', cep:'' });
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const baseUrl = 'https://sitepw4kaykyewaleska.vercel.app';
  const baseFrontEnd = 'https://frontpw4kaykyewaleska.vercel.app/admin';
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);

  const APICEP = "https://viacep.com.br/ws/"

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${baseUrl}/usuarios`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();
        setUsuarios(data.Pacientes);
        setMedicos(data.Medicos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleAddPaciente = async () => {
    try {
      const response = await fetch(`${baseUrl}/paciente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: novoPaciente.Usuario,
          password: novoPaciente.Senha,
          cep: novoPaciente.cep
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar paciente');
      }
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
    window.location.href = `${baseFrontEnd}`
  };
  const handleFetch = async (cep) => {
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
  
  // Função para adicionar médico
  const handleAddMedico = async () => {
    try {
      const response = await fetch(`${baseUrl}/medico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: novoMedico.Usuario,
          password: novoMedico.Senha,
          cep: novoMedico.cep
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar médico');
      }
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Erro ao adicionar médico:', error);
    }
    window.location.href = `${baseFrontEnd}`
  };

  const handleRemoveMedico = async (usuario) => {
    try {
      const response = await fetch(`${baseUrl}/deleteMedico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: usuario }),
      });

      if (!response.ok) {
        throw new Error('Erro ao remover médico');
      }

      // Atualizar a página para refletir a exclusão
      window.location.reload();
    } catch (error) {
      console.error('Erro ao remover médico:', error);
    }
    window.location.href = `${baseFrontEnd}`
  };

  // Função para deletar um paciente
  const handleRemovePaciente = async (usuario) => {
    try {
      const response = await fetch(`${baseUrl}/deletePaciente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: usuario }),
      });

      if (!response.ok) {
        throw new Error('Erro ao remover paciente');
      }

      // Atualizar a página para refletir a exclusão
      window.location.reload();
    } catch (error) {
      console.error('Erro ao remover paciente:', error);
    }
    window.location.href = `${baseFrontEnd}`

  };

  const handleInputChange = (e, type, field) => {
    const { value } = e.target;
    if (type === 'paciente') {
      setNovoPaciente(prev => ({ ...prev, [field]: value }));
    } else if (type === 'medico') {
      setNovoMedico(prev => ({ ...prev, [field]: value }));
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <div>
      <Header/>
      <h1>Painel de Administração</h1>

      <h2>Adicionar Novo Médico</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={novoMedico.Usuario}
        onChange={(e) => handleInputChange(e, 'medico', 'Usuario')}
      />
      <input
        type="password"
        placeholder="Senha"
        value={novoMedico.Senha}
        onChange={(e) => handleInputChange(e, 'medico', 'Senha')}
      />
            <input
        type="text"
        placeholder="Cep"
        value={novoMedico.Senha}
        onChange={(e) => handleInputChange(e, 'medico', 'cep')}
      />
      <button onClick={handleAddMedico}>Adicionar Médico</button>

      <h2>Adicionar Novo Paciente</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={novoPaciente.Usuario}
        onChange={(e) => handleInputChange(e, 'paciente', 'Usuario')}
      />
      <input
        type="password"
        placeholder="Senha"
        value={novoPaciente.Senha}
        onChange={(e) => handleInputChange(e, 'paciente', 'Senha')}
      />
                  <input
        type="text"
        placeholder="Cep"
        value={novoPaciente.cep}
        onChange={(e) => handleInputChange(e, 'paciente', 'cep')}
      />
      <button onClick={handleAddPaciente}>Adicionar Paciente</button>
      
      <h2>Lista de Médicos</h2>

      <ul>
        {medicos.map((medico) => (
          <li key={medico.Usuario}>
            <div id="imagemUsuario"><img 
              src={medico.imagem} 
              alt="Imagem do Médico" 
              style={{ width: '200px', height: '200px' }} 
            />
            <br></br>
            Usuário: {medico.Usuario}, Senha: {medico.Senha}, cep: {medico.cep}
            
            <button onClick={handleFetch(medico.cep)}>Mostrar Endereco</button>
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

            <button className='buttonlixeira' onClick={() => handleRemoveMedico(medico.Usuario)}><MdDeleteForever /></button>
          </li>
        ))}
      </ul>

      <h2>Lista de Pacientes</h2>
      <ul>
        {usuarios.map((paciente) => (
          <li key={paciente.Usuario}>
            <div id="imagemUsuario"><img 
              src={paciente.imagem} 
              alt="Imagem do Paciente" 
              style={{ width: '200px', height: '200px' }} 
            />
            <br></br>
            Usuário: {paciente.Usuario}, Senha: {paciente.Senha}, Cep: {paciente.cep}
            <button onClick={handleFetch(paciente.cep)}>Mostrar Endereco</button>
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
                        
            <button className='buttonlixeira' onClick={() => handleRemovePaciente(paciente.Usuario)}><MdDeleteForever /></button>
            </div>
          </li>

        ))}
      </ul>
      <button className='buttonvoltar' onClick={() => { window.location.href = `${baseFrontEnd}`; }}>Voltar</button>
      <Footer/>
    </div>
    

  );
}

export default Admin;