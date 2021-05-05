import admin from '@/api/admin'
import {findAll} from "@/api/role"
import dateOptions from "@/utils/date";
import base64 from '@/utils/base64Utils'
// 引入树形搜索框
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import baseURL from "../../utils/baseURL";

let brand = {
    name: "index",
    // 注册加载
    components: {Treeselect},
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
            //部门数据
            deptList: [],
            exportURL: baseURL.baseURL + "admin/export",
            normalizer(node) {
                if (node.children == null || node.children == 'null') {
                    delete node.children;
                }
                return {

                    id: node.id,
                    label: node.deptName,
                    children: node.children,
                }
            },
            // 批量删除定义的数组
            batchIds: [],
            // 添加修改框 默认false 不弹出
            dialogVisible: false,
            // 表单数据对象
            formData: {
                adminAvatar: "",
            },
            //省
            province: "",
            //市
            city: "",
            //区
            area: "",
            // 省的数据
            provinceList: [],
            // 市的数据
            cityList: [],
            // 区的数据
            areaList: [],
            // 员工列表数据
            roleList: [],
            //前端校验
            rules: {
                adminName: [
                    {required: true, message: '请输入员工姓名', trigger: 'blur'},
                ],
                nickName: [
                    {required: true, message: '请输入员工昵称', trigger: 'blur'},
                ],
                adminPhone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {
                        pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    },
                ],
                adminEmail: [
                    {required: true, message: '请输入员工邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                ],
                adminAddress: [
                    {required: true, message: '请输入详细地址', trigger: 'blur'},
                ],
            },
            resetFields: [],

        }
    },
    created() {
        // 表示进入页面就会执行的方法
        this.searchPage();
        this.getRootDeptList();
        // 获取所有的省
        this.getAllProvince();
        this.getAllRole()
    },

    methods: {

        /**
         * 查询所有部门
         */
        async getAllDeptTree() {
            // 把查询到的所有部门数据 赋值给 deptList
            // this.deptList = await admin.getAllDeptTree();
        },

        /**
         * 拿到所有的部门
         */
        async getRootDeptList() {
            this.deptList = await admin.getRootDeptList();
        },


        /**
         * 执行延时加载的数据
         */
        // async loadTreeSelectData({action, parentNode, callback}) {
        //     let response = await admin.getChildrenById(parentNode.id);
        //     parentNode.children = response;
        //
        // },
        /*
        * 查询所有
        */
        async searchPage() {
            let response = await admin.searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },

        /**
         * 获取所有的省
         */
        async getAllProvince() {
            this.provinceList = await admin.getAreaChildrenById(0);
        },


        /**
         * 获取所有的市
         */
        async getAllCity(name) {
            let index = this.provinceList.findIndex(item => item.name == name);
            let item = this.provinceList[index];
            this.cityList = await admin.getAreaChildrenById(item.id)
        },


        /**
         * 获取所有的区
         **/
        async getAllArea(name) {
            let index = this.cityList.findIndex(item => item.name == name);
            let item = this.cityList[index];
            this.areaList = await admin.getAreaChildrenById(item.id)
        },

        /**
         * 加载所有的角色
         */
        async getAllRole() {
            this.roleList = await findAll();
        },


        /**
         * 文件上传
         */
        uploadSuccess(response) {
            let {status, message, data} = response;
            if (status == 20000) {
                this.formData.adminAvatar = data;
            } else {
                this.$notify.error(message)
            }

        },

        /**
         * 重置formData (初始化)
         */
        resetFormData() {
            this.formData = {
                adminAvatar: '',
                gender: 0,
                isEnable: false,
                adminAddress: '',
                roleIds: [],
            }
            this.province = ""
            //市
            this.city = ""
            //区
            this.area = ""
        },


        /** 通过id删除  拿到id值 把数据写入在template模板中 从 <template v-slot="obj">
         *    从 obj 中拿取id (id=obj.row.id)
         */
        async deleteById() {
            await admin.deleteById(this.formData.id);
            this.searchPage();
        },

        /**
         * 批量删除
         * @param val
         */
        async batchDeleteByIds() {
            await admin.batchDelete(this.batchIds);
            this.searchPage();
        },


        /**
         * 添加或修改方法
         */
        async addOrEdit() {
            //在添加和修改之前进行表单验证
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //成功后关闭弹窗
                    this.dialogVisible = false
                    this.formData.adminAddress = this.province + " " + this.city + " " + this.area + " " + this.formData.adminAddress;
                    if (this.formData.id) {
                        //修改操作
                        await admin.updataEdit(this.formData);
                    } else {
                        //添加操作
                        await admin.addEntity(this.formData);
                        this.$notify({
                            title: '添加成功',
                            message: '',
                            type: 'success'
                        });
                    }
                    this.searchPage();
                    this.Restreset()
                } else {
                    this.$notify.error({
                        title: '表单验证不成功',
                        message: ''
                    });
                    return false;
                }
            });

        },
        /**
         * 表单验证后清空
         */

        Restreset() {
            if (this.$refs.form !== undefined) {
                this.$refs.form.resetFields();
            }
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
         */
        async findById() {
            //把通过id查询到的 内容 赋值给 fromData
            this.formData = await admin.findById(this.formData.id);
            let array = this.formData.adminAddress.split(" ");
            this.province = array[0];
            // 拿到省的id 获取市区
            await this.getAllCity(this.province);
            this.city = array[1];
            await this.getAllArea(this.city);
            this.area = array[2];
            let address = ''
            for (let i = 3; i < array.length; i++) {
                address += array[i] + " "
            }
            this.formData.adminAddress = address;
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

        /**
         * 当图片选择时的钩子函数
         */
        async getImgStr(e) {
            this.imageUrl = await base64.getBase64Str(e.file)
            this.formData.brandLogo = this.imageUrl;
        }

    }

}

export default brand;
