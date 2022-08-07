// import { useEffect } from "react";
import ProductCart from "../ProductCart";

function Cart({ currentSale, setCurrentSale, valorTotal }) {
  const renderValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorTotal);

  function clearCart() {
    setCurrentSale([]);
  }


  function deleteProduct(id) {
    const hamburguerCart = currentSale.find(
      (hamburguer) => hamburguer.id === id
    );

    console.log(hamburguerCart);

    const verificacao = currentSale.some((hamburguer) => hamburguer.id === id);

    const repeat = [...currentSale];

    if (verificacao === true && hamburguerCart.count > 1) {
      hamburguerCart.count = hamburguerCart.count - 1;
      setCurrentSale(repeat);
    } else if (verificacao === true && hamburguerCart.count === 1) {
      const newCart = currentSale.filter((hamburguer) => hamburguer.id !== id);
      setCurrentSale(newCart);
    }
  }

  if (currentSale.length < 1) {
    return (
      <div className="cartBox">
        <div className="topCartBox">
          <span className="textoTopCartBox">Carrinho de compras</span>
        </div>
        <div className="bottomCartBox">
          <h3 className="sacolaVazia">
            <strong>Sua sacola está vazia</strong>
          </h3>
          <span className="adicioneItens">adicione itens</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cartBox">
        <div className="topCartBox">
          <span className="textoTopCartBox">Carrinho de compras</span>
        </div>
        <div className="bottomCartBox--comItens">
          <ul className="listCart">
            {currentSale.map((hamburguer) => (
              <ProductCart
                key={hamburguer.id}
                id={hamburguer.id}
                img={hamburguer.img}
                name={hamburguer.name}
                category={hamburguer.category}
                price={hamburguer.price}
                count={hamburguer.count}
                deleteProduct={deleteProduct}
              />
            ))}
          </ul>
          <div className="valorTotalBox">
            <div className="valorTotalBoxInfos">
              <h5 className="valorTotalBoxInfos-total">Total</h5>
              <h5 className="precoTotal">{renderValue}</h5>
            </div>
            <button onClick={clearCart} className="removerTodos">
              Remover todos
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
