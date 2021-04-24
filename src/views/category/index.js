import {findPage, deleteById, batchDelete, addEntity, findById, updataEdit, getSelectData} from '@/api/category'
import dateOptions from "@/utils/date";

let brand = {
    name: "index",
    data() {
        return {
            dateOptions,
            tableData: [],
            //分页
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            // 双向绑定的数据
            categoryLevel: 1,

            // 批量删除定义的数组
            batchIds: [],
            // 添加修改框 默认false 不弹出
            dialogVisible: false,
            // 表单数据对象
            formData: {},
            radio: '',
            // 指定和 label 绑定的值
            prop: {
                label: 'catetoryName',
                value: 'id'
            },

            // 以下是级联选择器的属性
            selectIds: [],
            options: [],
            handleChange: ""

        }
    },
    created() {
        this.searchPage();
    },
    methods: {
        /*
        * 查询所有
        */
        async searchPage() {
            this.tableData = await findPage(this.searchParams);
        },


        /**
         * 当change事件触发改变的时候 执行以下方法
         */
        async chooseLever(id) {
            // getSelectData方法 赋值给 options
            this.options = await getSelectData();
            switch (id) {
                case 1:
                    this.options = [];
                    break;
                case 2:
                    // 遍历拿到children属性删除
                    // 通过父id为0的拿一级分类
                    this.options.forEach(item => {
                        delete item.children
                    });

                    break;
            }


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
         * 添加或修改方法
         */
        async addOrEdit() {

            // 不管在添加或者修改前 都把categoryLevel的值赋值给fromData
            this.formData.categoryLevel = this.categoryLevel;
            if (this.categoryLevel == 1) {
                this.formData.parentId = 0;
            } else {
                this.formData.parentId = this.selectIds[this.selectIds.length - 1];
            }


            if (this.formData.id) {
                //修改操作
                await  this.updataEdit()

            } else {
                // 没id进行添加操作
                await  this.addEntity()

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
         *
         */
        async findById() {
            //把通过id查询到的 内容 赋值给 fromData
            this.formData = await findById(this.formData.id);
            // 回显img图片 通过id查询到的所有数据都在 formData 里面 把formData中的brandLogo 赋值给 this.imgUrl即可
            this.imageUrl = this.formData.brandLogo;

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
