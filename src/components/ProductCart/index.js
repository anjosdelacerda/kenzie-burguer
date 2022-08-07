function ProductCart(props) {
  return (
    <div className="burguerBox">
      <div className="topBurguerBox">
        <img className="imgBurguer" src={props.img} alt={props.name} />
      </div>
      <div className="bottomBurguerBox">
        <div className="textoBurguer">
          <div className="infoBurguer">
            <div className="nomeBurguer">
              <h3>{props.name}</h3>
            </div>
            <div className="categoriaBurguer">
              <span>{props.category}</span>
            </div>
            <div className="countBurguer">
              <span>{props.count}</span>
            </div>
            <div className="precoBurguer">
              <span>R$ {props.price}</span>
            </div>
          </div>
          <button
            onClick={() => props.deleteProduct(props.id)}
            className="buttonBurguer"
            id={props.id}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
