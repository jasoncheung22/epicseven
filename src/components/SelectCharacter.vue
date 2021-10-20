<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#' + modalid">
      {{ title }}
    </button>
    {{ selectedCharacters }}
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
              <div class="col-md-6">
                <div class="form-group">
                  <div class="btn-group btn-group-toggle" data-toggle="buttons" id="attributes">
                    <label class="btn btn-primary active">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autocomplete="off"
                        value="fire"
                        v-model="selectedAttributes"
                        checked
                      /><img src="assets/images/Fire.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autocomplete="off"
                        value="ice"
                        v-model="selectedAttributes"
                      /><img src="assets/images/Ice.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        autocomplete="off"
                        value="wind"
                        v-model="selectedAttributes"
                      /><img src="assets/images/Earth.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option4"
                        autocomplete="off"
                        value="light"
                        v-model="selectedAttributes"
                      /><img src="assets/images/Light.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option5"
                        autocomplete="off"
                        value="dark"
                        v-model="selectedAttributes"
                      /><img src="assets/images/Dark.png" />
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
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
            <div class="form-row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="btn-group btn-group-toggle" data-toggle="buttons" id="role">
                    <label class="btn btn-primary active">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autocomplete="off"
                        value="warrior"
                        v-model="selectedRole"
                        checked
                      /><img src="assets/images/Warrior.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autocomplete="off"
                        value="knight"
                        v-model="selectedRole"
                      /><img src="assets/images/Knight.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        autocomplete="off"
                        value="ranger"
                        v-model="selectedRole"
                      /><img src="assets/images/Ranger.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option4"
                        autocomplete="off"
                        value="mage"
                        v-model="selectedRole"
                      /><img src="assets/images/Mage.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option5"
                        autocomplete="off"
                        value="manauser"
                        v-model="selectedRole"
                      /><img src="assets/images/Soul_Weaver.png" />
                    </label>
                    <label class="btn btn-primary">
                      <input
                        type="radio"
                        name="options"
                        id="option6"
                        autocomplete="off"
                        value="assassin"
                        v-model="selectedRole"
                      /><img src="assets/images/Thief.png" />
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
              <option v-for="item in getCharacter" :key="item.name" :data-tokens="getTokens(item)">
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
import { en } from '../assets/js/en.characters';
import { fr } from '../assets/js/fr.characters';
import { cn } from '../assets/js/cn.characters';
import { tw } from '../assets/js/tw.characters';
import { nicknames } from '../assets/js/nicknames';

export default Vue.extend({
  props: ['title', 'value', 'huid'],
  data() {
    return {
      characters: en,
      nicknames,
      modalid: 'temp',
      selectedCharacters: '',
      selectedAttributes: 'fire',
      selectedRarity: '3',
      selectedRole: 'warrior',
    };
  },
  created() {
    this.characters = this.getItems();
    this.modalid = this.huid;
  },
  computed: {
    getCharacter(): Array<any> {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
      return this.getItems();
    },
  },
  watch: {
    title(): void {
      this.characters = this.getItems();
    },
  },
  updated() {
    $(this.$el).selectpicker({ title: this.title }).selectpicker('render');
  },
  methods: {
    select($event: Event): void {
      this.selectedCharacters = ($event.target as HTMLInputElement).value;
      this.$emit('input', ($event.target as HTMLInputElement).value);
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    getItems(): Array<any> {
      let characters = null;
      const filteredCharacters = [];
      switch (this.$i18n.locale) {
        case 'en':
          characters = en;
          break;
        case 'fr':
          characters = fr;
          break;
        case 'cn':
          characters = cn;
          break;
        case 'tw':
          characters = tw;
          break;
        default:
          characters = en;
          break;
      }
      for (let i = 0; i < characters.length; i += 1) {
        if (
          characters[i].rarity.toString() === this.selectedRarity &&
          characters[i].attribute === this.selectedAttributes &&
          characters[i].role === this.selectedRole
        ) {
          filteredCharacters.push(characters[i]);
        }
      }

      return filteredCharacters;
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
