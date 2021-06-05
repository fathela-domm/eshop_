const PromoTable = () => {
    const [categories, setCategories] = React.useState([]);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setCategories(res.promo);
        });
        document.getElementById("reloadCategories").addEventListener("click", () => {
            useLoadWholeApi("").then(res => {
                setCategories(res.promo);
            }).catch(
                e => console.log(e)
            );
        });
    }, []);

    return (
        <table className="table table-bordered mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th className="text-center">Promo Code</th>
                    <th className="text-center">Discount</th>
                    <th className="text-center">Duration</th>
                    <th className="text-center">Stop Promo</th>
                </tr>
            </thead>
            <tbody id="categories">
                {
                    categories.map((element, index) => {
                        return (
                            <tr key={Math.random()}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.product}</td>
                                <td>{element.promo_code}</td>
                                <td>{element.discount}</td>
                                <td>{element.duration}</td>
                                <td>
                                    <a href={`/del_promo/${element.id}`}>
                                        <i className="btn text-danger fas fa-trash mb-2" id={`delete${element.id}`}></i>
                                    </a>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function renderPromoTable(token, user) {
    ReactDOM.render(<PromoTable />, document.getElementById("promoTable"))
}