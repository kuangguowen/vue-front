
import instance from "@/utils/request";

let menu = {

      searchPage(searchForm){

        return instance.get(`menu`,{params:searchForm})
    },

    /**
     * 获取所有的菜单 tree
     */
    getAllMenuTree(){

        return instance.get(`menu/tree`)
    },

    /**
     * 添加
     */
    addEntity(entity){
        return instance.post(`menu`,entity)
    },

    /**
     * 修改
     * @param entity
     */
    updateEntity(entity){
        return instance.put(`menu`,entity)

    },

    /**
     * 删除
     */
    deleteById(id){
        return instance.delete(`menu/${id}`)
    },

    /**
     *通过id查询
     */
    findById(id){
        return instance.get(`menu/${id}`)
    }



};

export  default menu;