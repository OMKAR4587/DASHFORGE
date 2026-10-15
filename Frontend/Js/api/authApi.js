export async function getCurrentUser() {
    const BASEURL = "https://dashforge-backend-4sb8.onrender.com";

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASEURL}/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })

    const data =await response.json();

    if(!response.ok){
        throw new Error(
            data.message || "authentication failed"
        )
    }

    return data.user;
}