export default async function loadScript(url,callback){
    var script = document.createElement( "script" )
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback
    // script.onload = function() {
    //     callback();
    // };
    document.getElementsByTagName( "head" )[0].appendChild( script );
}


export const loadScriptAsyncDefer = async (url)=>{
    var script = document.createElement( "script" )
    script.async=true
    script.defer=true
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName( "head" )[0].appendChild( script );
}