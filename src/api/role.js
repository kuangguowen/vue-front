import instance from "@/utils/request";
import role from "../views/role";

/**
 * 分页条件查询
 */
export function findPage(searchParams) {

    return instance.get(`role`, {params: searchParams})
}

/**
 * 通过id删除
 */

export function deleteById(id) {
    return instance.delete(`role/${id}`)
}

/**
 * 批量删除
 */

export function batchDelete(ids) {
    return instance.delete(`role/batch/${ids}`)
}

/**
 * 添加功能
 */
export function addEntity(entity) {
    return instance.post(`role`, entity);
}

/**
 * 通过id查询
 */
export function findById(id) {
    return instance.get(`role/${id}`)
}

/**
 修改
 */
export function updataEdit(entity) {
    return instance.put(`role`,entity);
}

/**查询所有角色
 *
 */
export function findAll() {
    return instance.get(`role/findAll`)
}

