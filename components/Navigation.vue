<template>
  <v-container>
    <div class="text-xs-center">
      <v-btn :disabled="step === 1" color="grey lighten-1" @click="previous()">
        Previous
      </v-btn>
      <v-btn color="primary" @click="next()" v-if="step !== totalSteps">
        Next
      </v-btn>
      <v-btn :disabled="!id" color="primary" @click="submit()" v-if="step === totalSteps">
        Submit
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
  .text-xs-center {
    text-align: center !important;
  }
  .v-btn {
    width: 110px;
    margin: 0 10px;
  }
</style>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    computed: {
      ...mapFields('navigation', [
        'step',
        'totalSteps',
        'id',
        'submitted',
      ]),
      ...mapFields('covid', [
        'basic',
      ]),
    },
    methods: {
      next() {
        this.step = Math.min(this.totalSteps, this.step + 1);
        this.$vuetify.goTo(0);
      },
      previous() {
        this.step = Math.max(1,this.step - 1);
        this.$vuetify.goTo(0);
      },
      submit() {
        this.submitted = true;
        this.basic = false;

        fetch(`/api/covid/${this.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            covid: this.$store.state.covid
          })
        });
      }
    }
  }
</script>