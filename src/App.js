import "./App.css";
import { useEffect, useState } from "react";
import "./reset.css";
import "./style.css";
import Cart from "./components/Cart";
import Productlist from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [pesquisa, setPesquisa] = useState();

  // console.log(filteredProducts);

  const valorTotal = currentSale.reduce(
    (acc, hamburguer) => hamburguer.price * hamburguer.count + acc,
    0
  );

  const [cartTotal, setCartTotal] = useState(valorTotal);

  useEffect(() => {
    const renderValue = currentSale.reduce(
      (acc, hamburguer) => hamburguer.price * hamburguer.count + acc,
      0
    );
    setCartTotal(renderValue);
  }, [currentSale]);

  useEffect(() => {
    fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
      .then((response) => response.json())
      .then((response) => setProducts(response));
    // .catch((err) => console.log(err));
  }, []);

  function handleSearch(event) {
    console.log(pesquisa + " observa aqui nando");

    if (pesquisa === undefined || pesquisa.length <= 1) {
      setFilteredProducts(products);
    }

    setPesquisa(event.target.value);

    const produtoPesquisado = products.filter(
      (item) =>
        item.name.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.category.toLowerCase().includes(pesquisa.toLowerCase())
    );

    setFilteredProducts(produtoPesquisado);
  }

  // setProducts(produtoPesquisado);

  // console.log(produtoPesquisado);

  // setFilteredProducts(produtoPesquisado);

  // eslint-disable-next-line eqeqeq

  // function showProducts() {

  //     const busca = products.includes(
  //       (item) => item.name.toLowerCase() === filteredProducts.toLowerCase()
  //     );
  //     console.log(busca);
  //     setProducts(busca);

  // }

  function handleClickAddToCart(id) {
    const verificacao = currentSale.every((hamburguer) => hamburguer.id !== id);

    if (verificacao === true) {
      const compra = products?.find((item) => item.id === id);

      compra.count = 1;

      setCurrentSale([...currentSale, compra]);
      // valorTotal();
    } else {
      const hamburguerPosition = currentSale.findIndex(
        (hamburguer) => hamburguer.id === id
      );
      // console.log(hamburguerPosition);

      // console.log(currentSale[hamburguerPosition].count);

      const newCurrentSale = [...currentSale];

      newCurrentSale[hamburguerPosition].count += 1;

      // console.log(newCurrentSale[hamburguerPosition]);

      setCurrentSale(newCurrentSale);
    }
  }

  return (
    <div className="universalBox">
      <div className="menu">
        <div className="logoBox">
          <div className="logo">
            <h1>
              <span className="burguer">Burguer</span>{" "}
              <span className="kenzie">kenzie</span>
            </h1>
          </div>
        </div>
        <>
          <div className="containerInputPesquisa">
            <input
              className="menuPesquisa"
              type="text"
              placeholder="Digitar pesquisa"
              value={pesquisa}
              onChange={(event) => handleSearch(event)}
            ></input>
            <button className="buttonPesquisa">Pesquisar</button>
          </div>
        </>
      </div>
      <div className="espacamentoContent">
        <Productlist
          products={filteredProducts.length === 0 ? products : filteredProducts}
          handleClick={handleClickAddToCart}
        />
        <Cart
          currentSale={currentSale}
          setCurrentSale={setCurrentSale}
          valorTotal={cartTotal}
          setCartTotal={setCartTotal}
        />
      </div>
    </div>
  );
}

export default App;

/* como passar uma função handleClick do app para o product.js que recebe a props do productList? */
