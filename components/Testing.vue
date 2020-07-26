<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <header>COVID Viral Test</header>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="viralTested" class="mx-2" label="Did you get a COVID-19 Viral test?"></v-switch>
      </v-col>
      <v-col cols="12" md="4" v-if="viralTested">
        <v-menu ref="menu" v-model="viralDateMenu" :close-on-content-click="false" :return-value.sync="viralDate" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="viralDate" label="Test date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="viralDate"
            :allowed-dates="allowedDates"
            no-title
            scrollable
            @click:date="$refs.menu.save(viralDate)"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="viralTested">
        <v-select
          v-model="viralResult"
          :items="resultsOptions"
          label="Select"
          hint="What was the test result?"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="12">
        <header>COVID Antibody Test</header>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="antibodyTested" class="mx-2" label="Did you get a COVID-19 Antibody test?"></v-switch>
      </v-col>
      <v-col cols="12" md="4" v-if="antibodyTested">
        <v-menu ref="menu" v-model="antibodyDateMenu" :close-on-content-click="false" :return-value.sync="antibodyDate" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="antibodyDate" label="Test date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="antibodyDate"
            :allowed-dates="allowedDates"
            no-title
            scrollable
            @click:date="$refs.menu.save(antibodyDate)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="antibodyTested">
        <v-select
          v-model="antibodyResult"
          :items="resultsOptions"
          label="Select"
          hint="What was the test result?"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="12">
        <header>Recovery</header>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="recovery"
          :items="recoveryOptions"
          label="Select"
          hint="How long did it take to recover?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="doctors"
          :items="medical"
          multiple
          label="Select"
          hint="Did you receive medical attention?"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    computed: {
      ...mapFields('covid', {
        viralTested: 'testing.viral.tested',
        viralDate: 'testing.viral.date',
        viralResult: 'testing.viral.result',
        antibodyTested: 'testing.antibody.tested',
        antibodyDate: 'testing.antibody.date',
        antibodyResult: 'testing.antibody.result',
        start: 'testing.start',
        recovery: 'testing.recovery',
        doctors: 'testing.doctors',
      }),
    },
    data: () => ({
      antibodyDateMenu: false,
      viralDateMenu: false,
      startDateMenu: false,
      resultsOptions: [
        'Positive',
        'Negative',
        'Unknown',
      ],
      recoveryOptions: [
        '1-2 days',
        '3-7 days',
        '1-2 weeks',
        '3+ weeks',
        'Still recovering',
      ],
      medical: [
        'Virtual',
        'Urgent Care',
        'ER',
        'Hospitalized',
        'None'
      ],
      today: new Date(),
    }),
    methods: {
      // dont show days after now
      allowedDates(date) {
        const d = new Date(date),
          ts = d.getTime(),
          now = this.today.getTime() - this.today.getTimezoneOffset()*60*1000;

        return ts <= now;
      }
    }
  }
</script>