const ProductsTable = () => {
    const [products, setProducts] = React.useState([]);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setProducts(res.products);
        });
        document.getElementById("reloadProducts").addEventListener("click", () => {
            document.getElementById("table").innerHTML = "";
            useLoadWholeApi("").then(res => {
                setProducts(res.products);
            }).catch(
                e => console.log(e)
            );
        });
    }, []);

    // the function below is called to paginate data in the products table
    const PaginateData = (data, per_page) => {
        let counter = per_page;
        var page = 1;
        const pageNo = window.location.search.slice(6, 7);

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (index < counter) {
                let innerHTML =
                    (`
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>
                            <img src=${element.image} width="40" height="40" style="border-radius: 70%" alt="" />
                        </td>
                        <td>${element.category}</td>
                        <td><a href=${`/update_products/${element.id}`}>${element.name}</a></td>
                        <td>Ksh: ${element.price}</td>
                        <td>${element.quantity_in_stock <= element.reorder_level ?
                            `<a href=${`/receive_products/${element.id}`}><span class="btn text-danger">${element.quantity_in_stock}</span></a>` :
                            `<a href=${`/receive_products/${element.id}`}><span class="btn text-primary">${element.quantity_in_stock}</span></a>`}
                        </td>
                        <td>${element.quantity_received}</td>
                        <td>${element.received_by}</td>
                        <td>${element.reorder_level}</td>
                        <td>
                          <button class="btn btn-outline-secondary disabled">${element.is_active}</button>
                        </td>
                        <td>${new Date(element.last_updated).toLocaleString()}</td>
                        <td>
                        <a href=${`/del_products/${element.id}`}
                            <i class="btn text-danger fas fa-trash mb-2" id=${`delete${element.id}`}></i>
                        </a>
                    </td>
                    </tr>
                `);

                if (+pageNo == page) {
                    document.getElementById("table").innerHTML += innerHTML;
                }
            }
            else if (+pageNo == page + 1) {
                if (index < counter + per_page) {
                    let innerHTML =
                        (`
                        <tr class="mt-2">
                            <th scope="row">${index + 1}</th>
                            <td>
                                <img src=${element.image} width="40" height="40" style="border-radius: 70%" alt="" />
                            </td>
                            <td>${element.category}</td>
                            <td><a href=${`/update_products/${element.id}`}>${element.name}</a></td>
                            <td>$${element.price}</td>
                            <td>${element.quantity_in_stock <= element.reorder_level ?
                                `<a href=${`/receive_products/${element.id}`}><span class="btn text-danger">${element.quantity_in_stock}</span></a>` :
                                `<a href=${`/receive_products/${element.id}`}><span class="btn text-primary">${element.quantity_in_stock}</span></a>`}
                            </td>
                            <td>${element.quantity_received}</td>
                            <td>${element.received_by}</td>
                            <td>${element.reorder_level}</td>
                            <td>
                                <button class="btn btn-outline-secondary disabled">${element.is_active}</button>
                            </td>
                            <td>${new Date(element.last_updated).toLocaleString()}</td>
                            <td>
                                <a href=${`/del_products/${element.id}`}
                                    <i class="btn text-danger fas fa-trash mb-2" id=${`delete${element.id}`}></i>
                                </a>
                            </td>
                        </tr>
                    `);
                    if (+pageNo == page + 1) {
                        document.getElementById("table").innerHTML += innerHTML;
                    }
                }
                else if (window.location.search === '' || window.location.search.substr(1, 5) == "users") {
                    if (counter <= per_page)
                        document.getElementById("table").innerHTML += innerHTML;
                }
            }
            else if (index == counter) {
                counter += per_page;
                page += 1;
            }
        }
    }
    const ITEMS_PER_PAGE = 4;
    PaginateData(products, ITEMS_PER_PAGE);

    return (
        <React.Fragment>
            <table className="table table-striped" id="productsTable">
                <thead>
                    <tr key={Math.random()}>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">In Stock</th>
                        <th scope="col">Received Quantity</th>
                        <th scope="col">Received By</th>
                        <th scope="col">Reorder Level</th>
                        <th scope="col">Is Active</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {/* this is where the table is rendered by the above function */}
                </tbody>

            </table>
            <div className="row col-12 pb-1" style={{ margin: "auto", justifyContent: "center" }}>
                <a href={+window.location.search[6] !== 1 && window.location.search.substr(1, 5) != "users" || window.location.search == '' ? `${window.location.pathname}?page=${+window.location.search[6] - 1}` : null}>
                    <button className="btn-primary btn col-2 ml-1 pt-1 pl-3 pb-1 pr-3"><i className="fas fa-fast-backward"></i></button>
                </a>
                <button className="btn-outline-info btn col-1 p-1">{window.location.search == '' ? 1 : window.location.search[6]}</button>
                <a href={+window.location.search[6] < Math.ceil(+products.length / ITEMS_PER_PAGE) || window.location.search == '' ? `${window.location.pathname}?page=${+window.location.search[6] + 1}` : null}>
                    <button className="btn-primary btn ml-1  col-2 pt-1 pl-3 pb-1 pr-3"><i className="fas fa-fast-forward"></i></button>
                </a>
            </div>
        </React.Fragment >
    )
}

function renderProducts(user, uid, token) {
    if (window.location.search.substr(1, 4) == 'page') {
        $(".users-table").hide();
        $(".productsBought").hide();
        ReactDOM.render(<ProductsTable user={user} uid={uid} token={token} />, document.getElementById("pdctTable"));
    }
}