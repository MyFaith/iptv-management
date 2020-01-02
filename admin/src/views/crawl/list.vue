<template>
    <div class="crawl-list">
        <div class="filters">
            <div class="inputs">
                <el-input class="name" v-model="filters.name" placeholder="根据名称搜索"></el-input>
                <el-input class="url" v-model="filters.url" placeholder="根据直播间地址搜索"></el-input>
            </div>
            <div class="control-btns">
                <el-button class="add" type="primary" size="small" icon="el-icon-plus" @click="$router.push('/crawl/add')"></el-button>
                <el-button class="crawl" type="warning" size="small" icon="el-icon-refresh" @click="crawlSourceAll" :loading="crawlLoading"></el-button>
                <el-button class="search" type="primary" size="small" icon="el-icon-search" @click="getData"></el-button>
            </div>
        </div>
        <el-table :data="tableData" tooltip-effect="dark" stripe style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="保存分类">
                <template slot-scope="scope">
                    <span v-if="scope.row.category">{{ scope.row.category.name }}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="直播平台">
                <template slot-scope="scope">
                    <span v-if="scope.row.platform === 1">斗鱼</span>
                    <span v-else-if="scope.row.platform === 2">虎牙</span>
                    <span v-else-if="scope.row.platform === 3">战旗</span>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="直播间地址"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="warning" icon="el-icon-refresh" @click="crawlSource(scope.row)" :loading="crawlLoading"></el-button>
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
            filters: {
                name: '',
                url: ''
            },
            page: 1,
            total: 0,
            crawlLoading: false
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
            this.$router.push(`/crawl/edit/${row._id}`);
        },
        // 删除
        remove(row) {
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$http.delete('/crawl/' + row._id);
            }).then(res => {
                this.$message.success(`已删除 ${res.data.deletedCount} 条数据.`);
                this.getData();
            });
        },
        // 抓取直播源
        crawlSource(row) {
            this.crawlLoading = true;
            this.$http.post('/crawl/crawlSource', {
                id: row._id
            }).then(() => {
                this.crawlLoading = false;
                this.$message.success('直播源抓取成功');
            }).catch(err => {
                this.crawlLoading = false;
                return this.$message.error(err);
            });
        },
        // 抓取所有
        crawlSourceAll() {
            this.crawlLoading = true;
            this.$http.post('/crawl/crawlSource').then(() => {
                this.crawlLoading = false;
                this.$message.success('直播源全量抓取成功');
            }).catch(err => {
                this.crawlLoading = false;
                return this.$message.error(err);
            });
        },
        // 获取数据
        getData() {
            this.$http.get('/crawl', {
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
        }
    },
    created() {
        this.setHeaderName('直播平台抓取');
        this.getData();
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
    .inputs {
        .name, .url, .platform {
            width: 200px;
        }
    }
}
.page {
    margin: 10px 0;
}
</style>
