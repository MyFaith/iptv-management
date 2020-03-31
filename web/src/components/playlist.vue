<template>
    <div class="playlist">
        <a-collapse accordion>
            <a-collapse-panel header="A">
                <template>
                    <a-collapse accordion>
                        <a-collapse-panel header="AA">
                            <p>111</p>
                        </a-collapse-panel>
                    </a-collapse>
                </template>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: []
        };
    },
    created() {
        this.$http.get('/category').then(res => {
            this.category = res.data.list.reduce((arr, item) => {
                if (item.parent) {
                    const parentObj = arr.find(e => e._id === item.parent);
                    if (parentObj) {
                        parentObj.children.push(item);
                    } else {
                        const tmp = res.data.list.find(e => e._id === item.parent);
                        arr.push({ ...tmp, children: [item] });
                    }
                } else {
                    if (!arr.find(e => e._id === item._id)) {
                        arr.push({ ...item, children: [] });
                    }
                }
                return arr;
            }, []);
        });
    }
};
</script>

<style lang="scss" scoped>
.playlist {
    margin: 50px auto;
    width: 30%;
    ::v-deep .ant-collapse {
        background: transparent;
        border: 0;
        .ant-collapse-item {
            background: #424242;
            border: 0;
            border-radius: 0;
            .ant-collapse-header {
                border: 0;
                border-radius: 0;
            }
            .ant-collapse-content {
                border: 0;
                .ant-collapse-content-box {
                    background: #424242;
                    border: 0;
                }
            }
        }

        .ant-collapse-item > .ant-collapse-header:hover {
            background: #585858;
        }
    }
}
</style>
