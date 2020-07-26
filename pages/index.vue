<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          <div class="d-flex align-center justify-center" style="width: 100%">
            <div style="max-width: 280px">
              <v-img src="/CovidHawk_Logo_Navy_Horizontal-01.png"></v-img>
            </div>
          </div>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-divider></v-divider>
          <v-layout justify-center align-center>
            <v-flex xs12 md8 text-center mt-4>
              <h3 class="pb-2">Our Mission</h3>
              <p>
                To provide <b>real time</b> infection data to researchers, leaders, and the public using the experiences from folks just like you.
              </p>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <div class="d-flex flex-column mt-4 justify-center align-center">
            <v-flex xs12 md8>
              <h3>Answering these three questions will help us defeat COVID19</h3>
            </v-flex>
            <v-flex xs12 md8 text-center mt-4>
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
                mt-4
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md8>
              <v-menu ref="startMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                :return-value.sync="start"
                :disabled="!zipcode"
                transition="scale-transition"
                offset-y width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="start"
                    placeholder="ex. YYYY-MM-DD"
                    label="First date of COVID19 symptoms"
                    :disabled="!zipcode"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker v-model="start"
                  :max="now"
                  no-title
                  scrollable
                  @click:date="$refs.startMenu.save(start)"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md8>
              <v-menu ref="transmissionMenu"
                v-model="transmissionDateMenu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                :disabled="!start"
                offset-y
                width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="date"
                    placeholder="ex. YYYY-MM-DD"
                    label="When do you think you got COVID19?"
                    :disabled="!start"
                    prepend-icon="mdi-calendar" 
                    readonly
                    v-bind="attrs"
                    v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker v-model="date"
                  :max="start"
                  no-title
                  scrollable
                  @click:date="$refs.transmissionMenu.save(date)"></v-date-picker>
              </v-menu>
            </v-flex>
          </div>
        </v-card-text>
        <v-card-actions class="text-center pt-0">
          <v-layout column justify-center align-center>
            <recaptcha />
            <v-flex xs12 text-center mb-4>
              <v-btn color="primary" @click="submit" :disabled="!valid">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-overlay :value="overlay">
        <v-sheet class="px-3 pt-3 pb-3" style="width: 280px; text-align: center;" light>
          <v-img src="/CovidHawk_Logo_GraphicOnly_Navy-01-01.png" width="80" style="margin: 0 auto;" class="mb-2"></v-img>
          <div v-if="loading">
            <v-skeleton-loader
              width="280"
              type="list-item-two-line"
            ></v-skeleton-loader>
          </div>
          <div v-if="!loading">
            <h1>Thank You!</h1>
            <p>Your input will help eradicate COVID19. You can provide even more insight by continuing and answering a few more anonymous questions.</p>
            <p>The data is used so that experts, leaders, and the media can provide more accurate analysis.</p>
            <div>
              <v-btn color="primary" nuxt to="/covid" :disabled="!id">Continue</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-overlay>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .flex.xs12 {
    min-width: 260px;
  }
</style>

<script>
import { mapFields } from 'vuex-map-fields';
import * as usZips from 'us-zips';

export default {
  data: () => ({
    items: Object.keys(usZips),
    rules: [
      (val) => !!val && !!val.match(/^\d{5}$/),
    ],
    now: new Date().toISOString().slice(0,10),
    searchZip: null,
    startDateMenu: false,
    transmissionDateMenu: false,
    today: new Date(),
    overlay: false,
    loading: false,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
  }),
  computed: {
    ...mapFields('covid', [
      'location.zipcode',
      'testing.start',
      'transmission.date',
      'location.coords.lat',
      'location.coords.lon',
    ]),
    ...mapFields('navigation', [
      'recaptcha',
      'id',
    ]),
    valid() {
      return this.zipcode && this.start && this.date;
    }
  },
  methods: {
    submit() {
      const self = this;
      if (this.recaptcha) {
        self.overlay = true;
        fetch('/api/covid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            covid: this.$store.state.covid,
            recaptcha: this.recaptcha,
          })
        })
        .then(res => res.json())
        .then(res => {
          self.id = res.id;
          self.lat = res.body.location.coords.lat;
          self.lon = res.body.location.coords.lon;
        });
      }
    }
  },
  watch: {
    searchZip(val) {
      this.items = !!val ? Object.keys(usZips).filter(zip => zip.startsWith(val)) : [];
    }
  },
  head() {
    return {
      script: [
        { src: 'https://www.google.com/recaptcha/api.js?render=explicit', async: true, defer: true },
      ],
    };
  },
}
</script>
