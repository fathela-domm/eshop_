const ShopGridComponent = (props) => {
    const SEARCH_TERM = window.location.search.slice(8);
    const regexp = new RegExp(`${SEARCH_TERM}`, "gi");
    const [products, setProducts] = React.useState([]);
    const [matches, setMatches] = React.useState(false);
    const filter = document.getElementById("filterProducts");
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            let results = [];
            res.products.map(product => {
                if (product.name.match(regexp)) {
                    setMatches(true);
                    results.push(product);
                }
            });
            SEARCH_TERM ? setProducts(results) : setProducts(res.products);
        })
        filter.onchange = (e) => {
            renderShopGrid("{{csrf_token}}");
        }
    }, []);

    if (!matches && SEARCH_TERM) {
        return (
            <div className="col-sm-12 mt-4">
                <span className="text-danger">
                    The search value <span className="text-secondary">{"<" + SEARCH_TERM + ">"}</span> failed to return valid results.
                    <br />
                    <small className="text-default">{"Please try another term."}</small>
                </span>
                <div className="mt-4 product-action-2">
                    <a href="/shopGrid" className="inner-link">Go back</a>
                </div>
            </div>
        )
    }
    else {
        return products.map((product, index) => {
            return index < +filter.value && (
                <div key={Math.random()} className="col-sm-4">
                    <div className="m-2  col-12">
                        <div className="single-product" >
                            <div className="product-img">
                                <div>
                                    <img className="default-img" style={{ height: "250px", width: "200px" }} src={product.image} alt="#" />
                                </div>
                                <div className="button-head">
                                    <div className="product-action flex">
                                        <a onClick=
                                            {
                                                () => {
                                                    renderCartModalComponent(props.token, product.id, props.user);
                                                }
                                            } data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                            href="#"><i className=" ti-eye"></i><span>Double Click To View Quick Shop</span></a>
                                        <a title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to
                                Wishlist</span></a>
                                        <a title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to
                                Compare</span></a>
                                    </div>
                                    <div className="product-action-2 add" style={{ display: "none" }}>
                                        <a title="Add to cart" href="#">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="product-content">
                                <h3><small>{product.name}</small></h3>
                                <div className="product-price">
                                    <span>Ksh: {product.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }
}

const renderShopGrid = (token, user) => {
    ReactDOM.render(<ShopGridComponent user={user} token={token} />, document.getElementById("shopGrid"))
}