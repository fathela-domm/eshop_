const UpdateFormComponent = props => {
    const refObject = {
        categoryRef: React.useRef(null),
        nameRef: React.useRef(null),
        receivedByRef: React.useRef(null),
        image: React.useRef(null),
        priceRef: React.useRef(null),
        inStockRef: React.useRef(null),
        receivedRef: React.useRef(null),
        reorderLevelRef: React.useRef(null),
        IsActiveRef: React.useRef(null),
        address1Ref: React.useRef(null),
        address2Ref: React.useRef(null),
        currentImage: React.useRef(null),
    }

    const [categories, setCategories] = React.useState(null);
    const [products, setProducts] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [image, setImages] = React.useState(null);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setCategories(res.categories);
        });

        useLoadWholeApi("").then(res => {
            res.product.map(product => {
                if (product.id == props.id) {
                    setProducts(product);
                    refObject.categoryRef.current.value = product.category;
                    refObject.nameRef.current.value = product.name;
                    refObject.priceRef.current.value = product.price;
                    refObject.receivedByRef.current.value = product.received_by;
                    refObject.inStockRef.current.value = product.quantity_in_stock;
                    refObject.receivedRef.current.value = product.quantity_received;
                    refObject.reorderLevelRef.current.value = product.reorder_level;
                    setImages(product.image);
                }
            });
        });

        useLoadWholeApi("").then(res => {
            setUsers(res.users);
        }).catch(
            e => console.log(e)
        );

        document.querySelector(".submit-update-product").addEventListener("click", () => postProfileData());
        const postProfileData = () => {
            let newData = {
                category: "",
                received_by: "",
            }
            useLoadWholeApi("").then(res => {
                res.users.map((response) => {
                    if (response.username == refObject.receivedByRef.current.value) {
                        newData.received_by = response.id;
                    }
                });
            }).catch(
                e => console.log(e)
            );

            useLoadWholeApi("all/categories").then(res => {
                res.map(category => {
                    if (category.category === refObject.categoryRef.current.value) {
                        newData.category = category.id;
                    }
                })
            });

            const objToSubmit = refObject.nameRef.current.value !== null && {
                "category": newData.category,
                "name": refObject.nameRef.current.value,
                "price": refObject.priceRef.current.value,
                "received_by": newData.received_by,
                "quantity_received": refObject.receivedRef.current.value,
                "quantity_in_stock": refObject.inStockRef.current.value,
                "reorder_level": refObject.reorderLevelRef.current.value,
                "is_active": true,
            }
         }
    }, []);

    const Row1 = () => {
        return (
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="" className="text-danger">Category:</label>
                    <select name="category" ref={refObject.categoryRef} defaultValue="..." className="category form-control">
                        <option className="bg-white text-primary border form-control text-center" value="...">...</option>
                        {
                            categories !== null &&
                            categories.map(category => {
                                return (
                                    <option key={Math.random()} className="bg-white text-primary border form-control">{category.category}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="" className="text-primary text-danger">Name:</label>
                    <input type="text" ref={refObject.nameRef} autoCorrect="false" autoComplete="false" className="name p-2 form-control" placeholder="Name"
                        name="lname" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="" className="text-danger">Received By:</label>
                    <select name="receiver" ref={refObject.receivedByRef} defaultValue="..." className="receiver form-control">
                        <option className="bg-white text-primary border form-control text-center" value="...">...</option>
                        {
                            users !== null &&
                            users.map(user => {
                                return (
                                    <option key={Math.random()} className="bg-white text-primary border form-control">{user.username}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }

    const Row2 = () => {
        return (
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="" style={{ width: "200%" }} className="text-danger">Price:</label>
                    <input type="number" ref={refObject.priceRef} className="p-2 form-control price" placeholder={`Price`}
                        name="number" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="" style={{ width: "200%" }} className="text-danger">Quantity Received:</label>
                    <input type="number" ref={refObject.receivedRef} className="p-2 form-control quantity_received" placeholder="Quantity Received"
                        name="number" />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="" className="text-danger">Reorder Level:</label>
                    <input type="number" ref={refObject.reorderLevelRef} className="reorder_level p-2 form-control" placeholder="Reorder Level"
                        name="phone" />
                </div>
            </div>
        )
    }

    const Row3 = () => {
        return (
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="" className="text-danger">Stock:</label>
                    <input type="number" ref={refObject.inStockRef} className="p-2 form-control stock" placeholder="Stock"
                        name="stock" />
                </div>
                <br />
                {
                    image !== null &&
                    <div className="form-group col-md-6 flex-row justify-space-between">
                        <label htmlFor="" className="text-danger">Image:</label>
                        <span className="text-info ml-1">Currently: <img src={image} width="40" height="40" style={{ borderRadius: "40%" }} alt="image" /></span>
                        <input type="file" ref={refObject.image} className="form-control" />
                    </div>
                }
            </div>
        )
    }

    let formStyle = {
        overflowY: "auto",
        maxHeight: "300px",
        overflowX: "hidden",
        maxwidth: "500px",
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        postProfileData();
    }


    let modal2Style = {
        marginTop: "-300px",
        marginLeft: "50px"
    }

    setTimeout(() => {
        document.querySelector(".close-modal-2").addEventListener("click", () => document.querySelector(".small-modal").classList.add("none"));
    }, 1000);

    return (
        <div className="position-relative flex-column justify-center">
            <form className="form" method="POST" onSubmit={handleSubmit} action="">
                <div className="form-body pr-2" style={formStyle}>
                    <Row1 />
                    <Row2 />
                    <Row3 />
                </div >
            </form>
            <div style={modal2Style} className={`modal-backdrop-centered small-modal position-fixed none`} id="updatePassword" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-bottom">
                            <span className="modal-title text-primary" style={{ width: "100%" }}>Password Info</span>
                            <span className=""><i style={{ cursor: "pointer" }} className="close-modal-2 ft-x"></i></span>
                        </div>
                        <div className="modal-body border-bottom mb-3">
                            <small className="text-center">
                                <span className="text-info text-center">Passwords cannot be shown since they are <br />
                                    not stored in raw format due to of security reasons.
                                </span>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderProductsUpdate = (id, token) => {
    document.getElementById("product-update").classList.remove("fade");
    document.getElementById("product-update").classList.remove("none");
    document.querySelector(".main-content").classList.add("backdrop-filter");
    ReactDOM.render(<UpdateFormComponent id={id} token={token} />, document.getElementById("modalProductUpdate"));
}