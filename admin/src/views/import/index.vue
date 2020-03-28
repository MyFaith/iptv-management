<template>
    <div class="import-source">
        <el-form :model="form" label-width="150px" style="width: 30%;">
            <el-form-item label="导入方式">
                <el-radio-group v-model="form.importType">
                    <el-radio :label="1">从URL导入</el-radio>
                    <el-radio :label="2">从M3U文件导入</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="保存分类">
                <el-select v-model="form.category" placeholder="请选择所属分类">
                    <el-option v-for="(item,i) in categoryList" :key="i" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="URL" v-if="form.importType === 1">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="M3U文件内容" v-if="form.importType === 2">
                <el-input type="textarea" rows="20" v-model="form.m3uContent"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="importSource">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            title: '',
            form: {
                importType: 1,
                category: null,
                url: '',
                m3uContent: ''
            },
            categoryList: []
        };
    },
    methods: {
        ...mapMutations(['setHeaderName']),

        // 获取分类列表
        getCategory() {
            this.$http.get('/category').then(res => {
                this.categoryList = res.data.list;
            }).catch(err => {
                return this.$message.error(err);
            });
        },

        // 导入直播源
        importSource() {
            this.$http.post('/importSource', this.form).then(() => {
                this.$message.success('直播源导入成功');
                this.$router.push('/source/list');
            }).catch(err => {
                return this.$message.error(err);
            });
        } 
    },
    created() {
        this.setHeaderName('直播源导入');
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped></style>
