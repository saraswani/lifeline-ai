export interface Step {
  id: number;
  title: string;
  instruction: string;
  details?: string;
  bullets?: string[];
  nextId?: string; // Explicit next step
}

export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    nextId: string; // ID of a step or another question
  }[];
}

export interface EmergencyCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  initialNodeId: string; // The ID of the first step or question
  nodes: {
    [key: string]: Step | Question;
  };
  whatNotToDo: string[];
  whileWaiting: string[];
  symptoms?: string[];
}

export interface SOSAlert {
  emergencyType: string;
  location: string;
  timestamp: string;
}
