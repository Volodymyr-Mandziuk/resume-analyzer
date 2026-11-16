export interface ResumeAnalysis {
  wordCount: number;
  characterCount: number;
  hasEmail: boolean;
  hasPhone: boolean;
  hasSkills: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  score: number;
}

export const analyzeResume = (text: string): ResumeAnalysis => {
  const wordCount = text.split(/\s+/).length;
  const characterCount = text.length;
  const hasEmail = /\S+@\S+\.\S+/.test(text);
  const hasPhone = /\+?\d[\d\s-]{7,}/.test(text);

  const lowerText = text.toLowerCase();

  const hasSkills = lowerText.includes("skills");
  const hasExperience = lowerText.includes("experience");
  const hasEducation = lowerText.includes("education");

  let score = 0;

  if (hasEmail) score += 10;
  if (hasPhone) score += 10;
  if (wordCount > 150) score += 20;
  if (wordCount > 300) score += 20;
  if (hasSkills) score += 15;
  if (hasExperience) score += 15;
  if (hasEducation) score += 10;

  return {
    wordCount,
    characterCount,
    hasEmail,
    hasPhone,
    hasSkills,
    hasExperience,
    hasEducation,
    score,
  };
};