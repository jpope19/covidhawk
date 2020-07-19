<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">App Name</v-card-title>
        <v-card-subtitle>Unifying to Defeat COVID</v-card-subtitle>
        <v-card-text>
          <v-divider></v-divider>
          <v-layout justify-center align-center>
            <v-flex xs12 md8 text-center mt-4 v-if="!locationFailed">
              <p>The only personal information we collect is your general location. You can allow us to detect your location, or you can manually enter your zip code.</p>
              <p><a href="https://support.google.com/maps/answer/2839911" target="_blank" rel="noopener noreferrer">Here is some more information</a> on troubleshooting if you are having trouble with location.</p>
              <p class="mb-0">Why do we ask for your location this way? The service provided by Google Chrome and Mozilla Firefox doesn't claim to be accurate. We don't even want it to be accurate. We want to track COVID, not humans.</p>
            </v-flex>
            <v-flex xs12 md8 text-center mt-4 v-if="locationFailed">
              <p>Oops! It looks like we had trouble detecting your location</p>
              <p>Check out <a href="https://support.google.com/chrome/answer/142065" target="_blank" rel="noopener noreferrer">documentation</a> on how to share your location with Google Chrome.</p>
              <p>If you are using a browser other than Google Chrome or Mozilla Firefox, please consider upgrading to one of these. Otherwise, manually entering your zip code below will work as well!</p>
              <v-autocomplete
                v-model="zipcode"
                :items="items"
                :rules="rules"
                :search-input.sync="searchZip"
                color="accent"
                label="Please enter your 5-digit zip code"
                placeholder="ex. 33609"
                prepend-icon="mdi-crosshairs"
                allow-overflow
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-layout>
            <v-row class="justify-center">
              <v-flex xs12 text-center mb-4 v-if="!locationFailed">
                <v-btn color="grey lighten-1" @click="cancelDetection">Cancel</v-btn>
                <v-btn color="primary" @click="detectLocation"><v-icon left>mdi-crosshairs-gps</v-icon>Detect Location</v-btn>
              </v-flex>
              <v-flex xs12 text-center mb-4 v-if="locationFailed">
                <v-btn color="primary" nuxt to="/covid" :disabled="!valid">Continue</v-btn>
              </v-flex>
              <v-flex xs12 md8 mt-1 mb-4>
                <p class="shout font-weight-black text--secondary">We promise to only use location data to be able to graph the migration of COVID. Your responses are 100% anonymous.*</p>
              </v-flex>
            </v-row>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .shout {
    font-size: 0.875rem;
  }
</style>

<script>
import { mapFields } from 'vuex-map-fields';
import * as usZips from 'us-zips';

export default {
  data: () => ({
    locationFailed: false,
    items: Object.keys(usZips),
    rules: [
      (val) => !!val && !!val.match(/^\d{5}$/),
    ],
    searchZip: null,
  }),
  computed: {
    ...mapFields('covid', [
      'location.zipcode',
      'location.coords.lat',
      'location.coords.lon',
    ]),
    valid() {
      return this.zipcode || (this.lat && this.lon);
    }
  },
  methods: {
    detectLocation() {
      const self = this;

      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos);
        if (pos && pos.coords && pos.coords.lat && pos.coords.lon) {
          self.lat = pos.coords.lat;
          self.lon = pos.coords.lon;
        } else {
          self.locationFailed = true;
        }
      }, err => {
        console.log('Error occurred. Error code: ' + err.code);
        self.locationFailed = true;

        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      });
    },
    cancelDetection() {
      this.locationFailed = true;
    },
  },
  watch: {
    searchZip(val) {
      this.items = !!val ? Object.keys(usZips).filter(zip => zip.startsWith(val)) : [];
    }
  }
}
</script>
