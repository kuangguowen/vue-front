import cookieUtils from "./cookie";

let tokenKey = "adminToken";
let adminKey = "adminInfo";
let menuList = "roleList";
let btnPerms = "btnPerms";

let auth = {

    /**
     * tokenKey
     */
    setToken(token){
        cookieUtils.setCookie(tokenKey,token);
    },

    /**
     *获取token
     */
    getToken(){
        return cookieUtils.getCookie(tokenKey);
    },

    /**
     * 删除token
     */
    deleteToken(){
        cookieUtils.deleteCookie(tokenKey);
    },



    setUserInfo(admin){
        cookieUtils.setCookie(adminKey,JSON.parse(admin))
    },

    getUserInfo(){
        return cookieUtils.getCookie(adminKey)
    },

    deleteUserInfo(){
        cookieUtils.deleteCookie(adminKey);
    },




    setMenuList(roleList){
        cookieUtils.setCookie(menuList,JSON.parse(roleList))
    },

    getMenuList(){
        return cookieUtils.getCookie(menuList)
    },

    deleteMenuList(){
        cookieUtils.deleteCookie(menuList);
    },



    setBtnPerms(Perms){
        cookieUtils.setCookie(btnPerms,JSON.parse(Perms))
    },

    getBtnPerms(){
        return  cookieUtils.getCookie(btnPerms)
    },

    deleteBtnPerms(){
        cookieUtils.deleteCookie(btnPerms);
    },


    /**
     * 删除所有信息
     */clearAllCookie(){
         this.deleteToken();
         this.deleteUserInfo();
         this.deleteMenuList();
         this.deleteBtnPerms();
    }


}

export default auth;