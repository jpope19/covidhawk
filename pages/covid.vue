<template>
  <v-form v-model="valid">
    <v-stepper v-model="step" alt-labels>
      <v-stepper-header>
        <v-stepper-step key="testing" :complete="testingDone" editable step="1">Testing</v-stepper-step>
        <v-divider />
        <v-stepper-step key="symptoms" :complete="symptomsDone" editable step="2">Symptoms</v-stepper-step>
        <v-divider />
        <v-stepper-step key="transmission" :complete="transmissionDone" editable step="3">Transmission</v-stepper-step>
        <v-divider />
        <v-stepper-step key="personal" :complete="personalDone" editable step="4">Optional</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5" outlined>
            <testing />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5" outlined>
            <symptoms />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5" outlined>
            <transmission />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-5" outlined>
            <personal />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <navigation />
  </v-form>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    computed: {
      progress() {
        return this.step/this.totalSteps;
      },
      testingDone() {
        return false;
      },
      symptomsDone() {
        return false;
      },
      transmissionDone() {
        return false;
      },
      personalDone() {
        return false;
      },
      ...mapFields('navigation', [
        'step',
        'totalSteps',
      ]),
    },
    data: () => ({
      RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
      valid: false,
      location: {
        coords: {
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          // i guess we can get zip code from long/lat?
          latitude: 0,
          longitude: 0,
          speed: 0,
        },
        timestamp: 0,
      },
    }),
    mounted () {
      const self = this;

      // if we don't have location, send back to the home page
      if (!(this.$store.state.covid.location.zipcode || (this.$store.state.covid.location.coords.latitude && this.$store.state.covid.location.coords.longitude))) {
        this.$nuxt.$router.push('/');
      }

      this.totalSteps = 4;
    },
    head() {
      return {
        script: [
          { src: 'https://www.google.com/recaptcha/api.js?render=explicit', async: true, defer: true },
        ],
      };
    }
  }
</script>
