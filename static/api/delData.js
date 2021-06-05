async function deleteDataFromApi(del_path, id, token) {
    const main_url = window.origin;
    await fetch(`${main_url}/api/${del_path}/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        referrerPolicy: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": token,
        },
    });
}