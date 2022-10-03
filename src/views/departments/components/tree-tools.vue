<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 负责人 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 操作 -->
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <!-- 编辑部门和删除部门只会在子节点上显示 -->
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
import eventBus from './index'
export default {
  // props可以用数组来接收数据 也可以用对象来接收
  props: {
    // 定义一个props属性
    treeNode: {
      type: Object, // 对象类型
      required: true // 必须传treeNode属性
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 操作节点调用的方法
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门的操作
        this.$emit('addDepts', this.treeNode)
        // 给弹层传入title
        eventBus.$emit('showTitle', '添加子部门')
      } else if (type === 'edit') {
        //  编辑部门的操作
        this.$emit('editDepts', this.treeNode)
        // 给弹层传入title
        eventBus.$emit('showTitle', '编辑部门')
      } else {
        //  删除操作
        this.$confirm('确定要删除该部门吗').then(() => {
          // 点击确定进入then
          return delDepartments(this.treeNode.id) // 返回promise对象
        }).then(() => {
          // 删除成功
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
