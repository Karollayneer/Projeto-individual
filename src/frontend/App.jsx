import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './Navbar.css'

function MeuFormulario() {
  const [nome, setNome] = useState('');
  const [descrição, setDescrição] = useState('');
  const [data_de_fabricação, setData_de_fabricação] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [Produto, setProduto] = useState([]);
  const [isTransparent, setTransparent] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  function handleScroll() {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 0) {
      setTransparent(true);
    } else if (scrollTop === 0) {
      setTransparent(false);
    }
  }



  //Timer para sumir a mensagem
  useEffect(() => {
    let timer;
    if (mensagem) {
      timer = setTimeout(() => {
        setMensagem('');
      }, 500);
    }
  })

  //Metodo post
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Tempo pra pagina dar reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
    const response = await fetch('http://localhost:3000/Produto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, descrição, data_de_fabricação })
    });

    if (response.ok) {
      setMensagem('Cadastrado com sucesso!');
    } else {
      setMensagem('Erro ao Cadastrar!');
    }
    const data = await response.text();
    console.log(data);
  };


  //Metodo get
  useEffect(() => {
    async function fetchProduto() {
      const response = await fetch('http://localhost:3000/Produto');
      const data = await response.json();
      setProduto(data);
    }

    fetchProduto();
  }, []);


  //Metodo delete
  const handleRemover = async (id) => {
    const response = await fetch(`http://localhost:3000/Produto/id/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setMensagem('Removido com sucesso!');
      setProduto(Produto.filter(coletor => coletor.id !== id));
    } else {
      setMensagem('Erro ao Remover!');
    }
  }

  return (
    <div>

      <div className={styles.container}>
        <p className={styles.titulo}>Cadastrar de Produto</p>
        {mensagem && <p>{mensagem}</p>}
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label>
            Nome:
          </label>
          <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} className={styles.input} />

          <label>
            Descrição:
          </label>
          <input type="descrição" value={descrição} onChange={(event) => setDescrição(event.target.value)} className={styles.input} />

          <label>
            Data de fabricação:
          </label>
          <input type="date" className={styles.date} value={data_de_fabricação} onChange={(event) => setData_de_fabricação(event.target.value)} />

          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className={styles.containerGet}>
        <ul>
          {Produto.map(Produto => (
            <li key={Produto.id}>
              <p><b>Nome:</b> {Produto.nome}</p>
              <p><b>Descrição:</b> {Produto.descrição}</p>
              <p><b>Data de Fabricação:</b> {Produto.data_de_fabricação}</p>
              <Button variant='danger' onClick={() => handleRemover(Produto.id)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MeuFormulario;