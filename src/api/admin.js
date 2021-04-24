import instance from "@/utils/request";


let admin = {
    /**
     * 获取所有部门数据 ，以树状结构展示 tree
     */
    // getAllDeptTree(){
    //     return instance.get(`dept/tree`)
    // },

    /**
     * 获取部门的一级数据
     */
    getRootDeptList() {
        return instance.get(`dept/root`)
    },

    /**
     * 分页条件查询
     * @param searchParams
     * @returns {*}
     */
    searchPage(param) {

        return instance.get(`admin`, {params: param})
    },

    getAreaChildrenById(id) {
        return instance(`area/${id}/children`);

    },

    // getAreaChildrenById(id) {
    //     return instance.get(`city/province/${id}`);
    // },


    /**
     *通过id查询
     */
    findById(id) {
        return instance.get(`admin/${id}`)
    },


    /**
     * 添加功能
     */
    addEntity(entity) {
        return instance.post(`admin`, entity);
    },

    /**
     修改
     */
    updataEdit(entity) {
        return instance.put(`admin`, entity);
    },


    /**
     * 通过id删除
     */

    deleteById(id) {
        return instance.delete(`admin/${id}`)
    },


    /**
     * 批量删除
     */

    batchDelete(ids) {
        return instance.delete(`admin/batch/${ids}`)
    }


};


export default admin;


//


//
// /**
//  * 添加功能
//  */
// export function addEntity(entity) {
//     return instance.post(`brand`, entity);
// }
//
// /**
//  * 通过id查询
//  */
// export function findById(id) {
//     return instance.get(`brand/${id}`)
// }
//
// /**
//  修改
//  */
// export function updataEdit(entity) {
//     return instance.put(`brand`, entity);
// }