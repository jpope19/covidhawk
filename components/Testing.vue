<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <header>COVID Viral Test</header>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="viral.tested" class="mx-2" label="Did you get a COVID-19 Viral test?"></v-switch>
      </v-col>
      <v-col cols="12" md="4" v-if="viral.tested">
        <v-menu ref="menu" v-model="viralDateMenu" :close-on-content-click="false" :return-value.sync="viral.date" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="viral.date" label="Test date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="viral.date"
            :allowed-dates="allowedDates"
            no-title
            scrollable
            @click:date="$refs.menu.save(viral.date)"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="viral.tested">
        <v-select
          v-model="viral.result"
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
        <v-switch v-model="antibody.tested" class="mx-2" label="Did you get a COVID-19 Antibody test?"></v-switch>
      </v-col>
      <v-col cols="12" md="4" v-if="antibody.tested">
        <v-menu ref="menu" v-model="antibodyDateMenu" :close-on-content-click="false" :return-value.sync="antibody.date" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="antibody.date" label="Test date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="antibody.date"
            :allowed-dates="allowedDates"
            no-title
            scrollable
            @click:date="$refs.menu.save(antibody.date)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4" v-if="antibody.tested">
        <v-select
          v-model="antibody.result"
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
  export default {
    data: () => ({
      antibodyDateMenu: false,
      viralDateMenu: false,
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
      ],
      today: new Date(),
      // Did you receive an antibody test?
      antibody: {
        tested: false,
        date: null,
        result: '',
      },
      // Did you receive a viral test?
      viral: {
        tested: false,
        date: null,
        result: '',
      },
      recovery: '',
      // Did you see a doctor?
      doctors: [],
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