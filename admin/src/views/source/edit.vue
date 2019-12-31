<template>
    <div class="category-edit">
        <el-form :model="form" label-width="80px" style="width: 30%;">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="form.category" placeholder="请选择所属分类">
                    <el-option v-for="(item,i) in categoryList" :key="i" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="URL">
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
            form: {
                name: '',
                category: null,
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
                this.$http.put('/source/' + this.id, this.form).then(res => {
                    if(res.data.nModified > 0) {
                        this.$message.success(`修改成功`);
                        this.$router.push('/source/list');
                    } else {
                        this.$message.error(`修改失败`);
                    }
                }).catch(err => {
                    return this.$message.error(err);
                });
            } else {
                // 添加
                this.$http.post('/source', this.form).then(res => {
                    if(res.data.length > 0) {
                        this.$message.success(`保存成功`);
                        this.$router.push('/source/list');
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
            this.$http.get('/source/' + this.id).then(res => {
                this.form = res.data;
            }).catch(err => {
                return this.$message.error(err);
            });
        },
        // 获取分类列表
        getCategory() {
            this.$http.get('/category').then(res => {
                this.categoryList = res.data;
            }).catch(err => {
                return this.$message.error(err);
            });
        }
    },
    created() {
        if (this.id) {
            this.setHeaderName('编辑直播源');
            this.getData();
        } else {
            this.setHeaderName('添加直播源');
        }
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped></style>
