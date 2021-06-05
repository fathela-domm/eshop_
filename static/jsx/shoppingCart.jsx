const CartSummary = () => {
    const [carts, setCarts] = React.useState([]);
    const [grandTotal, setGrandTotal] = React.useState(null);
    React.useEffect(() => {
        useLoadWholeApi("").then(res => {
            setCarts(res.carts);
        });
    }, []);
    React.useEffect(() => {
        let counter = 0;
        carts.map(cart => {
            counter += +cart.total_price;
        });
        setGrandTotal(Math.ceil(counter));
    })
    return grandTotal && (
        <ul>
            <li>Cart Subtotal<span>Ksh: {grandTotal}.00 </span></li>
            <li>Shipping<span>Free</span></li>
            <li className="last">You Pay<span>Ksh: {grandTotal}.00</span></li>
        </ul>
    )
}

const ShoppingCartComponent = (props) => {
    const [carts, setCarts] = React.useState([]);
    const [grandTotal, setGrandTotal] = React.useState(null);

    function loadCart() {
        useLoadWholeApi("").then(res => {
            let cartProductsArray = [];
            res.carts.map((cart) => {
                cart.user == props.uid && cartProductsArray.push(cart)
            });
            setCarts(cartProductsArray);
        });

        let counter = 0;
        carts.map(cart => {
            counter += +cart.total_price;
        });
        setGrandTotal(Math.ceil(counter));
    }

    React.useEffect(() => {
        loadCart();
    }, []);
    React.useEffect(() => {
        let counter = 0;
        carts.map(cart => {
            counter += +cart.total_price;
        });
        setGrandTotal(Math.ceil(counter));
    });

    function addOneToQuantity(id) {
        const currentCartIteration = carts.filter(cart => cart.id == id && cart);
        const quantity_in_stock = +currentCartIteration[0].product_info[0].quantity_in_stock;
        let currentInputValue = document.getElementById(`cartInput${id}`).value;

        if (+currentInputValue < quantity_in_stock - 5) {
            document.getElementById(`cartInput${id}`).value = +document.getElementById(`cartInput${id}`).value + 1;
            const dataToPost = {
                quantity_to_purchase: +currentInputValue + 1,
            }
            updateDataInApi("api/cart/update", id, props.token, dataToPost)
            loadCart();
        }
    }

    function minusOneFromQuantity(id) {
        let currentInputValue = document.getElementById(`cartInput${id}`).value;
        if (+currentInputValue > 0) {
            document.getElementById(`cartInput${id}`).value = +document.getElementById(`cartInput${id}`).value - 1;
            const dataToPost = {
                quantity_to_purchase: +currentInputValue + 1,
            }
            updateDataInApi("api/cart/update", id, props.token, dataToPost)
            loadCart();
        }
    }

    const handleChange = (id) => {
        let currentInputValue = document.getElementById(`cartInput${id}`).value;
        const dataToPost = {
            quantity_to_purchase: +currentInputValue + 1,
        }
        updateDataInApi("api/cart/update", id, props.token, dataToPost)
        loadCart();
    }

    const handleDeletion = (id) => {
        deleteDataFromApi("cart/del", id, props.token)
        loadCart();
    }
    return (
        <div className="shopping-cart section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className="table shopping-summery">
                            <thead>
                                <tr className="main-hading">
                                    <th>PRODUCT</th>
                                    <th>NAME</th>
                                    <th className="text-center">UNIT PRICE</th>
                                    <th className="text-center">QUANTITY</th>
                                    <th className="text-center">TOTAL</th>
                                    <th className="text-center"><i className="ti-trash remove-icon"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map(cart => {
                                    return (
                                        <tr key={Math.random()}>
                                            <td className="image" data-title="No"><img src={cart.cart_image}
                                                alt="#" /></td>
                                            <td className="product-des" data-title="Description">
                                                <p className="product-name"><a href="#">{cart.product}</a></p>
                                                <p className="product-des">Purchase a <code>{cart.product}</code> of the best quality with the best services</p>
                                            </td>
                                            <td className="price" data-title="Price"><span>Ksh: {cart.unit_price}</span></td>
                                            <td className="qty" data-title="Qty">
                                                <div className="input-group">
                                                    <div className="button minus">
                                                        <button type="button" onClick={() => minusOneFromQuantity(cart.id)} className="btn btn-primary btn-number" data-type="minus"
                                                            data-field="quant[3]">
                                                            <i className="ti-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input id={`cartInput${cart.id}`} onInput={() => handleChange(cart.id)} type="text" name="quant[3]" className="input-number" data-min="1"
                                                        data-max="100" defaultValue={cart.quantity_to_purchase} />
                                                    <div className="button plus">
                                                        <button type="button" onClick={() => addOneToQuantity(cart.id)} className="btn btn-primary btn-number" data-type="plus"
                                                            data-field="quant[3]">
                                                            <i className="ti-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="total-amount" data-title="Total"><span>Ksh: {Math.ceil(cart.total_price)}</span></td>
                                            <td className="action" data-title="Remove">
                                                <a onClick={() => handleDeletion(cart.id)} href="#"><i className="ti-trash remove-icon"></i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    grandTotal &&
                    <div className="row col-sm-6" style={{ margin: "auto" }}>
                        <div className="col-12">
                            <div className="total-amount">
                                <div className="row">
                                    <div className="right" id="cart-summary">
                                        <ul>
                                            <li>Cart Subtotal<span>Ksh: {grandTotal}.00 </span></li>
                                            <li>Shipping<span>Free</span></li>
                                            <li className="last">You Pay<span>Ksh: {grandTotal}.00</span></li>
                                        </ul>
                                        <div className="button5">
                                            <a href={`/checkout/${props.uid}`} className="btn">Checkout</a>
                                            <a href="/shopGrid" className=" btn">Continue shopping</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

const renderShoppingCart = (token, uid) => {
    ReactDOM.render(<ShoppingCartComponent uid={uid} token={token} />, document.getElementById("shoppingCart"));
}
