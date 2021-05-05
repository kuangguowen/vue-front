import instance from "@/utils/request";


/**
 * 分页条件查询
 */
export function findPage(searchParams) {


    return instance.get(`dept`, {params: searchParams})
}

/**
 * 通过id删除
 */

export function deleteById(id) {
    return instance.delete(`dept/${id}`)
}

/**
 * 批量删除
 */

export function batchDelete(ids) {
    return instance.delete(`dept/batch/${ids}`)
}

/**
 * 添加功能
 */
export function addEntity(entity) {
    return instance.post(`dept`, entity);
}

/**
 * 通过id查询
 */
export function findById(id) {
    return instance.get(`dept/${id}`)
}

/**
 修改
 */
export function updataEdit(entity) {
    return instance.put(`dept`,entity);
}