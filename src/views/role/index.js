import {
    findPage, deleteById, batchDelete, addEntity, findById, updataEdit,
    getRoleByMenu, getMenuByRoleMenu
} from '@/api/role'
import dateOptions from "@/utils/date";
import menu from "../../api/menu";

let brand = {
    name: "index",
    data() {
        return {
            dateOptions,
            tableData: [],
            total: 0,
            //分页
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            menuList: [],
            clickId: 0,
            selectMenuIds: [],

            // 批量删除定义的数组
            batchIds: [],
            // 添加修改框 默认false 不弹出
            dialogVisible: false,
            // 表单数据对象
            formData: {},
            defaultProps: {
                children: 'children',
                label: 'menuTitle'
            }
        }
    },
    created() {
        this.searchPage();
        this.getAllMenuTree();
    },

    methods: {


        /**
         * 查询所有
         */
        async searchPage() {
            let response = await findPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },

        /**
         * 加载所有的权限
         */
        async getAllMenuTree() {
            // 去除后台拼接的主目录
            let response = await menu.getAllMenuTree();
            this.menuList = response[0].children;
        },

        /**
         * 通过id删除  拿到id值 把数据写入在template模板中 从 <template v-slot="obj">
         *    从 obj 中拿取id (id=obj.row.id)
         */
        async deleteById() {
            await deleteById(this.formData.id);
            this.searchPage();
        },

        /**
         * 批量删除
         * @param val
         */
        async batchDeleteByIds() {
            await batchDelete(this.batchIds);
            this.searchPage();
        },


        /**
         * 添加或修改方法
         */
        async addOrEdit() {
            if (this.formData.id) {
                //修改操作
                await this.updataEdit()
            } else {
                // 没id进行添加操作
                await this.addEntity()
            }
            this.searchPage();
        },


        /**
         * 添加方法
         */
        async addEntity() {
            await addEntity(this.formData);
        },


        /**
         * 修改方法
         */
        async updataEdit() {
            await updataEdit(this.formData);
        },

        /**
         * 每一条数据的点击事件
         */
        rowClick(row) {
            this.clickId = row.id;
            this.getMenuByRoleMenu()
        },

        /**
         * 通过角色id获取角色的权限
         */
        async getMenuByRoleMenu() {
            let response = await getMenuByRoleMenu(this.clickId)
            this.$refs.tree.setCheckedKeys(response);
        },

        /**checkbox勾选改变
         * @param val
         */
        selectChange(val) {
            // 如果勾选的id长度为1 则把第一个id赋值给formData.id
            if (val.length == 1) {
                this.formData.id = val[0].id
            } else {
                // 清空id 将id设置为0
                this.formData.id = 0;
            }
            this.batchIds = val.map(item => item.id);
        },

        /**
         * 通过id进行查询
         * @param page
         */
        async findById() {
            //把通过id查询到的 内容 赋值给 fromData
            this.formData = await findById(this.formData.id);
            // 回显img图片 通过id查询到的所有数据都在 formData 里面 把formData中的brandLogo 赋值给 this.imgUrl即可
            this.imageUrl = this.formData.brandLogo;
        },

        /**
         * 给角色添加权限
         */
        async getRoleByMenu() {
            await getRoleByMenu(this.clickId, this.selectMenuIds)
            this.searchPage()
        },

        /**
         * 显示确定菜单弹框
         * @param page
         */
        showMenuMessageBox() {
            this.$confirm('是否确定为此用户添加这些权限, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确定
                this.selectMenuIds = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());
                this.getRoleByMenu();
                this.$message({
                    type: 'success',
                    message: '授权成功!'
                });
            }).catch(() => {
                // 取消
                this.$message({
                    type: 'warning ',
                    message: '授权已取消!'
                });
            });
        },

        //选择页数的时候 发生改变
        currentPageChange(page) {
            this.searchParams.currentPage = page;
            this.searchPage();
        },
        //时间框选择时间
        chooseTime() {
            this.searchParams.startTime = this.dateOptions.startDate[0];
            this.searchParams.endTime = this.dateOptions.startDate[1];
        },
        resetForm() {
            this.searchParams = {currentPage: 1, pageSize: 5}
            this.dateOptions.startDate = '';
        },

        /**
         * 展示批量删除的弹框
         */
        showBatchDeleteDialog() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //点击按钮后执行方法
                this.batchDeleteByIds();
            })
        },

    }

};

export default brand;
