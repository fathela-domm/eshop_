async function updateDataInApi(update_path, id, token, JSONdata) {
    const main_url = window.origin;
    await fetch(`${main_url}/${update_path}/${id}/`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": token,
        },
        body: JSON.stringify(JSONdata),
    });
}
