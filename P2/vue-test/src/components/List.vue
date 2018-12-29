<template>
  <div>
    <Loading v-show="isLoading"></Loading>

    <div v-show="!isLoading">

      <b-col md="8" offset="2" class="pt-3">
        <b-card class="pt-3 text-center">

          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-table fixed
                   head-variant="dark"
                   responsive=true
                   :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc"
                   :fields="fields"
                   :items="(characters !== null) && characters"
                   v-bind:current-page="currentPage"
                   v-bind:per-page="perPage"
                   :filter="filter"
                   @filtered="onFiltered">

            <template slot="id" slot-scope="data" sortable="false">
              <b-button @click="goToDetail(data.item.id)" variant="outline-primary">Ver detalle</b-button>
            </template>
          </b-table>
          <b-pagination align="center" size="md" v-bind:total-rows="totalRows" v-model="currentPage" v-bind:per-page="perPage"></b-pagination>

        </b-card>
      </b-col>


      <b-row class="p-t-25">
        <b-col cols="8" offset-md="2">

        </b-col>
      </b-row>
    </div>

  </div>
</template>


<script>
  import { listsAllCharacters , getCharacterByName } from '../services/got.service.js'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Loading from './Loading.vue'


  export default {
    name: 'list-component',

    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        filter: null,
        sortBy: 'Nombre',
        sortDesc: false,
        fields: [
          { key: 'name', sortable: true},
          { key: 'house', sortable: true },
          { key: 'id', sortable: false , label : 'Details'}
        ],
        characters: [],
        isLoading: false,
        currentPage: 1,
        perPage: 7,
        totalRows: 0
      }
    },

    components:{
      Loading
    },

    /**
     * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
     */
    created () {
      this.isLoading = true
      listsAllCharacters()
        .then(res => {
          this.characters = res
          this.isLoading = false
          this.totalRows = res.length
        })
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {

      /**
       * @description get the detail of a character from the GoT API.
       * @param {string} id. the "_id" of the character that we are going to request.
       * @method goToDetail
       */
      goToDetail(id) {
        // CODE HERE
        this.$router.push({ name: 'detail', params: { id: id } });
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
