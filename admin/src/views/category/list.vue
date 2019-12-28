<template>
    <div class="category-list">
        <el-table :data="tableData" tooltip-effect="dark" stripe style="width: 80%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column label="上级分类">
                <template slot-scope="scope">
                    <span v-if="scope.row.parent">{{ scope.row.parent }}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

@Component
export default class CategoryList extends Vue {
    @Mutation setHeaderName: any;

    tableData = [
        { id: 1, name: 'category name1', parent: '' },
        { id: 2, name: 'category name2', parent: '' },
        { id: 3, name: 'category name3', parent: 1 }
    ];

    // 编辑
    edit(row: any) {
        this.$router.push(`/category/edit/${row.id}`);
    }

    // 删除
    remove(row: any) {}

    created() {
        this.setHeaderName('分类管理');
    }
}
</script>

<style></style>
