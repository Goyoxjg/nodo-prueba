<template>
  <div>
    <Loading v-show="isLoading"></Loading>

    <div v-show="!isLoading">

      <b-row class="pt-3">
        <b-col offset-md="4" cols="4">
          <b-card
            bg-variant="secondary"
            border-variant="dark"
            v-bind:header=" (character !== null) ? character.name : '' "
            v-bind:img-src=getImg(character)
            v-bind:img-alt=" (character !== null) ? character.name : '' "
            img-top
            class="mb-2 text-center">

            <table>
              <tbody>
              <tr v-for="(item , key) in ((character !== null) ? character : [])">
                <td v-if="ignoreValue.indexOf(key) < 0">{{ key.replace(/([a-z])([A-Z])/g, '$1 $2') }}</td>
                <td v-if="ignoreValue.indexOf(key) < 0">
                  <div v-if="typeof item === 'object'">
                    <ul v-for="title in item">
                      <li>
                        {{ title }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <div v-if="key === 'male'">
                      {{ (item) ? "Yes": "No"}}
                    </div>
                    <div v-else>
                        {{ item }}
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <b-button @click.prevent="back()" variant="primary" cols="2" class="mt-3">Back</b-button>

            <div slot="footer">
              <small class="text-muted">Last updated {{ (character !== null) ? character.updatedAt : "" }}</small>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<script>
  import { getACharacter } from '../services/got.service.js'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Loading from './Loading.vue'
  import Image from '../assets/user-admin.png'

  export default {
    name: 'detail-component',

    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        character: null,
        isLoading: false,
        ignoreValue: ["_id" , "__v" , "imageLink" , "updatedAt" , "slug" , "hasPath"]
      }
    },

    components: {
      Loading
    },

      /**
       * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
       */
    created (){
      this.isLoading = true
        getACharacter(this.$route.params.id)
        .then(res => {
          this.character = res.data
          this.isLoading = false
        })
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {
      back(){
        this.$router.push({ name: 'list' });
      },
      getImg(character){
        let pathImg = Image;
        if(character !== null)
        {
          if(typeof character.imageLink !== "undefined")
            pathImg = 'https://api.got.show' + character.imageLink ;
        }

        return pathImg;
      }
    }
  }
</script>
<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  img{
    max-width: 30rem;
    max-height: 40rem;
  }

  .card{
    border:1px solid black
  }

  .card-header{
    border-bottom:1px solid black;
    border-top:1px solid black;
  }

  .card-img-top{
    max-width: 30rem;
    max-height: 40rem;
  }
</style>

