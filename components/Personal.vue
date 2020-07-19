<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="age"
          :items="ageOptions"
          label="Select"
          hint="How old are you?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="gender"
          :items="genderOptions"
          label="Select"
          hint="What is your gender?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="race"
          :items="raceOptions"
          label="Select"
          hint="What is your race?"
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
      ...mapFields('covid', [
        'personal.age',
        'personal.gender',
        'personal.race',
        'location.zipcode',
        'location.coords.lat',
        'location.coords.lon',
      ]),
    },
    data: () => ({
      ageOptions: [
        '0-24 years',
        '25-34 years',
        '35-44 years',
        '45-54 years',
        '55-64 years',
        '65-74 years',
        '75-84 years',
        '85 years and over',
      ],
      genderOptions: [
        'Female',
        'Male',
        'Non-binary/third gender',
        'Prefer not to say',
        'Other',
      ],
      raceOptions: [
        'White',
        'Hispanic or Latino',
        'Black or African-American',
        'American Indian or Alaskan Native',
        'Asian',
        'Native Hawaiian or other Pacific islander',
        'From multiple races',
        'Other',
      ],
    })
  }
</script>