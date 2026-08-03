
let currentRoute = '/';

export function navigate(path){
    currentRoute = path;

    window.dispatchEvent(
        
        new CustomEvent("routeChange",{
            detail:{path}
        })
    )
}

export function getCurrentRoute(){
    return currentRoute;
}