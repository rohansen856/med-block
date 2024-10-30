import { ObjectId } from "mongodb"

export interface PatientHistory {
  _id: ObjectId
  demographics: {
    gender: String
    dateOfBirth: Date
    bloodType: String
    maritalStatus: String
    occupation: String
    race: String
    ethnicity: String
    language: String
    religion: String
    disabilityStatus: String
  }
  medicalHistory: {
    chronicDiseases: String[]
    pastIllnesses: String[]
    surgeries: {
      name: String
      date: Date
      hospital: String
      //   surgeon: {
      //     id: ObjectId
      //     specialty: String
      //     hospitalAffiliations: [String]
      //     contactDetails: {
      //       phone: String
      //       email: String
      //       clinicAddress: {
      //         street: String
      //         city: String
      //         state: String
      //         postalCode: String
      //         country: String
      //       }
      //     }
      //   }
      notes: String
    }[]

    hospitalizations: {
      reason: String
      startDate: Date
      endDate: Date
      hospital: String
      notes: String
    }[]
    familyMedicalHistory: {
      condition: String
      relationship: String
      ageAtDiagnosis: Number
      notes: String
    }[]
  }
  allergies: {
    name: String
    reaction: String
    severity: String
    diagnosedDate: Date
    notes: String
  }[]
  medications: {
    name: String
    dosage: String
    frequency: String
    route: String
    startDate: Date
    endDate: Date
    // prescribedBy: {
    //   id: ObjectId
    //   specialty: String
    //   contactDetails: {
    //     phone: String
    //     email: String
    //     clinicAddress: {
    //       street: String
    //       city: String
    //       state: String
    //       postalCode: String
    //       country: String
    //     }
    //   }
    // }
    effectiveness: String
    sideEffects: String[]
    notes: String
  }[]

  visits: {
    visitId: ObjectId
    date: Date
    reason: String
    // doctor: {
    //   id: ObjectId
    //   specialty: String
    //   contactDetails: {
    //     phone: String
    //     email: String
    //     clinicAddress: {
    //       street: String
    //       city: String
    //       state: String
    //       postalCode: String
    //       country: String
    //     }
    //   }
    // }
    clinic: {
      name: String
      address: {
        street: String
        city: String
        state: String
        postalCode: String
        country: String
      }
    }
    diagnosis: {
      condition: String
      severity: String
      dateDiagnosed: Date
      notes: String
    }[]
    treatments: {
      type: String
      description: String
      duration: String
      prescribedMedication: {
        name: String
        dosage: String
        frequency: String
        route: String
      }[]
      notes: String
    }[]
    followUpDate: Date
    notes: String
  }[]
  tests: {
    testName: String
    datePerformed: Date
    result: String
    normalRange: String
    units: String
    notes: String
    // orderedBy: {
    //   id: ObjectId
    //   specialty: String
    //   contactDetails: {
    //     phone: String
    //     email: String
    //     clinicAddress: {
    //       street: String
    //       city: String
    //       state: String
    //       postalCode: String
    //       country: String
    //     }
    //   }
    // }
    laboratory: {
      name: String
      address: {
        street: String
        city: String
        state: String
        postalCode: String
        country: String
      }
    }
  }[]
  prescriptions: {
    medication: {
      name: String
      dosage: String
      frequency: String
      route: String
    }
    prescribedDate: Date
    dosageInstructions: String
    duration: String
    // prescribingDoctor: {
    //   id: ObjectId
    //   specialty: String
    //   contactDetails: {
    //     phone: String
    //     email: String
    //     clinicAddress: {
    //       street: String
    //       city: String
    //       state: String
    //       postalCode: String
    //       country: String
    //     }
    //   }
    // }
    refillInfo: {
      refillsRemaining: Number
      lastRefillDate: Date
      nextRefillDate: Date
    }
    notes: String
  }[]
  immunizations: {
    vaccineName: String
    dateAdministered: Date
    // administeredBy: {
    //   id: ObjectId
    //   specialty: String
    //   contactDetails: {
    //     phone: String
    //     email: String
    //     clinicAddress: {
    //       street: String
    //       city: String
    //       state: String
    //       postalCode: String
    //       country: String
    //     }
    //   }
    // }
    doseNumber: Number
    totalDoses: Number
    site: String
    notes: String
  }[]
  insuranceInfo: {
    provider: String
    policyNumber: String
    coverageDetails: {
      type: String
      description: String
      copay: Number
      deductible: Number
    }[]
    validUntil: Date
  }
  emergencyContacts: {
    relationship: String
    phone: String
    address: {
      street: String
      city: String
      state: String
      postalCode: String
      country: String
    }
    notes: String
  }[]
  createdAt: Date
  updatedAt: Date
}

const demiData: PatientHistory = {
  _id: new ObjectId(), // Patient ID
  demographics: {
    gender: "Female",
    dateOfBirth: new Date("1985-04-23"),
    bloodType: "A+",
    maritalStatus: "Single",
    occupation: "Engineer",
    race: "Asian",
    ethnicity: "Non-Hispanic",
    language: "English",
    religion: "None",
    disabilityStatus: "None",
  },
  medicalHistory: {
    chronicDiseases: ["Hypertension", "Asthma"],
    pastIllnesses: ["Chickenpox"],
    surgeries: [
      {
        name: "Appendectomy",
        date: new Date("2010-06-15"),
        hospital: "General Hospital",
        notes: "Routine procedure",
        // surgeon: new ObjectId(),
      },
    ],
    hospitalizations: [
      {
        reason: "Severe asthma attack",
        startDate: new Date("2018-11-04"),
        endDate: new Date("2018-11-08"),
        hospital: "City Hospital",
        notes: "Follow-up with pulmonologist recommended",
      },
    ],
    familyMedicalHistory: [
      {
        condition: "Diabetes",
        relationship: "Mother",
        ageAtDiagnosis: 45,
        notes: "Type II diabetes",
      },
    ],
  },
  allergies: [
    {
      name: "Peanuts",
      reaction: "Anaphylaxis",
      severity: "Severe",
      diagnosedDate: new Date("2005-09-15"),
      notes: "Carries epinephrine auto-injector",
    },
  ],
  medications: [
    {
      name: "Albuterol",
      dosage: "2 puffs",
      frequency: "As needed",
      route: "Inhalation",
      startDate: new Date("2018-11-08"),
      endDate: new Date("2019-1-1"),
      //   prescribedBy: new ObjectId(),
      effectiveness: "Effective",
      sideEffects: ["Tremor"],
      notes: "Take before exercise",
    },
  ],
  visits: [
    {
      visitId: new ObjectId(),
      date: new Date("2023-07-14"),
      reason: "Annual physical exam",
      clinic: {
        name: "Downtown Clinic",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
      },
      diagnosis: [
        {
          condition: "Hypertension",
          severity: "Moderate",
          dateDiagnosed: new Date("2015-02-20"),
          notes: "Continue monitoring blood pressure",
        },
      ],
      treatments: [
        {
          type: "Medication",
          description: "Continue current medication",
          duration: "6 months",
          prescribedMedication: [
            {
              name: "Lisinopril",
              dosage: "10 mg",
              frequency: "Once daily",
              route: "Oral",
            },
          ],
          notes: "",
        },
      ],
      followUpDate: new Date("2024-07-14"),
      notes: "Monitor diet and exercise",
      //   doctor: new ObjectId(),
    },
  ],
  tests: [
    {
      testName: "Complete Blood Count",
      datePerformed: new Date("2023-07-10"),
      result: "Normal",
      normalRange: "4.5-5.9 M/uL",
      units: "M/uL",
      //   orderedBy: new ObjectId(),
      laboratory: {
        name: "LabCorp",
        address: {
          street: "456 Lab Ave",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
      },
      notes: "",
    },
  ],
  prescriptions: [
    {
      medication: {
        name: "Atorvastatin",
        dosage: "20 mg",
        frequency: "Once daily",
        route: "Oral",
      },
      prescribedDate: new Date("2023-08-20"),
      duration: "6 months",
      dosageInstructions: "3 per day",
      //   prescribingDoctor: new ObjectId(),
      refillInfo: {
        refillsRemaining: 2,
        lastRefillDate: new Date("2023-09-20"),
        nextRefillDate: new Date("2023-10-20"),
      },
      notes: "Take in the evening",
    },
  ],
  immunizations: [
    {
      vaccineName: "Influenza",
      dateAdministered: new Date("2022-10-01"),
      doseNumber: 1,
      totalDoses: 1,
      site: "Left deltoid",
      notes: "Annual vaccination",
      //   administeredBy: new ObjectId(),
    },
  ],
  insuranceInfo: {
    provider: "Blue Cross",
    policyNumber: "ABC123456",
    coverageDetails: [
      {
        type: "Primary Care",
        description: "General health services",
        copay: 25.0,
        deductible: 500.0,
      },
    ],
    validUntil: new Date("2024-12-31"),
  },
  emergencyContacts: [
    {
      relationship: "Spouse",
      phone: "+1234567890",
      address: {
        street: "789 Elm St",
        city: "New York",
        state: "NY",
        postalCode: "10002",
        country: "USA",
      },
      notes: "Primary emergency contact",
    },
  ],
  createdAt: new Date("2023-01-01T12:00:00Z"),
  updatedAt: new Date("2023-12-01T08:30:00Z"),
}
