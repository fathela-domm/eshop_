const UsersTable = props => {
    const [users, setUsers] = React.useState([]);
    React.useLayoutEffect(() => {
        useLoadWholeApi("").then(res => {
            setUsers(res.users);
        });
        document.getElementById("reloadUsers").addEventListener("click", function () {
            document.getElementById("user-table").innerHTML = "";
            useLoadWholeApi("").then(res => {
                setUsers(res.users);
            }).catch(
                e => console.log(e)
            );
        });
    }, []);

    const PaginateData = (data, per_page) => {
        let counter = per_page;
        var page = 1;
        for (let index = 0; index < data.length; index++) {
            const user = data[index];
            const pageNo = window.location.search.slice(7, 8);
            if (index < counter) {
                let innerHTML =
                    (`
                    <tr>
                        <th scope="row">${+index + 1}</th>
                        <td id=${`fn${user.id}`}>
                              ${user.first_name}
                        </td>
                        <td id=${`ln${user.id}`}>${user.last_name}</td>
                        <td id=${`us${user.id}`}>
                            <a href=${`/update_users/${user.id}`}>
                                ${user.username}
                            </a>
                        </td>
                        <td id=${`email${user.id}`}>${user.email}</td>
                        <td id=${`addre1${user.id}`}>${user.address1}</td>
                        <td id=${`addre2${user.id}`}>${user.address2}</td>
                        <td id=${`mobile${user.id}`}>${user.mobile_no}</td>
                        <td>
                                ${user.is_staff ?
                            `<button class="btn btn-primary disabled">${user.is_staff}</button>` :
                            `<button class="btn btn-danger disabled">${user.is_staff}</button>`
                        }
                        </td>
                        <td>
                        ${user.is_active ?
                            `<button class="btn btn-primary disabled">${user.is_active}</button>` :
                            `<button class="btn btn-danger disabled">${user.is_active}</button>`
                        }
                        </td>
                        <td>
                        <a href=${`/del_users/${user.id}`}
                            <i class="fas fa-trash text-danger btn" id=${`del${user.id}`}></i>
                        </a>
                    </td>
                </tr>
                `);

                if (+pageNo == page && window.location.search.substr(1, 5) == 'users' || window.location.search.substr(1, 4) == "page") {
                    document.getElementById("user-table").innerHTML += innerHTML;
                }
                else if (window.location.search === '') {
                    if (counter <= 5)
                        document.getElementById("user-table").innerHTML += innerHTML;
                }
            }
            else if (+pageNo == page + 1) {
                if (index < counter + per_page) {
                    let innerHTML =
                        (`
                    <tr>
                        <th scope="row">${+index + 1}</th>
                        <td id=${`fn${user.id}`}>${user.first_name}</td>
                        <td id=${`ln${user.id}`}>${user.last_name}</td>
                        <td id=${`us${user.id}`}>
                            <a href=${`/update_users/${user.id}`}>
                                ${user.username}
                            </a>
                        </td>
                        <td id=${`email${user.id}`}>${user.email}</td>
                        <td id=${`addre1${user.id}`}>${user.address1}</td>
                        <td id=${`addre2${user.id}`}>${user.address2}</td>
                        <td id=${`mobile${user.id}`}>${user.mobile_no}</td>
                        <td>
                                ${user.is_staff ?
                                `<button class="btn btn-primary disabled">${user.is_staff}</button>` :
                                `<button class="btn btn-danger disabled">${user.is_staff}</button>`
                            }
                        </td>
                        <td>
                        ${user.is_active ?
                                `<button class="btn btn-primary disabled">${user.is_active}</button>` :
                                `<button class="btn btn-danger disabled">${user.is_active}</button>`
                            }
                        </td>
                        <td>
                          <a href=${`/del_users/${user.id}`}
                            <i class="fas fa-trash text-danger btn" id=${`del${user.id}`}></i>
                          </a>
                      </td>
                </tr>
                `);
                    if (+pageNo == page + 1) {
                        document.getElementById("user-table").innerHTML += innerHTML;
                    }
                }
            }
            else if (index == counter) {
                counter += per_page;
                page += 1;
            }
        }
    }
    const ITEMS_PER_PAGE = 4;
    PaginateData(users, ITEMS_PER_PAGE);

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address1</th>
                        <th>Address2</th>
                        <th>Mobile No</th>
                        <th>Is Staff</th>
                        <th>Is Active</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="user-table">
                    {/* users table is rendered here in pagination using the function above */}
                </tbody>
            </table>
            <div className="row pb-1" style={{ margin: "auto", justifyContent: "center" }}>
                <a href={+window.location.search[7] !== 1 && window.location.search.substr(1, 4) != "page" || window.location.search == '' ? `${window.location.pathname}?users=${+window.location.search[7] - 1}` : null}>
                    <button className="btn-primary btn col-sm-4 pt-1 pl-3 pb-1 pr-3"><i className="fas fa-fast-backward"></i></button>
                </a>
                <button className="btn-outline-info btn col-sm-2 p-1 mr-1">{window.location.search.substr(1, 4) != 'page' || window.location.search == '' ? window.location.search[7] : 1}</button>
                <a href={+window.location.search[7] < Math.ceil(+users.length / ITEMS_PER_PAGE) ? `${window.location.pathname}?users=${+window.location.search[7] + 1}` : null}>
                    < button className="btn-primary btn col-sm-4 pt-1 pl-3 pb-1 pr-3"><i className="fas fa-fast-forward"></i></button>
                </a>
            </div>
        </React.Fragment >
    )
}

function renderUsers(user, uid, csrf_token) {
    if (window.location.search.substr(1, 5) == 'users') {
        $(".pdct-card").hide();
        $("#cardCategories").hide();
        ReactDOM.render(<UsersTable uid={uid} token={csrf_token} user={user} />, document.getElementById("usersTable"))
    }
}