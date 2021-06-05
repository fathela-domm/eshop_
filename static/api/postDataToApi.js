async function postDataToAPI(JSONdata, token, url_path) {
    const main_url = window.origin;
    await fetch(`${main_url}/api/${url_path}/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": token,
        },
        body: JSON.stringify(JSONdata),
    });
}