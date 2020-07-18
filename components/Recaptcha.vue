<template>
  <v-container>
    <div id="recaptcha" :class=" step !== totalSteps ? 'g-recaptcha hidden' : 'g-recaptcha'" data-sitekey="6LetuLIZAAAAAAE2SL2BafVx5BeHKi37q2RpW0-A"></div>
  </v-container>
</template>

<style scoped>
  #recaptcha {
    display: flex;
    justify-content: center;
  }

  #recaptcha.hidden {
    display: none;
  }
</style>

<script>
  import { mapFields } from 'vuex-map-fields';

  const RECAPTCHA_KEY = '6LetuLIZAAAAAAE2SL2BafVx5BeHKi37q2RpW0-A';

  export default {
    computed: {
      ...mapFields('navigation', [ 
        'step',
        'totalSteps',
        'recaptcha' 
      ])
    },
    data: () => ({
      interval: undefined
    }),
    methods: {
      verifyCallback(token) {
        console.log('setting recaptcha', token);
        this.recaptcha = token;
      },
      handleExpired() {
        this.recaptcha = '';
      },
      render() {
        clearInterval(this.interval);

        grecaptcha.render('recaptcha', {
          'sitekey' : RECAPTCHA_KEY,
          'callback' : this.verifyCallback,
          'expired-callback': this.handleExpired,
          'data-size': 'compact',
        });
      },
      checkForReCaptcha() {
        if (window.hasOwnProperty('grecaptcha') && grecaptcha.hasOwnProperty('render')) {
          this.render();
        }
      }
    },
    mounted() {
      this.interval = process.client ? setInterval(this.checkForReCaptcha, 1000) : undefined;
    }
  }
</script>