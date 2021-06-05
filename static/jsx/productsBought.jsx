const ProductsBought = props => {
    const [ProductsBought, setProductsBought] = React.useState([]);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            let users = [];
            res.users.map((user) => {
                if (user.products_bought !== [] && user.products_bought.length !== 0) {
                    users.push(user.products_bought);
                }
            })
            setProductsBought(users);
        });
    }, []);

    const [Products, setProducts] = React.useState([]);
    const [users, setUsers] = React.useState([])
    const [ProductsRaw, setProductsRaw] = React.useState([]);
    React.useEffect(() => {
        function loadProducts() {
            useLoadWholeApi("").then(res => {
                setProducts(res.products);
            }).catch(e => console.error(e));
        }
        loadProducts();

        function loadUsers() {
            useLoadWholeApi("").then(res => {
                setUsers(res.users);
            })
        }
        loadUsers();

        function loadRaw() {
            useLoadWholeApi("").then(res => {
                setProductsRaw(res.products_bought);
            }).catch(e => console.error(e));
        }
        loadRaw();
    }, []);


    return ProductsBought.map((product_bought_array, i) => {
        let totalPricesArray = [];
        return (
            <div className="row" key={Math.random()}>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">{`Products Bought Table ${+i + 1}`}</h4>
                            <a className="heading-elements-toggle"><i className="la la-ellipsis-v font-medium-3"></i></a>
                            <div className="heading-elements">
                                <ul className="list-inline mb-0">
                                    <li><a data-action="collapse"><i className="ft-minus"></i></a></li>
                                    <li><a data-action="reload" id="reloadProductsBought"><i className="ft-rotate-cw"></i></a></li>
                                    <li><a data-action="expand"><i className="ft-maximize"></i></a></li>
                                    <li><a data-action="close"><i className="ft-x"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-content collapse show">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product Ordered</th>
                                            <th scope="col">Product Price</th>
                                            <th scope="col">Quantity Ordered</th>
                                            <th scope="col">Ordered By</th>
                                            <th scope="col">Date Ordered</th>
                                            <th scope="col">Issued</th>
                                            <th scope="col">Total For Product</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            product_bought_array.map((product_bought, i) => {
                                                return (
                                                    <tr key={Math.random()}>
                                                        <th scope="row">{+i + 1}</th>
                                                        {
                                                            Products.map(element => {
                                                                return element.id === product_bought.product_id && (
                                                                    <td key={i}>
                                                                        <a href={"/issue_products/" + product_bought.id}>
                                                                            {element.name}
                                                                        </a>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            Products.map(element => {
                                                                return element.id === product_bought.product_id && (
                                                                    <td key={i}>
                                                                        <a href={"/issue_products/" + product_bought.id}>
                                                                            Ksh: {element.price}
                                                                        </a>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        <td>{product_bought.quantity_to_purchase}</td>
                                                        {
                                                            users.map(user => {
                                                                return (
                                                                    user.id === product_bought.buyer_id &&
                                                                    <td className="text-danger" key={i}>{user.username}</td>
                                                                )
                                                            })
                                                        }
                                                        <td>{new Date(product_bought.date_ordered).toDateString()}</td>
                                                        {product_bought.issued ? <td className="text-primary">True</td> : <td className="text-danger">False</td>}
                                                        {
                                                            users.map(user => {
                                                                return (
                                                                    user.id === product_bought.issued_by_id &&
                                                                    <td key={i}>{user.username}</td>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            ProductsRaw.map(raw => {
                                                                if (raw.id === product_bought.id) {
                                                                    let newDataArray = [];
                                                                    newDataArray.push(raw.total_for_product);

                                                                    return <td key={Math.random()}>Ksh: {raw.total_for_product}</td>
                                                                }
                                                            })
                                                        }
                                                        <td>
                                                            <a href={`/del_product_bought/${product_bought.id}`}>
                                                                <i style={{ textAlign: "center" }} id={`del_products_bought${i}`} className="btn fas fa-trash text-danger"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <th scope="col"><i>Grand Total</i></th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <i><b>
                                                    {
                                                        product_bought_array.map((product_bought, i) => {
                                                            let grandTotal = 0;
                                                            Products.map(product => {
                                                                if (product.id == product_bought.product_id) {
                                                                    totalPricesArray.push(+product_bought.quantity_to_purchase * +product.price);
                                                                }
                                                            })
                                                            totalPricesArray.map(element => {
                                                                grandTotal += +element;
                                                            });
                                                            return i == product_bought_array.length - 1 && <span key={Math.random()} className="text-danger total-price">Ksh:{grandTotal}</span>
                                                        })
                                                    }
                                                </b></i>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
}



function renderProductsBought(title) {
    if (window.location.search.substr(1, 5) == 'users') {
        $(".pdct-card").hide();
        $("#cardCategories").hide();
        ReactDOM.render(<ProductsBought title={title} />, document.getElementById("productsBought"))
    }
}