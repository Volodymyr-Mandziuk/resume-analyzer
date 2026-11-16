import { useState } from "react";

interface RuleAnalysis {
  wordCount: number;
  characterCount: number;
  hasEmail: boolean;
  hasPhone: boolean;
  hasSkills: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  score: number;
}

interface AiAnalysis {
  aiScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

interface ApiResponse {
  rawText: string;
  ruleAnalysis: RuleAnalysis;
  aiAnalysis: AiAnalysis | null;
}

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);
const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResponse(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // MUST match upload.single("file")
    setResponse(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });
      console.log("STATUS:", res.status); 

      const data: ApiResponse = await res.json();
      console.log("Backend response:", data);
      setResponse(data);
      
      } catch (err) {
    console.error("UPLOAD FAILED:", err);
  } finally {
    setLoading(false);
  }
};
  //     if (!res.ok) {
  //       const text = await res.text();
  //       console.error("Server response:", text);
  //       throw new Error(text);
  //     }

     
  //     window.scrollTo({ top: 400, behavior: "smooth" });
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //   } finally {
  //     setLoading(false); // stop spinner
  //   }
  // };
  const getScoreColor = (score: number) => {
    if (score >= 80) return "green";
    if (score >= 50) return "orange";
    return "red";
  };

  return (
    <div className="resume-container">
      <div className="resume-card">
        <h2 className="title">Resume Analyzer</h2>

        <p className="subtitle">
          Upload your resume (pdf file) and get instant ATS + AI feedback
        </p>

        <div className="upload-section">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="analyze-button"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your resume...</p>
          </div>
        )}

        {response && (
          <div className="results">
            <h3>Extracted Text:</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{response.rawText}</pre>
            <h3>Analysis:</h3>
            <p>
              <strong>Score:</strong>{" "}
              <span
                style={{ color: getScoreColor(response.ruleAnalysis.score) }}
              >
                {response.ruleAnalysis.score} / 100
              </span>
            </p>

            <p>Word count: {response.ruleAnalysis.wordCount}</p>
            <p>Character count: {response.ruleAnalysis.characterCount}</p>

            <p>Email found: {response.ruleAnalysis.hasEmail ? "Yes" : "No"}</p>
            <p>Phone found: {response.ruleAnalysis.hasPhone ? "Yes" : "No"}</p>
            <p>
              Skills section: {response.ruleAnalysis.hasSkills ? "Yes" : "No"}
            </p>
            <p>
              Experience section:{" "}
              {response.ruleAnalysis.hasExperience ? "Yes" : "No"}
            </p>
            <p>
              Education section:{" "}
              {response.ruleAnalysis.hasEducation ? "Yes" : "No"}
            </p>
            {response.aiAnalysis ? (
              <>
                <h3>AI Analysis</h3>

                <p>
                  <strong>AI Score:</strong> {response.aiAnalysis.aiScore} / 100
                </p>

                <h4>Strengths:</h4>
                <ul>
                  {response.aiAnalysis.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <h4>Weaknesses:</h4>
                <ul>
                  {response.aiAnalysis.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>

                <h4>Suggestions:</h4>
                <ul>
                  {response.aiAnalysis.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p style={{ color: "orange", marginTop: "20px" }}>
                ⚠️ AI analysis temporarily unavailable.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
