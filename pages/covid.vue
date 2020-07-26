<template>
  <v-container>
    <v-form v-if="!submitted">
      <v-stepper v-model="step" @change="gotoStep">
        <v-stepper-header>
          <v-stepper-step key="testing" editable step="1">Testing</v-stepper-step>
          <v-divider />
          <v-stepper-step key="symptoms" editable step="2">Symptoms</v-stepper-step>
          <v-divider />
          <v-stepper-step key="transmission" editable step="3">Transmission</v-stepper-step>
          <v-divider />
          <v-stepper-step key="personal" editable step="4">Optional</v-stepper-step>
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
    <v-card class="mb-5" outlined v-if="submitted">
      <v-card-title>Thank You!</v-card-title>
      <v-card-text>
        <p>Your input is greatly appreciated! Hopefully together, we can make an impact against this global pandemic.</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    computed: {
      ...mapFields('navigation', [
        'step',
        'totalSteps',
        'submitted',
      ]),
    },
    methods: {
      gotoStep(a) {
        this.step = parseInt(a);
      }
    },
    watch: {
      submitted: sub => {
        // if submitted is now true, get rid of beforeunload listener
        if (sub) window.onbeforeunload = () => {};
      }
    },
    mounted () {
      const self = this;

      // if we don't have location, send back to the home page
      if (!(this.$store.state.covid.location.zipcode || (this.$store.state.covid.location.coords.lat && this.$store.state.covid.location.coords.lon))) {
        this.$nuxt.$router.push('/');
      }

      window.onbeforeunload = function(){
        return 'Are you sure you want to leave? All progress will be lost.';
      }

      this.totalSteps = 4;
    }
  }
</script>
