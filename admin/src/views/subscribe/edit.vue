<template>
    <el-dialog :title="title" :visible.sync="show" width="30%" :before-close="handleClose">
        <el-form :model="form" label-width="80px">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保存</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        id: String,
        show: Boolean
    },
    data() {
        return {
            isShow: true,
            title: '',
            form: {
                name: '',
                category: null,
                url: ''
            },
            categoryList: []
        };
    },
    methods: {
        // 保存
        save() {
            if(this.id) {
                // 更新
                this.$http.put('/subscribe/' + this.id, this.form).then(res => {
                    if(res.data.nModified > 0) {
                        this.$message.success(`修改成功`);
                        this.handleClose();
                    } else {
                        this.$message.error(`修改失败`);
                    }
                }).catch(err => {
                    return this.$message.error(err);
                });
            } else {
                // 添加
                this.$http.post('/subscribe', this.form).then(res => {
                    if(res.data.length > 0) {
                        this.$message.success(`保存成功`);
                        this.handleClose();
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
            this.$http.get('/subscribe/' + this.id).then(res => {
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
        },
        handleClose() {
            this.$emit('close');
        }
    },
    created() {
        if (this.id) {
            this.title = '编辑订阅';
            this.getData();
        } else {
            this.title = '添加订阅';
        }
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped></style>
