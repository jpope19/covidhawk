<template>
  <v-form v-model="valid">
    <v-stepper v-model="step" alt-labels>
      <v-stepper-header>
        <v-stepper-step key="testing" :complete="testingDone" step="1" editable>Testing</v-stepper-step>
        <v-divider />
        <v-stepper-step key="symptoms" :complete="symptomsDone" step="2" editable>Symptoms</v-stepper-step>
        <v-divider />
        <v-stepper-step key="transmission" :complete="transmissionDone" step="3" editable>Transmission</v-stepper-step>
        <v-divider />
        <v-stepper-step key="politics" :complete="politicsDone" step="4" editable>Politics</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5">
            <testing />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5">
            <symptoms />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5">
            <transmission />
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-5">
            <politics />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
  import fetch from 'node-fetch';

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
      politicsDone() {
        return false;
      }
    },
    data: () => ({
      valid: false,
      step: 1,
      totalSteps: 4,
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
      if (!navigator || !navigator.geolocation) {
        // redirect to how to page that tells user to use current browser and allow location
      }

      const self = this;

      // setInterval(function() {
      //   console.log(self.$store.state.transmission);
      // }, 5000);

      // fetch('/api/covid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symptoms: this.symptoms, contraction: this.contraction }) })
      //   .then(res => res.json())
      //   .then(res => {
      //     console.log('res', res);
      //   });

      navigator.geolocation.getCurrentPosition(pos => {
          console.log(pos);
          self.location = pos;
        }, err => {
          console.log('Error occurred. Error code: ' + err.code);
          // error.code can be:
          //   0: unknown error
          //   1: permission denied
          //   2: position unavailable (error response from location provider)
          //   3: timed out
        }
      );
    }
  }
</script>
