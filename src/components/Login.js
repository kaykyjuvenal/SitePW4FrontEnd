import { useState } from "react";
import styles from "./Login.modulo.css";

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    
    const handleLogin = async (e) => {
        e.preventDefault();  // Previne o comportamento padrão do formulário

        try {
            // Faz a requisição POST para o endpoint /login na porta 3000
            const response = await fetch("https://site-tc-1-back-end-f2y7.vercel.app/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, password }),  // Envia user e password como JSON
            });

            const data = await response.json();  // Faz o parsing da resposta JSON

            if (response.ok) {
                // Redireciona o usuário para a página apropriada com base no tipoDeAcesso
                window.location.href = data.redirectTo;  // Redireciona usando window.location
            } else {
                // Exibe mensagem de erro se as credenciais forem inválidas
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login. Tente novamente.');
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h1>Bem-vindo ao sistema de gerenciamento do Hospital Bill Gates</h1>
            <h2>Informar credenciais de acesso</h2>
            <form className={styles.loginform} onSubmit={handleLogin}>
                <input
                    type='text'
                    name='user'
                    placeholder='User'
                    required
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='btnlogin'>Login</button>
            </form>
        </div>
    );
}

export default Login;