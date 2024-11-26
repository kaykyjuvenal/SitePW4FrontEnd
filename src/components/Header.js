import React from 'react';

function Header(){
    return (
        <header style={headerStyle}>
            <h1> Página de Gerenciamento do Hospital Bill Gates </h1>
        </header>
    );
}

const headerStyle = {
    textAlign: 'center',
    padding: '1em 0',
    left: 0,
    top: 0,
    width: '100%',
    
};

export default Header;



