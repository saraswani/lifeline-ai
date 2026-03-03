import { EmergencyCategory, Step, Question } from "./types";

export const EMERGENCY_CATEGORIES: EmergencyCategory[] = [
  {
    id: "unconscious",
    name: "CPR / Unconscious",
    icon: "HeartPulse",
    description: "Unresponsive person who is not breathing normally.",
    initialNodeId: "safety",
    nodes: {
      "safety": {
        id: 1,
        title: "Ensure Safety",
        instruction: "Check the scene for hazards like traffic, fire, or electricity.",
        details: "Do not put yourself in danger. If safe, approach the person.",
        nextId: "check_response"
      } as Step,
      "check_response": {
        id: 2,
        title: "Check Response",
        instruction: "Tap the person's shoulder and shout, 'Are you okay?'",
        details: "If no response, call 108 or 112 immediately.",
        nextId: "breathing_question"
      } as Step,
      "breathing_question": {
        id: "q1",
        text: "Is the person breathing normally?",
        options: [
          { label: "YES", nextId: "recovery_position" },
          { label: "NO", nextId: "start_cpr" }
        ]
      } as Question,
      "recovery_position": {
        id: 3,
        title: "Recovery Position",
        instruction: "Roll them onto their side and tilt their head back.",
        details: "This keeps the airway open and prevents choking on vomit.",
        bullets: [
          "Place the arm nearest to you at a right angle.",
          "Bring the other arm across the chest.",
          "Pull the far knee up and roll them toward you."
        ]
      } as Step,
      "start_cpr": {
        id: 3,
        title: "Start CPR",
        instruction: "Push hard and fast in the center of the chest.",
        details: "Push at least 2 inches deep at a rate of 100-120 compressions per minute.",
        bullets: [
          "Place the heel of one hand in the center of the chest.",
          "Place the other hand on top and interlock fingers.",
          "Push to the beat of 'Stayin' Alive'."
        ]
      } as Step
    },
    whatNotToDo: [
      "Do not stop compressions for more than 10 seconds.",
      "Do not give mouth-to-mouth if you are not trained.",
      "Do not leave the person alone."
    ],
    whileWaiting: [
      "Continue CPR until help arrives or the person starts breathing.",
      "If an AED is available, turn it on and follow prompts.",
      "Stay calm and monitor for any changes."
    ]
  },
  {
    id: "bleeding",
    name: "Severe Bleeding",
    icon: "Droplets",
    description: "Heavy blood loss from a deep wound.",
    initialNodeId: "safety",
    nodes: {
      "safety": {
        id: 1,
        title: "Ensure Safety",
        instruction: "Wear gloves if available to protect yourself.",
        details: "Check for any sharp objects near the victim.",
        nextId: "pressure"
      } as Step,
      "pressure": {
        id: 2,
        title: "Apply Direct Pressure",
        instruction: "Use a clean cloth or your hands to apply firm, constant pressure.",
        details: "If the cloth soaks through, do not remove it. Add another cloth on top.",
        bullets: [
          "Press firmly directly on the wound.",
          "Do not lift the cloth to check if bleeding has stopped."
        ],
        nextId: "elevate"
      } as Step,
      "elevate": {
        id: 3,
        title: "Elevate & Bandage",
        instruction: "Raise the injured limb above the level of the heart.",
        details: "Wrap the wound firmly with a bandage to maintain pressure.",
        bullets: [
          "Check that the bandage isn't too tight.",
          "Keep the person lying down and still."
        ]
      } as Step
    },
    whatNotToDo: [
      "Do not remove the original bandage if it's soaked.",
      "Do not wash a deep, heavily bleeding wound.",
      "Do not use a tourniquet unless bleeding is life-threatening."
    ],
    whileWaiting: [
      "Keep the person warm with a blanket.",
      "Monitor their pulse and breathing.",
      "Reassure the person and keep them calm."
    ]
  },
  {
    id: "burns",
    name: "Burns",
    icon: "Flame",
    description: "Heat, chemical, or electrical burns.",
    initialNodeId: "stop_burning",
    nodes: {
      "stop_burning": {
        id: 1,
        title: "Stop the Burning",
        instruction: "Remove the person from the heat source or put out flames.",
        details: "For chemical burns, brush off dry chemicals and flush with water.",
        nextId: "cool"
      } as Step,
      "cool": {
        id: 2,
        title: "Cool the Burn",
        instruction: "Run cool (not cold) tap water over the burn for at least 10-20 minutes.",
        details: "Do not use ice, as it can further damage the tissue.",
        bullets: [
          "Use running water if possible.",
          "Do not use butter, ointments, or home remedies."
        ],
        nextId: "cover"
      } as Step,
      "cover": {
        id: 3,
        title: "Cover Loosely",
        instruction: "Use a sterile bandage or clean plastic wrap to cover the burn loosely.",
        details: "This protects the area from infection and reduces pain.",
        bullets: [
          "Do not wrap tightly.",
          "Remove jewelry before swelling starts."
        ]
      } as Step
    },
    whatNotToDo: [
      "Do not use ice or ice water.",
      "Do not break any blisters.",
      "Do not remove clothing that is stuck to the skin."
    ],
    whileWaiting: [
      "Keep the person warm.",
      "Elevate the burned area if possible.",
      "Monitor for signs of shock."
    ]
  },
  {
    id: "choking",
    name: "Choking",
    icon: "Wind",
    description: "Inability to breathe due to a blocked airway.",
    initialNodeId: "assess",
    nodes: {
      "assess": {
        id: 1,
        title: "Assess the Situation",
        instruction: "Ask, 'Are you choking?' If they can speak or cough, encourage them to keep coughing.",
        details: "If they cannot speak or breathe, take immediate action.",
        nextId: "back_blows"
      } as Step,
      "back_blows": {
        id: 2,
        title: "5 Back Blows",
        instruction: "Lean the person forward and give 5 sharp blows between the shoulder blades.",
        details: "Use the heel of your hand.",
        bullets: [
          "Stand slightly behind and to the side.",
          "Support their chest with your other hand."
        ],
        nextId: "thrusts"
      } as Step,
      "thrusts": {
        id: 3,
        title: "5 Abdominal Thrusts",
        instruction: "Stand behind them, wrap arms around waist, and pull inward and upward.",
        details: "This is the Heimlich maneuver.",
        bullets: [
          "Place your fist just above the navel.",
          "Grasp your fist with your other hand.",
          "Perform quick, upward thrusts."
        ]
      } as Step
    },
    whatNotToDo: [
      "Do not try to reach for the object unless you can see it.",
      "Do not give the person water or food.",
      "Do not perform thrusts if they are coughing strongly."
    ],
    whileWaiting: [
      "Stay with the person even if the object is dislodged.",
      "Seek medical attention to check for internal injuries.",
      "Monitor their breathing closely."
    ]
  },
  {
    id: "heart-attack",
    name: "Heart Attack",
    icon: "Activity",
    description: "Chest pain, shortness of breath, or discomfort.",
    initialNodeId: "call_help",
    nodes: {
      "call_help": {
        id: 1,
        title: "Call Emergency (108/112)",
        instruction: "Call for an ambulance immediately. Every minute counts.",
        details: "State clearly that you suspect a heart attack.",
        nextId: "rest"
      } as Step,
      "rest": {
        id: 2,
        title: "Sit and Rest",
        instruction: "Have the person sit in a comfortable position, ideally on the floor.",
        details: "This reduces the strain on the heart.",
        bullets: [
          "Lean them against a wall.",
          "Loosen any tight clothing."
        ],
        nextId: "aspirin"
      } as Step,
      "aspirin": {
        id: 3,
        title: "Give Aspirin",
        instruction: "If they are not allergic, have them chew and swallow one adult aspirin (300mg).",
        details: "Chewing helps the medication enter the bloodstream faster."
      } as Step
    },
    whatNotToDo: [
      "Do not let the person walk or exert themselves.",
      "Do not give them anything to eat or drink besides aspirin.",
      "Do not wait to see if symptoms go away."
    ],
    whileWaiting: [
      "Stay calm and reassure the person.",
      "Monitor their pulse and breathing.",
      "Be ready to start CPR if they become unconscious."
    ],
    symptoms: ["Chest pain or pressure", "Pain radiating to jaw/arm", "Shortness of breath", "Cold sweat"]
  },
  {
    id: "stroke",
    name: "Stroke",
    icon: "Activity",
    description: "Sudden numbness, confusion, or trouble speaking.",
    initialNodeId: "fast_test",
    nodes: {
      "fast_test": {
        id: 1,
        title: "Perform F.A.S.T. Test",
        instruction: "Check for Face drooping, Arm weakness, and Speech difficulty.",
        details: "If any of these are present, it is Time to call emergency services.",
        bullets: [
          "Face: Ask them to smile. Does one side droop?",
          "Arms: Ask them to raise both arms. Does one drift down?",
          "Speech: Ask them to repeat a simple phrase. Is it slurred?"
        ],
        nextId: "call_help"
      } as Step,
      "call_help": {
        id: 2,
        title: "Call 108/112 Immediately",
        instruction: "Note the time when symptoms first started.",
        details: "This information is critical for hospital treatment.",
        nextId: "monitor"
      } as Step,
      "monitor": {
        id: 3,
        title: "Monitor & Reassure",
        instruction: "Keep the person calm and do not give them anything to eat or drink.",
        details: "If they become unconscious, place them in the recovery position."
      } as Step
    },
    whatNotToDo: [
      "Do not give them food, drink, or aspirin.",
      "Do not let them sleep or wait for symptoms to pass.",
      "Do not drive them to the hospital yourself if an ambulance is available."
    ],
    whileWaiting: [
      "Keep the person lying on their side if they are vomiting.",
      "Loosen tight clothing.",
      "Stay with them and keep them calm."
    ],
    symptoms: ["Sudden facial drooping", "Arm weakness on one side", "Slurred or strange speech", "Sudden severe headache"]
  },
  {
    id: "fracture",
    name: "Fracture",
    icon: "Bone",
    description: "Broken or cracked bone.",
    initialNodeId: "stop_bleeding",
    nodes: {
      "stop_bleeding": {
        id: 1,
        title: "Stop Any Bleeding",
        instruction: "Apply pressure to the wound with a sterile bandage or clean cloth.",
        details: "Be careful not to move the underlying bone.",
        nextId: "immobilize"
      } as Step,
      "immobilize": {
        id: 2,
        title: "Immobilize the Area",
        instruction: "Do not try to realign the bone. Use a splint or sling.",
        details: "A splint can be made from newspapers or wood.",
        bullets: [
          "Secure the splint above and below the joint.",
          "Do not wrap too tightly."
        ],
        nextId: "ice"
      } as Step,
      "ice": {
        id: 3,
        title: "Apply Ice Packs",
        instruction: "Apply ice wrapped in a cloth to the area for 10-20 minutes.",
        details: "This helps reduce swelling and pain."
      } as Step
    },
    whatNotToDo: [
      "Do not try to push a protruding bone back in.",
      "Do not move the person unless they are in immediate danger.",
      "Do not test the bone's strength."
    ],
    whileWaiting: [
      "Keep the injured limb elevated if possible.",
      "Monitor circulation below the injury.",
      "Keep the person still and calm."
    ]
  },
  {
    id: "snake-bite",
    name: "Snake Bite",
    icon: "Skull",
    description: "Bite from a potentially venomous snake.",
    initialNodeId: "still",
    nodes: {
      "still": {
        id: 1,
        title: "Keep the Person Still",
        instruction: "Keep the person calm and completely still to slow the spread of venom.",
        details: "Movement increases heart rate and venom circulation.",
        nextId: "position"
      } as Step,
      "position": {
        id: 2,
        title: "Position the Limb",
        instruction: "Keep the bitten area at or slightly below the level of the heart.",
        details: "Do not elevate the limb above the heart.",
        nextId: "clean"
      } as Step,
      "clean": {
        id: 3,
        title: "Clean but Don't Flush",
        instruction: "Clean the wound gently with soap and water.",
        details: "Remove rings or watches as the area will likely swell.",
        bullets: [
          "Do not use a pressure washer.",
          "Do not try to suck out the venom."
        ]
      } as Step
    },
    whatNotToDo: [
      "Do not try to suck out the venom.",
      "Do not cut the wound or apply a tourniquet.",
      "Do not apply ice."
    ],
    whileWaiting: [
      "Try to remember the snake's color and shape.",
      "Apply a firm but not tight bandage.",
      "Monitor for symptoms like dizziness."
    ]
  }
];
