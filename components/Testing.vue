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
        <v-menu ref="viralTakenMenu" v-model="viralTakenDateMenu" :close-on-content-click="false" :return-value.sync="viralTakenDate" transition="scale-transition" offset-y width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="viralTakenDate" label="Date of test" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="viralTakenDate"
            :max="viralDate || now"
            no-title
            scrollable
            @click:date="$refs.viralTakenMenu.save(viralTakenDate)"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="viralTested">
        <v-menu ref="viralMenu" v-model="viralDateMenu" :close-on-content-click="false" :return-value.sync="viralDate" transition="scale-transition" offset-y width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="viralDate" label="Date of results" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="viralDate"
            :min="viralTakenDate"
            :max="now"
            no-title
            scrollable
            @click:date="$refs.viralMenu.save(viralDate)"
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
        <v-menu ref="antiTakenMenu" v-model="antibodyTakenDateMenu" :close-on-content-click="false" :return-value.sync="antibodyTakenDate" transition="scale-transition" offset-y width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="antibodyTakenDate" label="Date of test" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="antibodyTakenDate"
            :max="antibodyDate || now"
            no-title
            scrollable
            @click:date="$refs.antiTakenMenu.save(antibodyTakenDate)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="antibodyTested">
        <v-menu ref="antiMenu" v-model="antibodyDateMenu" :close-on-content-click="false" :return-value.sync="antibodyDate" transition="scale-transition" offset-y width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="antibodyDate" label="Date of results" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="antibodyDate"
            :min="antibodyTakenDate"
            :max="now"
            no-title
            scrollable
            @click:date="$refs.antiMenu.save(antibodyDate)"></v-date-picker>
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
        viralTakenDate: 'testing.viral.dateTaken',
        viralResult: 'testing.viral.result',
        antibodyTested: 'testing.antibody.tested',
        antibodyDate: 'testing.antibody.date',
        antibodyTakenDate: 'testing.antibody.dateTaken',
        antibodyResult: 'testing.antibody.result',
        recovery: 'testing.recovery',
        doctors: 'testing.doctors',
      }),
    },
    data: () => ({
      antibodyDateMenu: false,
      antibodyTakenDateMenu: false,
      viralDateMenu: false,
      viralTakenDateMenu: false,
      now: new Date().toISOString().slice(0,10),
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
  }
</script>