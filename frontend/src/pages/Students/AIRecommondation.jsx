import React, { useState } from "react";
import { motion } from "framer-motion";
import { invokeLLM } from "../../utils/invokeLLM";
import { Lightbulb, AlertCircle, Loader2, Globe, TrendingUp } from "lucide-react";

// local components
import Questionnaire from "../../components/Questionnaire";
import EnhancedRecommendationResults from "../../components/EnhancedRecommendationResults";
import Sidebar from "../../components/sidebars/Sidebar";


// ✅ Simple Card component
function Card({ children, className }) {
  return <div className={`rounded-2xl shadow-md bg-white ${className}`}>{children}</div>;
}
function CardHeader({ children }) {
  return <div className="border-b p-4">{children}</div>;
}
function CardTitle({ children, className }) {
  return <h2 className={`font-bold text-lg ${className}`}>{children}</h2>;
}
function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

// ✅ Simple Alert component
function Alert({ children, variant }) {
  const color =
    variant === "destructive"
      ? "border-red-300 bg-red-50 text-red-800"
      : "border-gray-300 bg-gray-50 text-gray-800";
  return <div className={`p-4 rounded-lg border ${color}`}>{children}</div>;
}
function AlertTitle({ children }) {
  return <div className="font-bold mb-1">{children}</div>;
}
function AlertDescription({ children }) {
  return <div className="text-sm">{children}</div>;
}

export default function RecommendationPage({ user }) {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👉 use logged-in student details
  const selectedStudent = {
    id: user?.id,
    student_id: user?.student_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    program: user?.program,
    year: user?.year,
    gpa: user?.gpa,
  };

  const dummyCourses = [
    { course_code: "CS101", course_name: "Introduction to Programming" },
    { course_code: "BUS201", course_name: "Principles of Management" },
    { course_code: "MECH150", course_name: "Engineering Graphics" },
  ];

  const dummyEnrollments = [
    { student_id: "ST001", course_code: "CS101", grade: "A" },
    { student_id: "ST002", course_code: "BUS201", grade: "B+" },
    { student_id: "ST003", course_code: "MECH150", grade: "A-" },
  ];

  const handleGenerateRecommendations = async (answers) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const studentEnrollments = dummyEnrollments.filter(
        (e) => e.student_id === selectedStudent.student_id
      );

      const academicHistory = studentEnrollments
        .map((e) => {
          const course = dummyCourses.find((c) => c.course_code === e.course_code);
          return `- Course: ${course?.course_name || e.course_code}, Grade: ${e.grade || "N/A"
            }`;
        })
        .join("\n");

      const prompt = `
        You are an expert academic advisor AI with access to current industry trends and educational standards worldwide. Your task is to recommend innovative and highly relevant courses for a student's upcoming semester.

        **IMPORTANT:** Do NOT limit yourself to existing institutional courses. Think beyond traditional curriculum and recommend courses that align with:
        - Current industry demands and job market trends
        - Emerging technologies and skills
        - Modern educational approaches
        - Real-world applications and career advancement

        **Student Profile:**
        - Name: ${student.first_name} ${student.last_name}
        - Program: ${student.program}
        - Current Year: ${student.year}
        - GPA: ${student.gpa}

        **Student's Goals & Preferences:**
        - Career Goals: ${answers.careerGoals}
        - Enjoyed Subjects: ${answers.enjoyedSubjects.join(', ')}
        - Skills to Develop: ${answers.skillsToDevelop}
        - Learning Style: ${answers.learningStyle}
        - Desired Workload: ${answers.workload}

        **Academic History:**
        ${academicHistory || "No past enrollments found."}

        **Your Task:**
        Research and recommend 4-6 cutting-edge courses that would be most beneficial for this student in 2024-2025. Consider:
        1. Current industry trends and in-demand skills
        2. Emerging technologies relevant to their field
        3. Interdisciplinary approaches that enhance career prospects
        4. Skills that top employers are seeking
        5. Future-proof competencies for the next 5-10 years

        For each course recommendation, provide:
        1. 'course_title': A compelling, modern course title
        2. 'course_description': Detailed description of what the course covers
        3. 'learning_outcomes': Key skills and knowledge students will gain
        4. 'industry_relevance': How this course addresses current industry needs
        5. 'career_impact': Specific career benefits and job opportunities
        6. 'prerequisites': What background knowledge is needed
        7. 'course_format': Suggested delivery method (lecture, project-based, hybrid, etc.)
        8. 'duration': Recommended course length
        9. 'relevance_score': Score from 85-100 (only recommend highly relevant courses)
        10. 'trending_keywords': Current industry buzzwords/skills this course addresses
        11. 'salary_impact': Potential salary improvement or career advancement
        12. 'companies_hiring': Types of companies actively hiring for these skills
      `;

      const result = await invokeLLM({
        prompt,
        add_context_from_internet: true,
        // keep your response_schema
      });

      if (result && result.recommendations) {
        setRecommendations(result);
      } else {
        throw new Error("AI response was not in the expected format.");
      }
    } catch (e) {
      setError("An error occurred while generating recommendations. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Sidebar fixed left */}
      <Sidebar role={"student"}/>

      <div className="container min-h-screen p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent mb-2">
              AI Course Recommender
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Welcome {selectedStudent.first_name}, get your personalized course recommendations!
            </p>
          </motion.div>

          {/* STEP 2 */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-slate-600" />
                Tell Us Your Career Aspirations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Questionnaire
                onSubmit={handleGenerateRecommendations}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* ERRORS */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* LOADING */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 flex flex-col items-center justify-center gap-6"
            >
              <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
              <p className="text-slate-600">AI is researching...</p>
            </motion.div>
          )}

          {/* RESULTS */}
          {recommendations && (
            <EnhancedRecommendationResults recommendations={recommendations} />
          )}
        </div>
      </div>
    </div>
  );
}
