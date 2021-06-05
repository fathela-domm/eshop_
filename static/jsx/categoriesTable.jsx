const CategoriesTable = () => {
    const [categories, setCategories] = React.useState([]);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setCategories(res.categories);
        });
        document.getElementById("reloadCategories").addEventListener("click", () => {
            useLoadWholeApi("").then(res => {
                setCategories(res.categories);
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
                    <th>Category Name</th>
                    <th className="text-center">Delete</th>
                </tr>
            </thead>
            <tbody id="categories">
                {
                    categories.map((element, index) => {
                        return (
                            <tr key={Math.random()}>
                                <th scope="row">{index + 1}</th>
                                <td><a href={`/update_category/${element.id}`}>{element.category}</a></td>
                                <td className="text-center">
                                    <a href={"/del_categories/" + element.id}>
                                        <i className="btn fas text-danger fa-trash"></i>
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

function renderCategoriesTable(token, user) {
    ReactDOM.render(<CategoriesTable />, document.getElementById("categoriesTable"))
}