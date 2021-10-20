<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#' + modalid">
      {{ title }}
    </button>
    {{ selectedArtifact }}
    <!-- Modal -->
    <div class="modal fade" :id="modalid" tabindex="-1" role="dialog" :aria-labelledby="huid" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="huid">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="col-md-8">
                <div class="form-group">
                  <div class="btn-group btn-group-toggle" data-toggle="buttons" id="role">
                    <label class="btn btn-primary active">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autocomplete="off"
                        value=""
                        v-model="selectedRole"
                        checked
                      /><img src="assets/images/Common.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autocomplete="off"
                        value="warrior"
                        v-model="selectedRole"
                      /><img src="assets/images/Warrior.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        autocomplete="off"
                        value="knight"
                        v-model="selectedRole"
                      /><img src="assets/images/Knight.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option4"
                        autocomplete="off"
                        value="ranger"
                        v-model="selectedRole"
                      /><img src="assets/images/Ranger.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option5"
                        autocomplete="off"
                        value="mage"
                        v-model="selectedRole"
                      /><img src="assets/images/Mage.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option6"
                        autocomplete="off"
                        value="manauser"
                        v-model="selectedRole"
                      /><img src="assets/images/Soul_Weaver.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option7"
                        autocomplete="off"
                        value="assassin"
                        v-model="selectedRole"
                      /><img src="assets/images/Thief.png" />
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <div class="btn-group btn-group-toggle" data-toggle="buttons" id="rarity">
                    <label class="btn btn-primary active">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autocomplete="off"
                        value="3"
                        v-model="selectedRarity"
                        checked
                      />
                      3<img src="assets/images/star.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autocomplete="off"
                        value="4"
                        v-model="selectedRarity"
                      />
                      4<img src="assets/images/star.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        autocomplete="off"
                        value="5"
                        v-model="selectedRarity"
                      />
                      5<img src="assets/images/star.png" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <select
              :value="value"
              class="selectpicker"
              :title="title"
              data-live-search="true"
              data-width="100%"
              @change="select($event)"
            >
              <option v-for="item in getArtifact" :key="item._id" :data-tokens="getTokens(item)">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap-select';
import { en } from '../assets/js/en.artifacts';
import { fr } from '../assets/js/fr.artifacts';
import { cn } from '../assets/js/cn.artifacts';
import { tw } from '../assets/js/tw.artifacts';
import { nicknames } from '../assets/js/nicknames';

export default Vue.extend({
  props: ['title', 'value', 'huid'],
  data() {
    return {
      artifacts: en,
      nicknames,
      modalid: 'temp',
      selectedArtifact: '',
      selectedRarity: '3',
      selectedRole: '',
    };
  },
  computed: {
    getArtifact(): Array<any> {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
      return this.getItems();
    },
  },
  created() {
    this.artifacts = this.getItems();
    this.modalid = this.huid;
  },
  watch: {
    title(): void {
      this.artifacts = this.getItems();
    },
  },
  updated() {
    $(this.$el).selectpicker({ title: this.title }).selectpicker('render');
  },
  methods: {
    select($event: Event): void {
      this.selectedArtifact = ($event.target as HTMLInputElement).value;
      this.$emit('input', ($event.target as HTMLInputElement).value);
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    getItems(): Array<any> {
      let artifacts = null;
      const filteredArtifacts = [];
      switch (this.$i18n.locale) {
        case 'en':
          artifacts = en;
          break;
        case 'fr':
          artifacts = fr;
          break;
        case 'cn':
          artifacts = cn;
          break;
        case 'tw':
          artifacts = tw;
          break;
        default:
          artifacts = en;
          break;
      }

      for (let i = 0; i < artifacts.length; i += 1) {
        if (artifacts[i].rarity.toString() === this.selectedRarity && artifacts[i].role === this.selectedRole) {
          filteredArtifacts.push(artifacts[i]);
        }
      }

      return filteredArtifacts;
    },
    getTokens(item: { _id: string }): string {
      if (item._id && nicknames[item._id]) {
        return nicknames[item._id];
      }
      return '';
    },
  },
});
</script>

<style scoped>
img {
  width: 20px;
}
</style>
