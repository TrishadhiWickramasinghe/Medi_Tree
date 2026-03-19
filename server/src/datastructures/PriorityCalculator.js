export const calculatePriority = (patientData) => {
  let score = 0;

  // Severity rating (1-5) — most heavily weighted
  score += patientData.severityRating * 20;

  // Age risk factor
  if (patientData.age >= 70) score += 20;
  else if (patientData.age >= 60) score += 15;
  else if (patientData.age <= 5) score += 15;
  else if (patientData.age <= 12) score += 10;

  // Vital signs
  if (patientData.heartRate > 120 || patientData.heartRate < 50) score += 15;
  else if (patientData.heartRate > 100 || patientData.heartRate < 60) score += 8;

  if (patientData.oxygenSaturation < 90) score += 20;
  else if (patientData.oxygenSaturation < 95) score += 10;

  if (patientData.bloodPressureSystolic > 180 || patientData.bloodPressureSystolic < 80) score += 15;
  else if (patientData.bloodPressureSystolic > 140) score += 8;

  if (patientData.temperature > 39.5 || patientData.temperature < 35) score += 10;
  else if (patientData.temperature > 38.5) score += 5;

  // Pre-existing conditions
  if (patientData.conditions && patientData.conditions.length > 0)
    score += Math.min(patientData.conditions.length * 5, 15);

  // Wait time bonus (increases priority the longer a patient waits)
  const waitMinutes = (Date.now() - new Date(patientData.arrivalTime)) / 60000;
  score += Math.min(Math.floor(waitMinutes / 5) * 2, 20);

  return Math.min(score, 100);
};