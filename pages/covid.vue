<template>
  <v-form v-model="valid">
    <testing />
    <symptoms />
    <transmission />
    <politics />
  </v-form>
</template>

<script>
  import fetch from 'node-fetch';

  export default {
    computed: {
      testing() {
        console.log(this.$store.state);

        return this.$store.state.testing;
      }
    },
    data: () => ({
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
