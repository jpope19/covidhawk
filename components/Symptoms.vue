<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="fever" class="mx-2" label="Fever above 100F"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="congestion" class="mx-2" label="Congestion or runny nose"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="senses" class="mx-2" label="Loss of taste or smell"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="breathing" class="mx-2" label="Shortness of breath or difficulty breathing"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="cough" class="mx-2" label="Cough"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="fatigue" class="mx-2" label="Unusual fatigue"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="aches" class="mx-2" label="Chills or body aches"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="diarrhea" class="mx-2" label="Vomiting or diarrhea"></v-switch>
      </v-col>
      <v-col cols="12" md="4">
        <v-switch v-model="appetite" class="mx-2" label="Loss of appetite"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  
  export default {
    computed: {
      ...mapFields('symptoms', [
        'fever',
        'congestion',
        'senses',
        'breathing',
        'cough',
        'fatigue',
        'aches',
        'diarrhea',
        'appetite',
      ]),
    },
  }
</script>