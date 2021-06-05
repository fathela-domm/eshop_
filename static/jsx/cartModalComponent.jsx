const CartModalComponent = (props) => {
    const [product, setProduct] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [cart, setCart] = React.useState([]);
    const quantityRef = React.useRef(null);
    const loadApi = () => {
        useLoadWholeApi("").then(res => {
            res.users.map(user => {
                user.id == props.user && setUser(user);
                async function loadCart() {
                    return (await fetch(window.location.origin + "/api/create_cart")).json();
                }
                loadCart().then(res => {
                    res && res.map(jsonCartSingleValue => {
                        jsonCartSingleValue.product == props.productSelectedId && jsonCartSingleValue.user == user.id && setCart(jsonCartSingleValue);
                    });
                }).catch(e => console.error(e));
            });
            res.products.forEach(product => {
                product.id == props.productSelectedId && setProduct(product);
            });

        });
    }
    React.useLayoutEffect(() => {
        loadApi();
    }, [props.productSelectedId]);

    function addOneToQuantity() {
        if (quantityRef.current.value < +product.quantity_in_stock - 5) quantityRef.current.value = +quantityRef.current.value + 1;
    }

    function minusOneFromQuantity() {
        if (quantityRef.current.value > 1) quantityRef.current.value = +quantityRef.current.value - 1;
    }

    function addToCart(token) {
        if (quantityRef.current.value > 0) {
            const JSONData = {
                user: props.user,
                product: props.productSelectedId,
                quantity_to_purchase: quantityRef.current.value,
            }
            let productIsInCart = false;
            if (user.users_carts.length == 0) {
                console.log("Creating new Cart");
                postDataToAPI(JSONData, token, "create_cart");
            }
            else {
                user.users_carts.map(cart => {
                    if (cart.product_id == props.productSelectedId) {
                        productIsInCart = true;
                        console.log("updating existing cart");
                        updateDataInApi("api/cart/update", cart.id, token, JSONData);
                    }
                });
                productIsInCart == false && postDataToAPI(JSONData, token, "create_cart");
            }
        }
        else {
            quantityRef.current.value = 1;
        }
        loadApi();
        renderUserCartComponent(props.token, props.user)
    }
    return product !== null && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" id="closeCartModal" data-dismiss="modal" aria-label="Close"><span className="ti-close"
                            aria-hidden="true"></span></button>
                    </div>
                    <div className="modal-body">
                        <div className="row no-gutters">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-gallery">
                                    <div className="quickview-slider-active">
                                        <div className="single-slider">
                                            <img src={product.image} alt="#" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <div className="quickview-content">
                                    <h2>{product.name}</h2>
                                    <div className="quickview-ratting-review">
                                        <div className="quickview-ratting-wrap">
                                            <div className="quickview-ratting">
                                                <i className="yellow fa fa-star"></i>
                                                <i className="yellow fa fa-star"></i>
                                                <i className="yellow fa fa-star"></i>
                                                <i className="yellow fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <a href="#"> (1 customer review)</a>
                                        </div>
                                        <div className="quickview-stock">
                                            <span><i className="fa fa-check-circle-o"></i> in stock</span>
                                        </div>
                                    </div>
                                    <h3>Ksh: {product.price}</h3>

                                    <div className="quantity">
                                        <div className="input-group">
                                            <div onClick={minusOneFromQuantity} className="button minus">
                                                <button type="button" className="btn btn-primary btn-number" disabled="disabled"
                                                    data-type="minus" data-field="quant[1]">
                                                    <i className="ti-minus"></i>
                                                </button>
                                            </div>
                                            <input type="text" min={1} max={+product.quantity_in_stock - 5 | 1} ref={quantityRef} className="input-number"
                                                defaultValue={"1"} />
                                            <div onClick={addOneToQuantity} className="button plus">
                                                <button type="button" className="btn btn-primary btn-number" data-type="plus"
                                                    data-field="quant[1]">
                                                    <i className="ti-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-to-cart">
                                        <button id="addToCart" data-dismiss="modal" className="close" aria-label="Close" onClick={() => addToCart(props.token)} className="btn">Add to cart</button>
                                    </div>
                                    <div className="default-social">
                                        <h4 className="share-now">Share:</h4>
                                        <ul>
                                            <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a>
                                            </li>
                                            <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a>
                                            </li>
                                            <li><a className="youtube" href="#"><i className="fa fa-pinterest-p"></i></a></li>
                                            <li><a className="dribbble" href="#"><i className="fa fa-google-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const renderCartModalComponent = (token, productSelectedId, user) => {
    ReactDOM.render(
        <CartModalComponent user={user} token={token} productSelectedId={productSelectedId} />,
        document.getElementById("modalArea")
    )
}