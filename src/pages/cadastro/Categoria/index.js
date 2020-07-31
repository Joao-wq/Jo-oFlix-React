import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormFiel from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',

  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(infoDoEvento) {
    setValue(
      infoDoEvento.target.getAttribute('name'),
      infoDoEvento.target.value,
    );
  }

  useEffect(() => {
    console.log('alo alo brazil');
    const URL_TOP = 'http://localhost:8080/categorias';
    
    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta
        ]);
      });
    /*setTimeout(() => {
      setCategorias([
        ...categorias,
        {
          id: 1,
          nome: 'FPS',
          descricao: 'Uma categoria show',
          cor: '#b54e2f',
        },
        {
          id: 2,
          nome: 'MOBA',
          descricao: 'outra categoria show',
          cor: '#b54e2f',
        },
      ]);
    }, 4 * 1000);*/
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infoDoEvento) {
        infoDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}
      >

        <FormFiel
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />
        <FormFiel
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormFiel
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>
      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
