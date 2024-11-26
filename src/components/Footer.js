import React from 'react';

function Footer(){
    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} Meu site. Todos os direitos reservados</p>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
    padding: '0em 0',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    
};

export default Footer;