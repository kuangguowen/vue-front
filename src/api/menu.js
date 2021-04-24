
import instance from "@/utils/request";
import role from "../views/menu";


let menu = {

      searchPage(searchForm){

        return instance.get(`menu`,{params:searchForm})
    },

    /**
     * 获取所有的菜单 tree
     */
    getAllMenuTree(){

        return instance.get(`menu/tree`)
    }




};

export  default menu;