import instance from "@/utils/request";


/**
 * 分页条件查询
 */
export function findPage(searchParams) {

    return instance.get(`loginLog`, {params: searchParams})
}

/**
 * 通过id删除
 */

export function deleteById(id) {
    return instance.delete(`loginLog/${id}`)

}

/**
 * 批量删除
 */

export function batchDelete(ids) {
    return instance.delete(`loginLog/batch/${ids}`)
}

/**
 * 添加功能
 */
export function addEntity(entity) {
    return instance.post(`loginLog`, entity);
}

/**
 * 通过id查询
 */
export function findById(id) {
    return instance.get(`loginLog/${id}`)
}

/**
 修改
 */
export function updataEdit(entity) {
    return instance.put(`loginLog`,entity);
}