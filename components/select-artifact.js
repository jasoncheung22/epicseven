import {artifacts} from "../assets/js/artifacts.js";

export const ComponentSelectArtifact = {
    props: ['title', 'value'],
    data: function () {
        return {
            artifacts: artifacts
        }
    },
    methods: {
        select($event) {
            this.$emit('input', $event.target.value);
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true">\n' +
        '<option v-for="item in artifacts" :value="item.name">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}