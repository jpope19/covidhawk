<template>
  <v-form>
    <v-stepper v-model="step" @change="gotoStep">
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
            <v-card-title>COVID Testing Results</v-card-title>
            <v-card-subtitle>Please describe your testing experience</v-card-subtitle>
            <v-card-text>
              <v-divider></v-divider>
              <testing />
            </v-card-text>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5" outlined>
            <v-card-title>COVID Symptoms</v-card-title>
            <v-card-subtitle>Please select all symptoms that you have experienced</v-card-subtitle>
            <v-card-text>
              <v-divider></v-divider>
              <symptoms />
            </v-card-text>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5" outlined>
            <v-card-title>COVID Transmission</v-card-title>
            <v-card-subtitle>Please let us know how you think you came upon the virus</v-card-subtitle>
            <v-card-text>
              <v-divider></v-divider>
              <transmission />
            </v-card-text>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-5" outlined>
            <v-card-title>Optional</v-card-title>
            <v-card-subtitle>These optional inputs may help us make inferences of how COVID is spreading</v-card-subtitle>
            <v-card-text>
              <v-divider></v-divider>
              <personal />
            </v-card-text>
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
    }),
    methods: {
      gotoStep(a) {
        this.step = parseInt(a);
      }
    },
    mounted () {
      const self = this;

      // if we don't have location, send back to the home page
      if (!(this.$store.state.covid.location.zipcode || (this.$store.state.covid.location.coords.lat && this.$store.state.covid.location.coords.lon))) {
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
