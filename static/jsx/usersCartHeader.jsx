const UserCartComponent = (props) => {
    const [user, setUser] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [cartProducts, setCartProducts] = React.useState([]);
    const [cartDetail, setCartDetail] = React.useState(0);
    const grandTotal = React.useRef(null);
    const totalQuantity = React.useRef(null);

    React.useEffect(() => {
        useLoadWholeApi("").then(res => {
            res.users.map(user => {
                if (user.id == props.user) {
                    setUser(user);
                }
            });
            setProducts(res.products)
        });

    }, []);


    React.useEffect(() => {
        let productsArray = [];
        user && user.users_carts.map(cart => {
            products.map(product => {
                product.id == cart.product_id && productsArray.push(product)
            });
        });
        productsArray.length != 0 && setCartProducts(productsArray);
    }, [user, products]);

    React.useEffect(() => {
        async function fetchCartDetails() {
            const res = fetch(window.origin + "/api/create_cart");
            return (await res).json()
        }
        fetchCartDetails().then(res => {
            let cartDetailArray = [];
            res.map(cart => {
                user && user.users_carts.map(user_cart => {
                    cart.product == user_cart.product_id && cartDetailArray.push(cart);
                });
            });
            setCartDetail(cartDetailArray);
        });
        user && user.users_carts.map(cart => {
            totalQuantity.current += +cart.quantity_to_purchase;
        });
    }, [products]);

    cartDetail && cartDetail.map(cart => {
        grandTotal.current += Math.ceil(+cart.total_price);
    });

    return user && products && (
        <div className="sinlge-bar shopping" id="usersCart">
            <a href="#" className="single-icon"><i className="ti-bag"> Cart</i> <span
                className="total-count">{totalQuantity.current}</span></a>
            <div className="shopping-item">
                <div className="dropdown-cart-header">
                    <span>{user.users_carts.length} Items</span>
                    <a href="/cart">View Cart</a>
                </div>
                <ul className="shopping-list">
                    {
                        cartProducts.map(cartProduct => {
                            return (
                                <li key={Math.random()}>
                                    <a href="#" className="remove" title="Remove this item"><i
                                        className="fa fa-remove"></i></a>
                                    <a className="cart-img" href="#"><img src={cartProduct.image}
                                        alt="#" /></a>
                                    <h4><a href="#">{cartProduct.name}</a></h4>
                                    <p className="quantity">1x
                                        {
                                            user.users_carts.map(cart => {
                                                return cartProduct.id == cart.product_id && <span key={Math.random()} className="amount"> {cart.quantity_to_purchase}</span>
                                            })
                                        }
                                    </p>
                                </li>
                            )
                        })
                    }

                </ul>
                <div className="bottom">
                    <div className="total">
                        <span>Total</span>
                        <span className="total-amount">
                            Ksh: {
                                grandTotal.current !== 0 && grandTotal.current
                            }.00
                        </span>
                    </div>
                    <a href={"/checkout/" + props.user} className="btn animate">Checkout</a>
                </div>
            </div>
        </div >
    )
}

const renderUserCartComponent = (token, uid) => {
    ReactDOM.render(<UserCartComponent user={uid} token={token} />,
        document.getElementById("usersCartComponent"));
}