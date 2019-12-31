<template>
    <div class="source-list">
        <el-table :data="tableData" tooltip-effect="dark" stripe style="width: 80%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="所属分类">
                <template slot-scope="scope">
                    <router-link tag="el-link" type="primary" :to="`/category/edit/${scope.row.category._id}`">{{ scope.row.category.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="URL"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        ...mapMutations(['setHeaderName']),
        // 编辑
        edit(row) {
            this.$router.push(`/source/edit/${row._id}`);
        },
        // 删除
        remove(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$http.delete('/source/' + row._id);
            }).then(res => {
                this.$message.success(`已删除 ${res.data.deletedCount} 条数据.`);
                this.getData();
            }).catch(err => {
                return this.$message.error(err);
            });
        },
        // 获取数据
        getData() {
            this.$http.get('/source').then(res => {
                this.tableData = res.data;
            }).catch(err => {
                return this.$message.error(err);
            });
        }
    },
    created() {
        this.setHeaderName('直播源管理');
        this.getData();
    }
};
</script>

<style lang="scss" scoped></style>
