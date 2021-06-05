const SearchSuggestionsComponent = () => {
    const [products, setProducts] = React.useState([]);
    const [initialProducts, setInitialProducts] = React.useState([]);
    const mobileInput = document.querySelector(".searchInputForMobile");
    const compInput = document.querySelector(".searchInputForComps");

    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setInitialProducts(res.products);
        });
    }, []);

    React.useEffect(() => {
        mobileInput.addEventListener("input", () => {
            let matches = initialProducts.filter((product) => {
                const regex = new RegExp(`^${mobileInput.value}`, "gi");
                return product.name.match(regex);
            });
            if (mobileInput.value == '') { matches = [] };
            setProducts(matches);
        });

        compInput.addEventListener("input", () => {
            let matches = initialProducts.filter((product) => {
                const regex = new RegExp(`^${compInput.value}`, "gi");
                return product.name.match(regex);
            });
            if (compInput.value == '') { matches = [] };
            setProducts(matches);
        });
    }, [initialProducts]);

    return (
        products.map(product => {
            return (
                <div key={Math.random()} onClick={() => {
                    compInput.value = product.name;
                    mobileInput.value = product.name;
                }} style={{ cursor: "pointer" }} className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <span>
                                <small className="body-content">
                                    <img src={product.image} height={40} width={40} alt="" />
                                    <span style={{ fontSize: "15px" }} className="pl-1 text-primary">{product.name}</span>
                                    <br />
                                    <code className="text-tertiary">Ksh: {product.price}</code>
                                </small>
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

const renderSearchSuggestions = () => {
    ReactDOM.render(<SearchSuggestionsComponent />, document.getElementById("searchSuggestions"));
}

const searchSuggestionsForMobile = () => {
    ReactDOM.render(<SearchSuggestionsComponent />, document.getElementById("searchSuggestionsForMobile"));
}