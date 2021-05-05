import instance from "../utils/request";

/**
 * 获取uuid
 * @param uuid
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getCaptcha(uuid) {
    return instance.get(`common/getCaptcha/${uuid}`)
}


/**
 * 登录 需要携带参数 form
 */
export function doLogin(form) {
    return instance.post(`common/doLogin`,form)
}

/**
 * 获取用户权限
 */
export function getAdminInfo(){
    return instance.get(`common/getAdminInfo`);
}
