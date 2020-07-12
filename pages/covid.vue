<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <header>Personal Information</header>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <header>COVID Symptoms</header>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.fever" class="mx-2" label="Fever or chills"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.cough" class="mx-2" label="Cough"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.breathing" class="mx-2" label="Shortness of breath"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.fatigue" class="mx-2" label="Fatigue"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.aches" class="mx-2" label="Muscle or body aches"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.headache" class="mx-2" label="Headache"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.senses" class="mx-2" label="New loss of taste or smell"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.throat" class="mx-2" label="Sore throat"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.congestion" class="mx-2" label="Congestion or runny nose"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.nausea" class="mx-2" label="Nausea or vomiting"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.diarrhea" class="mx-2" label="Diarrhea"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.breathingx" class="mx-2" label="Trouble breathing"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.chest" class="mx-2" label="Persistent pain or pressure in the chest"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.confusion" class="mx-2" label="New confusion"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.hypersomnia" class="mx-2" label="Inability to wake or stay awake"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <v-switch v-model="symptoms.blue" class="mx-2" label="Bluish lips or face"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <header>COVID Contraction</header>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
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
      symptoms: {
        // Fever or chills
        fever: false,
        // Cough
        cough: false,
        // Shortness of breath or difficulty breathing
        breathing: false,
        // Fatigue
        fatigue: false,
        // Muscle or body aches
        aches: false,
        // Headache
        headache: false,
        // New loss of taste or smell
        senses: false,
        // Sore throat
        throat: false,
        // Congestion or runny nose
        congestion: false,
        // Nausea or vomiting
        nausea: false,
        // Diarrhea
        diarrhea: false,
        // Trouble breathing
        breathingx: false,
        // Persistent pain or pressure in the chest
        chest: false,
        // New confusion
        confusion: false,
        // Inability to wake or stay awake
        hypersomnia: false,
        // Bluish lips or face
        blue: false,
      }
    }),
  }
</script>
