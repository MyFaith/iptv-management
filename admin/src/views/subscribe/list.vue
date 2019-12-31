<template>
    <div class="subscribe-list">
        <div class="controls">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="isShowEdit = true"></el-button>
        </div>
        <el-table :data="tableData" tooltip-effect="dark" stripe style="width: 80%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="订阅分类">
                <template slot-scope="scope">
                    {{ scope.row.category.name }}
                </template>
            </el-table-column>
            <el-table-column prop="url" label="订阅地址"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="warning" icon="el-icon-refresh" @click="refresh(scope.row)"></el-button>
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <edit :show="isShowEdit" @close="isShowEdit = false;getData()"></edit>
    </div>
</template>

<script>
import Edit from './edit';
import { mapMutations } from 'vuex';

export default {
    components: { Edit },
    data() {
        return {
            tableData: [],
            isShowEdit: false
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
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$http.delete('/subscribe/' + row._id);
            }).then(res => {
                this.$message.success(`已删除 ${res.data.deletedCount} 条数据.`);
                this.getData();
            }).catch(err => {
                return this.$message.error(err);
            });
        },
        // 刷新订阅
        // refresh(row) {
        //     this.$http.post('/subscribe/' + row._id).then(res => {
                
        //     }).catch(err => {
        //         return this.$message.error(err);
        //     });
        // },
        // 获取数据
        getData() {
            this.$http.get('/subscribe').then(res => {
                this.tableData = res.data;
            }).catch(err => {
                return this.$message.error(err);
            });
        }
    },
    created() {
        this.setHeaderName('直播源订阅');
        this.getData();
    }
};
</script>

<style lang="scss" scoped></style>
