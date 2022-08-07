import Product from "../Product";

function Productlist({ products, handleClick }) {
  return (
    <div className="vitrine">
      <ul className="listaVitrine">
        {products.map((hamburguer) => (
          <Product
            key={hamburguer.id}
            id={hamburguer.id}
            img={hamburguer.img}
            name={hamburguer.name}
            category={hamburguer.category}
            price={hamburguer.price}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default Productlist;
