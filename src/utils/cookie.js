import cookie from 'vue-cookies'


let cookieUtils = {

    /**
     *生成cookie
     */
    setCookie(key, value) {
        cookie.set(key, value)
    },

    /**
     * 获取cookie
     * @param key
     */

    getCookie(key) {
       return  cookie.get(key)
    },

    /**
     * 删除cookie
     * @param key
     */

    deleteCookie(key){
        cookie.remove(key)
    }


}

export default cookieUtils;