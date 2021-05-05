import menu from '@/api/menu';
import dateOptions from "@/utils/date";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

let brand = {
    name: "index",
    // 注册组件
    components: {Treeselect},
    data() {
        return {
            dateOptions,
            tableData: [],
            total: 0,
            // 分页
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            // 权限框数据
            menuList: [],

            // 添加修改框 默认false 不弹出
            dialogVisible: false,
            // 表单数据对象
            formData: {},
            normalizer(node) {
                if (node.children == null || node.children == 'null') {
                    delete node.children;
                }
                return {
                    id: node.id,
                    label: node.menuTitle,
                    children: node.children,
                }
            },


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
            let response = await menu.searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },

        /**
         * 通过id删除  拿到id值 把数据写入在template模板中 从 <template v-slot="obj">
         *    从 obj 中拿取id (id=obj.row.id)
         */
        async deleteById() {
            await menu.deleteById(this.formData.id);
            this.searchPage();
        },

        /**
         * 获取所有的菜单 tree
         */
        async getAllMenuTree() {
            this.menuList = await menu.getAllMenuTree();
            let response;
            // eslint-disable-next-line no-unused-vars
            let root = {
                id: 0,
                menuTitle: "主目录",
                // eslint-disable-next-line no-undef
                children: response,
            };

        },


        /**
         * 添加或修改方法
         */
        async addOrEdit() {
            if (this.formData.id) {
                //修改操作
                await menu.updateEntity(this.formData)
            } else {
                // 没id进行添加操作
                await menu.addEntity(this.formData)
            }
            // 刷新页面
            this.searchPage();
            this.getAllMenuTree();

        },


        /**
         * 初始化页面
         */
        resetFromData() {
            this.formData = {
                // 给默认值 默认选中目录
                menuType: 0,
                isHidden: false,
            }
        },


        /**
         * 通过id进行查询
         */
        async findById() {
            //把通过id查询到的 内容 赋值给 fromData
            this.formData = await menu.findById(this.formData.id);
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
            this.searchParams = {currentPage: 1, pageSize: 5};
            this.dateOptions.startDate = '';
        },


    }

};

export default brand;
