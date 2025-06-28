const sessionIdToUserMap=new Map()
function setUser(id,user){
    sessionIdToUserMap.set(id,user)
    return
}
function getUser(id){
    return sessionIdToUserMap.get(id)
}
module.exports={setUser,getUser}