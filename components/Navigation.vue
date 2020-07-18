<template>
  <v-container>
    <recaptcha />
    <div class="text-xs-center">
      <v-btn :disabled="step === 1" color="grey lighten-1" @click="previous()">
        Previous
      </v-btn>
      <v-btn color="primary" @click="next()" v-if="step !== totalSteps">
        Next
      </v-btn>
      <v-btn :disabled="!recaptcha" color="primary" @click="submit()" v-if="step === totalSteps">
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
        'recaptcha',
      ])
    },
    methods: {
      next() {
        this.step = Math.min(this.totalSteps, this.step + 1);
      },
      previous() {
        this.step = Math.max(1,this.step - 1)
      },
      submit() {
        if (this.recaptcha) {
          // fetch('/api/covid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symptoms: this.symptoms, contraction: this.contraction }) })
          //   .then(res => res.json())
          //   .then(res => {
          //     console.log('res', res);
          //   });
        }
      }
    }
  }
</script>