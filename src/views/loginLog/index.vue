<template>

  <div class="brand-wrapper">

    <!--      查询表单 -->
    <div class="search-form">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="品牌名称">
          <el-input placeholder="请输入品牌名称" v-model="searchParams.adminName"></el-input>
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

        <el-form-item>
          <el-button type="primary" @click="searchPage">查询</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!--    操作功能 -->
    <div class="crud-box">

      <el-button type="danger" v-has-prem="['loginLog:batch']" size="mini" icon="el-icon-delete"
                 :disabled="batchIds.length<=0"
                 @click="showBatchDeleteDialog">批量删除
      </el-button>
    </div>

    <!--    表格数据-->
    <div class="data-box">
      <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="selectChange">
        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            align="center"
            prop="adminName"
            label="用户名称"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="requestIp"
            label="ip地址"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="loginAddress"
            label="登录地址">
        </el-table-column>
        <el-table-column
            align="center"
            prop="broswerName"
            label="登录机型">
        </el-table-column>
        <el-table-column
            align="center"
            prop="osName"
            label="登录系统">
        </el-table-column>
        <el-table-column
            align="center"
            prop="loginStatus"
            label="登录状态">
        </el-table-column>
        <el-table-column
            align="center"
            prop="message"
            label="提示信息">
        </el-table-column>
        <el-table-column
            align="center"
            prop="loginTime"
            label="登录时间">
        </el-table-column>

        <el-table-column
            align="center"
            label="操作">
          <template v-slot="obj">
            <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteById"
                placement="top"
                v-has-prem="['loginLog:delete']"
                title="是否要删除本条记录？"
            >
              <el-button slot="reference" type="danger" size="mini" @click="formData.id=obj.row.id"
                         icon="el-icon-delete"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <!--    分页-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="searchParams.pageSize"
          :current-page="searchParams.currentPage"
          @current-change="currentPageChange"
      >
      </el-pagination>
    </div>


  </div>
</template>

<script>
import brand from './index.js'

export default brand;
</script>

<style src="./index.scss" lang="scss"></style>
