<template>
  <v-form v-model="valid">
    <testing />
    <symptoms />
    <contraction />
  </v-form>
</template>

<script>
  import fetch from 'node-fetch';

  export default {
    data: () => ({
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      contraction: {
        // Estimated days since contraction
        days: '',
        // How often did you wear a mask in public
        mask: '',
        // What kind of housing do you have
        housing: '',
        // How cautious were you
        cautiousness: '',
        // What news outlet do you get most of your news from
        news: '',
        newstoo: '',
        newsthree: '',
        // When was the last time you traveled
        travel: '',
        // Have you received a positive COVID-19 test
        test: false,
        // Have you recieved a positive COVID-19 antibody test
        antibody: false,
        // How often do you exercise outdoors
        exercise: '',
      },
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
      validlocation: false,
    }),
    mounted () {
      if (!navigator || !navigator.geolocation) {
        // redirect to how to page that tells user to use current browser and allow location
      }

      const self = this;

      console.log(this);

      // fetch('/api/covid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symptoms: this.symptoms, contraction: this.contraction }) })
      //   .then(res => res.json())
      //   .then(res => {
      //     console.log('res', res);
      //   });

      navigator.geolocation.getCurrentPosition(pos => {
          console.log(pos);
          self.location = pos;
          self.validlocation = true;
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
