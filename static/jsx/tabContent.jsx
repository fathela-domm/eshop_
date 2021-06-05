const TabContent = (props) => {
	const [products, setProducts] = React.useState([]);
	React.useLayoutEffect(() => {
		const tabSelected = document.querySelectorAll(".tabCategory");
		let array = [];
		tabSelected.forEach(tab => {
			tab.addEventListener("click", () => {
				array = [];
				useLoadWholeApi("").then(res => {
					res.products.map(product => {
						product.category == tab.innerHTML && array.push(product);
					});
					setProducts(array);
				});
			});
		});
	}, []);

	React.useLayoutEffect(() => {
		useLoadWholeApi("").then(res => {
			let array = [];
			res.products.map(product => {
				product.category == "Groceries" && array.push(product)
			});
			setProducts(array);
		});
	}, []);

	return (
		<div className="row">
			{products.map((product, i) => {
				return i < 4 && (
					<div key={Math.random()} className="ml-4  tab-pane fade show active" id="man" role="tabpanel">
						<div className="tab-single">
							<div className="row">
								<div className="col-12">
									<div className="single-product" onClick=
										{
											() => {
												renderCartModalComponent(props.token, product.id, props.user);
											}
										}>
										<div className="product-img">
											<small>
												<img style={{ height: "200px", width: "300px" }} className="default-img" src={product.image} alt="#" />
											</small>
											<div className="button-head">
												<div className="product-action modalRenderer"													>
													<a data-toggle="modal" data-target="#exampleModal" title="Quick View"
														href="#"><i className=" ti-eye"></i><span>Double Click To View Quick Store</span></a>
													<a title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to
	                                        Wishlist</span></a>
													<a title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to
	                                        Compare</span></a>
												</div>
												<div className="product-action-2">
													<span title="Add to cart">Add to
	                                    cart</span>
												</div>
											</div>
										</div>
										<div className="product-content">
											<h3><a href="#">{product.name}</a></h3>
											<div className="product-price">
												<span>Ksh: {product.price}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}


const renderTabContent = (token, user) => {
	ReactDOM.render(<TabContent token={token} user={user} />, document.getElementById("tabContent"),)
}