<template>
    <div class="brand-wrapper">
        <!--      查询表单 -->
        <div class="search-form">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="品牌名称">
                    <el-input placeholder="请输入品牌名称" v-model="searchParams.brandName"></el-input>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-date-picker
                            style="width: 240px"
                            type="datetimerange"

                            :picker-options="dateOptions.pickerOptions"
                            v-model="dateOptions.startDate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="-"
                            @change="chooseTime"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="left">
                    </el-date-picker>
                </el-form-item>
                <!--        <el-form-item label="活动区域">-->
                <!--          <el-select  placeholder="活动区域">-->
                <!--            <el-option label="区域一" value="shanghai"></el-option>-->
                <!--            <el-option label="区域二" value="beijing"></el-option>-->
                <!--          </el-select>-->
                <!--        </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="searchPage">查询</el-button>
                    <el-button type="warning" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--    操作功能 -->
        <div class="crud-box">
            <el-button type="primary" size="mini" icon="el-icon-edit"
                       @click="dialogVisible=true,formData={},imageUrl='',categoryLevel=1">新建
            </el-button>
            <el-button type="success" size="mini" icon="el-icon-edit" :disabled="batchIds.length!=1"
                       @click="dialogVisible=true,findById()">修改
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" :disabled="batchIds.length<=0"
                       @click="showBatchDeleteDialog">删除
            </el-button>
        </div>
        <!--    表格数据-->
        <div class="data-box">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    row-key="id"
                    :tree-props="{children: 'children'}"
                    @selection-change="selectChange">
                <el-table-column
                        align="center"
                        prop="catetoryName"
                        label="分类名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="categoryLevel"
                        label="分类等级"
                        width="180">
                    <template v-slot="obj">
                        <el-tag v-if="obj.row.categoryLevel==1" type="success">一级分类</el-tag>
                        <el-tag v-if="obj.row.categoryLevel==2" type="warning">二级分类</el-tag>
                        <el-tag v-if="obj.row.categoryLevel==3">三级分类</el-tag>
                    </template>

                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                                   @click="dialogVisible=true,formData.id=obj.row.id,findById()"
                                   style="margin-right:5px ">
                        </el-button>
                        <el-popconfirm
                                confirm-button-text='确定'
                                cancel-button-text='取消'
                                icon="el-icon-info"
                                icon-color="red"
                                @confirm="deleteById"
                                placement="top"
                                title="是否要删除本条记录？"
                        >
                            <el-button slot="reference" type="danger" size="mini" @click="formData.id=obj.row.id"
                                       icon="el-icon-delete"></el-button>
                        </el-popconfirm>
                    </template>


                </el-table-column>
            </el-table>

        </div>

        <!--    弹框-->
        <el-dialog
                title="实体操作"
                :visible.sync="dialogVisible"
                width="33%"
        >
            <el-form ref="form" label-width="80px" size="small">
                <el-form-item label="分类名称">
                    <el-input v-model="formData.catetoryName"></el-input>
                </el-form-item>
                <el-form-item label="分类等级">
                    <template>
                        <el-radio-group v-model="categoryLevel"
                        @change="chooseLever">
                            <!--双向绑定 categoryLevel -->
                        <el-radio :label="1">一级分类</el-radio>
                        <el-radio :label="2">二级分类</el-radio>
                        <el-radio :label="3">三级分类</el-radio>
                        </el-radio-group>
                    </template>
                </el-form-item>
                <!--/* categoryLevel != 1 的时候展示出来 等于一的时候不展示框 */-->
                <el-form-item label="分类选择" v-if="categoryLevel!=1">
                    <el-cascader
                            v-model="selectIds"
                            :props="prop"
                            placeholder="请选择父级分类"
                            :options="options"
                            @change="handleChange">
                    </el-cascader>
                </el-form-item>


            </el-form>


            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false,addOrEdit()">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import category from './index.js'

    export default category;
</script>

<style src="./index.scss" lang="scss"></style>
