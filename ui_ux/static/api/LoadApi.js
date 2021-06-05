/* This module will handle the fetching of data from the api */
async function useLoadWholeApi(path) {
    const location = window.origin;
    const response = await fetch(location + "/api/").catch((e) => {
        console.error(e);
    });
    const res = await response.json();
    return res;
}
