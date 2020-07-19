<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="airplane" class="mx-2" label="Have you been on an airplane in the past two weeks?"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="hotel" class="mx-2" label="Have you stayed in a hotel in the past two weeks?"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="gym" class="mx-2" label="Have you been in a gym in the past two weeks?"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="lag"
          :items="lagOptions"
          label="Select"
          hint="How many days before symptoms do you think you contracted COVID19?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="location"
          :items="locationOptions"
          label="Select"
          hint="Where do you think you contracted COVID19?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="locationOther" hint="Location (specific)" persistent-hint></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="maskIn"
          :items="maskOptions"
          label="Select"
          hint="How often did you wear a mask around people indoors?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="maskOut"
          :items="maskOptions"
          label="Select"
          hint="How often did you wear a mask around people outdoors?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="maskReuse"
          :items="maskReuseOptions"
          label="Select"
          hint="How often do you replace or clean your mask?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="hands"
          :items="handsOptions"
          label="Select"
          hint="How many times do you wash your hands per day?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="housing"
          :items="housingOptions"
          label="Select"
          hint="What type of home do you live in?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="roommates"
          :items="roommatesOptions"
          label="Select"
          hint="How many others live in your household?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="work"
          :items="workOptions"
          label="Select"
          hint="Are you currently working?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="contacts"
          :items="contactsOptions"
          label="Select"
          hint="Roughly how many people have you been in close contact with in the last week?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="exercise"
          :items="exerciseOptions"
          label="Select"
          hint="How often have you been exercising indoors?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="cautiousness"
          :items="cautiousnessOptions"
          label="Select"
          hint="Generally speaking, how cautious are you?"
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
        'transmission.lag',
        'transmission.location',
        'transmission.locationOther',
        'transmission.maskIn',
        'transmission.maskOut',
        'transmission.maskReuse',
        'transmission.hands',
        'transmission.housing',
        'transmission.roommates',
        'transmission.work',
        'transmission.contacts',
        'transmission.airplane',
        'transmission.hotel',
        'transmission.exercise',
        'transmission.gym',
        'transmission.cautiousness',
      ]),
    },
    data: () => ({
      lagOptions: [
        '1-2 days',
        '3-7 days',
        '1+ week',
        'Unknown',
      ],
      locationOptions: [
        'airplane',
        'bar',
        'beach',
        'family',
        'grocery store',
        'hotel',
        'restaurant',
        'retail store',
        'other',
      ],
      maskOptions: [
        'very often',
        'often',
        'rarely',
        'never',
      ],
      maskReuseOptions: [
        'after every usage',
        'every day',
        'every week',
        'more than a week',
        'never',
      ],
      handsOptions: [
        '0-2 times',
        '3-5 times',
        '6-9 times',
        '10+ times',
      ],
      housingOptions: [
        'single-family',
        'townhome',
        'small apartment complex',
        'large apartment complex',
      ],
      roommatesOptions: [ '0', '1', '2', '3+' ],
      workOptions: [
        'no',
        'remotely',
        'in an office',
        'other',
      ],
      contactsOptions: [ '0-5', '6-10', '11-20', '21+' ],
      exerciseOptions: [
        '0-1 time per week',
        '2-3 times per week',
        '4-5 times per week',
        '6-7 times per week'
      ],
      cautiousnessOptions: [
        'very cautious',
        'cautious',
        'semi-cautious',
        'not cautious',
      ]
    })
  }
</script>