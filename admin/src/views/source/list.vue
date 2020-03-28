<template>
    <div class="source-list">
        <!-- 分类移动对话框 -->
        <el-dialog title="分类移动" :visible.sync="isShowMigrate" width="10%" @close="isShowMigrate=false">
            <el-select v-model="migrateId" placeholder="请选择分类">
                <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
            <span slot="footer">
                <el-button @click="isShowMigrate=false">取消</el-button>
                <el-button type="primary" @click="migrateBatch">确定</el-button>
            </span>
        </el-dialog>
        
        <div class="filters">
            <div class="search-box">
                <el-input class="name" size="small" v-model="filters.name" placeholder="根据名称搜索"></el-input>
                <el-input class="url" size="small" v-model="filters.url" placeholder="根据URL搜索"></el-input>
                <el-button class="search" type="primary" size="small" icon="el-icon-search" @click="getData"></el-button>
            </div>
            <div class="control-btns">
                <el-button class="add" type="primary" size="small" icon="el-icon-plus" @click="$router.push('/source/add')"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="removeBatch"></el-button>
                <el-button class="migrate" type="warning" size="small" icon="el-icon-guide" @click="isShowMigrate=true"></el-button>
            </div>
        </div>
        <el-table ref="table" :data="tableData" tooltip-effect="dark" stripe style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="LOGO">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.logo" :src="scope.row.logo" fit="cover" style="width: 150px; height: 80px"></el-image>
                    <span v-else>暂无</span>
                </template>
            </el-table-column>
            <el-table-column prop="groupTitle" label="原始分类"></el-table-column>
            <el-table-column label="所属分类">
                <template slot-scope="scope">
                    <router-link v-if="scope.row.category" tag="el-link" type="primary" :to="`/category/edit/${scope.row.category._id}`">{{ scope.row.category.name }}</router-link>
                    <span v-else>-</span>
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
        <el-pagination class="page" background layout="prev, pager, next" :current-page="page" :total="total" @current-change="changePage"></el-pagination>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            tableData: [],
            categoryList: [],
            filters: {
                name: '',
                url: ''
            },
            isShowMigrate: false,
            migrateId: '',
            page: 1,
            total: 0
        };
    },
    methods: {
        ...mapMutations(['setHeaderName']),
        // 翻页
        changePage(page) {
            this.page = page;
            this.getData();
        },
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
                return this.$http.delete('/source/' + row._id);
            }).then(res => {
                this.$message.success(`已删除 ${res.data.deletedCount} 条数据.`);
                this.getData();
            });
        },
        // 批量删除
        removeBatch() {
            const selected = this.$refs.table.selection;
            const ids = selected.reduce((arr, item) => {
                arr.push(item._id);
                return arr;
            }, []);
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$http.delete('/source/' + ids.join(','));
            }).then(res => {
                this.$message.success(`已删除 ${res.data.deletedCount} 条数据.`);
                this.getData();
            });
        },
        // 批量分类移动
        migrateBatch() {
            const selected = this.$refs.table.selection;
            const ids = selected.reduce((arr, item) => {
                arr.push(item._id);
                return arr;
            }, []);

            this.$http.post('/migrateCategory', {
                ids,
                to: this.migrateId
            }).then(() => {
                this.$message.success('移动成功');
                this.isShowMigrate = false;
                this.getData();
            }).catch(err => {
                return this.$message.error(err);
            });
            
        },
        // 获取数据
        getData() {
            this.$http.get('/source', {
                params: {
                    page: this.page,
                    size: 10,
                    ...this.filters
                }
            }).then(res => {
                this.tableData = res.data.list;
                this.total = res.data.total;
            }).catch(err => {
                return this.$message.error(err);
            });
        },
        // 获取分类列表
        getCategory() {
            this.$http.get('/category').then(res => {
                this.categoryList = res.data.list;
            }).catch(err => {
                return this.$message.error(err);
            });
        }
    },
    created() {
        this.setHeaderName('直播源管理');
        this.getData();
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped>
.filters {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    * {
        margin: 0 10px;
    }
    .search-box {
        .name, .url {
            width: 200px;
        }
    }
}
.page {
    margin: 10px 0;
}
</style>
