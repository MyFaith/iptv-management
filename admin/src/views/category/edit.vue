<template>
    <div class="category-edit">
        <el-form :model="form" label-width="80px" style="width: 30%;">
            <el-form-item label="分类名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="上级分类">
                <el-select v-model="form.parent" placeholder="请选择上级分类">
                    <el-option label="分类1" :value="1"></el-option>
                    <el-option label="分类2" :value="2"></el-option>
                    <el-option label="分类3" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CategoryEdit extends Vue {
    form = {
        name: '',
        parent: ''
    };

    save() {
        console.log('submit!');
    }
}
</script>

<style></style>
