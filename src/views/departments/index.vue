<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 内容 -->
        <!--这里的props父传子的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @editDepts="editDepts" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件  -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { }, // 头部的数据结构对象
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false, // 是否显示弹窗
      node: null, // 记录当前点击的node节点
      loading: false // 当前的控制显示弹层
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取组织架构
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      // this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.company = { name: 'XXXXXX有限公司', manager: '负责人', id: '' }
      this.departs = transListToTreeData(result.depts, '') // 将得到的数据转化成树形结构
      // console.log(result)
      this.loading = false
    },
    // 添加子部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
      // 获取部门详情
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size:14px;
}
</style>
