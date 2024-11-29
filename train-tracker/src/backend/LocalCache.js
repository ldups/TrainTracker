const LOCAL_CACHE="LOCAL"

export const getLocalCache=()=>{

    let localCache={
        data:{},
    }  

    try {
        const data=localStorage.getItem(LOCAL_CACHE)

        if(data){
            localCache=JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return localCache
}

export const removeFromCache=(train)=>{
    const localCache=getLocalCache()
    let data=localCache.data
    delete data[train.routeName]
    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to remove from Favorites");
    }
}

export const setToCache=(train)=>{

    const localCache=getLocalCache()
    let data=localCache.data

    const item={
        route:train.routeName,
    }

    data[train.routeName]=item

    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to Save to Favorites");
    }

}

export const isFavorited=(train)=>{
    const localCache = getLocalCache();
    const data = localCache.data;
    if(train.routeName in data){
        return "red";
    }
    return "white"
}