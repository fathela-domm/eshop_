
const FormComponent = props => {
    const refObject = {
        firstNameRef: React.useRef(null),
        lastNameRef: React.useRef(null),
        userNameRef: React.useRef(null),
        passwordRef1: React.useRef(null),
        passwordRef2: React.useRef(null),
        userImageRef: React.useRef(null),
        emailRef: React.useRef(null),
        mobileNoRef: React.useRef(null),
        cityRef: React.useRef(null),
        address1Ref: React.useRef(null),
        address2Ref: React.useRef(null),
        apiKeyRef: React.useRef(null),
    }
    const Row1 = () => {
        return (
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="donationinput1" className="text-danger">First Name:</label>
                    <input type="text" ref={refObject.firstNameRef} id="donationinput1" className="form-control" placeholder="First Name"
                        name="fname" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="donationinput2" className="text-primary text-danger">Last Name:</label>
                    <input type="text" ref={refObject.lastNameRef} id="donationinput2" className="form-control" placeholder="Last Name"
                        name="lname" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="donationinput5" className="text-danger">Username:</label>
                    <input type="email" ref={refObject.userNameRef} id="donationinput5" className="form-control" placeholder="Username"
                        name="email" />
                </div>
            </div>
        )
    }

    const Row2 = () => {
        return (
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="password" className="text-danger">Password:</label>
                    <fieldset className="form-group">
                        <input type="password" disabled ref={refObject.passwordRef} placeholder="********" className="form-control"
                            id="passwordField" defaultValue="" name="password" />
                    </fieldset>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="donationinput3" className="text-danger">E-mail:</label>
                    <input type="email" ref={refObject.emailRef} id="donationinput3" className="form-control" placeholder="E-mail"
                        name="email" />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="donationinput4" className="text-danger">Phone Number:</label>
                    <input type="text" ref={refObject.mobileNoRef} id="donationinput4" className="form-control" placeholder="Phone"
                        name="phone" />
                </div>
            </div>
        )
    }

    const Row3 = () => {
        return (<div className="row">
            <div className="form-group col-md-4">
                <label htmlFor="donationinput6" className="text-danger">Address 1:</label>
                <input type="text" ref={refObject.address1Ref} id="donationinput6" className="form-control" placeholder="Address1"
                    name="Address1" />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="donationinput7" className="text-primary text-danger">Address 2:</label>
                <input type="text" ref={refObject.address2Ref} id="donationinput7" className="form-control" placeholder="Address2"
                    name="Address2" />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="donationinput8" className="text-danger">City:</label>
                <input type="text" id="donationinput8" ref={refObject.cityRef} className="form-control" placeholder="City"
                    name="city" />
            </div>
        </div>)
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

    // users array setting
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        useLoadWholeApi("").then(res => {
            res.users.map(user => {
                if (user.username === props.user) {
                    setUsers(user);
                    /* setting references to these values */
                    refObject.userNameRef.current.value = user.username;
                    refObject.firstNameRef.current.value = user.first_name;
                    refObject.lastNameRef.current.value = user.last_name;
                    refObject.emailRef.current.value = user.email;
                    refObject.userImageRef.current = user.image;
                    refObject.mobileNoRef.current.value = user.mobile_no;
                    refObject.cityRef.current.value = user.city;
                    refObject.address1Ref.current.value = user.address1;
                    refObject.address2Ref.current.value = user.address2;

                }
            })
        });
    }, []);

    document.querySelector(".submit-new-user-info").addEventListener("click", () => postProfileData());
    const postProfileData = () => {
        const objToSubmit = {
            "first_name": refObject.firstNameRef.current.value,
            "last_name": refObject.lastNameRef.current.value,
            "username": refObject.userNameRef.current.value,
            // "image": refObject.userImageRef.current,
            "email": refObject.emailRef.current.value,
            "mobile_no": refObject.mobileNoRef.current.value,
            "city": refObject.cityRef.current.value,
            "address1": refObject.address1Ref.current.value,
            "address2": refObject.address2Ref.current.value,
            "is_staff": true,
            "is_authenticated": true,
            "is_active": true,
        }

        updateDataInApi("api/users/update", props.uid, props.token, objToSubmit);
    }


    return (
        <div className="position-relative flex-column justify-center">
            <form className="form" method="POST" onSubmit={handleSubmit} action="">
                <div className="form-body pr-2" style={formStyle}>
                    <Row1 />
                    <Row2 />
                    <Row3 />
                </div >
            </form>

        </div>
    )
}

function renderForm(user, uid, csrf_token) {
    ReactDOM.render(<FormComponent user={user} uid={uid} token={csrf_token} />, document.getElementById("modalForm"));
}

