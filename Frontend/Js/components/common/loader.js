export function createLoader(id)    {
    const loader = document.createElement("div");
    loader.className = "loader";
    loader.id = id;

    loader.innerHTML=`<div class="spinner"></div>`;

    return loader
}

export  function showLoader(id){
    document.getElementById(id).style.display="flex";
}
export function hideLoader(id){
    document.getElementById(id).style.display="none"
}
