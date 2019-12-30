<template>
    <div class="source-list">
        <el-table :data="tableData" tooltip-effect="dark" stripe style="width: 80%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="category" label="所属分类"></el-table-column>
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
            tableData: [
                { _id: 1, name: 'cctv1', category: '央视', url: 'http://xxxxxx.m3u8' }
            ]
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

            }).catch(err => {
                return this.$message.error(err);
            });
        },
        // 获取数据
        getData() {
        }
    },
    created() {
        this.setHeaderName('直播源管理');
        this.getData();
    }
};
</script>

<style lang="scss" scoped></style>
