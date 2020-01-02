<template>
    <div class="crawl-edit">
        <el-form :model="form" label-width="150px" style="width: 30%;">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="form.category" placeholder="请选择所属分类">
                    <el-option v-for="(item,i) in categoryList" :key="i" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="直播平台">
                <el-select v-model="form.platform" placeholder="请选择直播平台">
                    <el-option label="斗鱼" :value="1"></el-option>
                    <el-option label="虎牙" :value="2"></el-option>
                    <el-option label="战旗" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="直播间地址">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: {
        id: String
    },
    data() {
        return {
            title: '',
            form: {
                name: '',
                category: null,
                platform: '',
                url: ''
            },
            categoryList: []
        };
    },
    methods: {
        ...mapMutations(['setHeaderName']),

        // 保存
        save() {
            if(this.id) {
                // 更新
                this.$http.put('/crawl/' + this.id, this.form).then(res => {
                    if(res.data.nModified > 0) {
                        this.$message.success(`修改成功`);
                        this.$router.push('/crawl/list');
                    } else {
                        this.$message.error(`修改失败`);
                    }
                }).catch(err => {
                    return this.$message.error(err);
                });
            } else {
                // 添加
                this.$http.post('/crawl', this.form).then(res => {
                    if(res.data.length > 0) {
                        this.$message.success(`保存成功`);
                        this.$router.push('/crawl/list');
                    } else {
                        this.$message.error(`修改失败`);
                    }
                }).catch(err => {
                    return this.$message.error(err);
                });
            }
        },
        // 获取数据
        getData() {
            this.$http.get('/crawl/' + this.id).then(res => {
                this.form = res.data;
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
        if (this.id) {
            this.setHeaderName('编辑直播平台');
            this.getData();
        } else {
            this.setHeaderName('添加直播平台');
        }
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped></style>
