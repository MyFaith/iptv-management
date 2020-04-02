<template>
    <div class="playlist">
        <a-form layout="horizontal">
            <a-form-item label="搜索" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20 }">
                <a-input-search v-model="searchText" @search="search" enterButton></a-input-search>
            </a-form-item>
        </a-form>
        <a-collapse>
          <a-collapse-panel class="category" v-for="(category, key) in source" :key="key" :header="key">
              <a-list class="source-list">
                <a-list-item class="source-item" @click="switchChannel(source)" v-for="(source, idx) in category" :key="idx">
                    {{ source.name }}
                </a-list-item>
              </a-list>
          </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: '',
            source: {},
            originalSource: {}
        };
    },
    methods: {
        switchChannel(data) {
            this.$emit('switchChannel', data);
        },
        search() {
            const _this = this;
            if (_this.searchText) {
                _this.originalSource = { ..._this.source };
                Object.keys(_this.source).forEach(key => {
                    const data = _this.source[key].filter(e => {
                        return e.name.indexOf(_this.searchText) !== -1
                    });
                    _this.source[key] = data;
                });
            } else {
                if (Object.keys(_this.originalSource).length > 0) _this.source = _this.originalSource;
            }
        },
        getData() {
            const params = { page: 0, size: 0 }
            this.$http.get('/source', { params }).then(res => {
                this.source = res.data.list.reduce(function (obj, item) {
                    var key = item['category']['name'];
                    if (!obj.hasOwnProperty(key)) {
                        obj[key] = [];
                    }
                    obj[key].push(item);
                    return obj;
                }, {});
            });
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style lang="scss" scoped>
.playlist {
    margin: 80px auto;
    width: 20%;
    .ant-list-item {
        padding: 12px;
    }
    .source-item {
        cursor: pointer;
        &:hover {
            background: #f3f3f3;
        }
    }
    ::v-deep .ant-collapse {
        .ant-collapse-item {
            .ant-collapse-content {
                .ant-collapse-content-box {
                    padding: 0;
                }
            }
        }
    }
}
</style>
