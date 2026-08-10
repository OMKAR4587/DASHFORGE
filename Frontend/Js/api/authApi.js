export async function getCurrentUser() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/auth/me", {
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