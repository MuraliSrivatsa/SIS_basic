import { useState, useEffect } from "react"
import { Brain, TrendingUp, BookOpen, Users, Target, Lightbulb, Star, Clock, Award, AlertCircle, CheckCircle } from "lucide-react"

export function AIRecommendations({ userRole, userName, userId }) {
  const [recommendations, setRecommendations] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [completedRecommendations, setCompletedRecommendations] = useState([])

  useEffect(() => {
    generateRecommendations()
  }, [userRole])

  const generateRecommendations = () => {
    let mockRecommendations = []

    if (userRole === 'student') {
      mockRecommendations = [
        {
          id: '1',
          title: 'Improve Data Structures Performance',
          description: 'Based on your recent quiz scores, focusing on binary trees and graph algorithms could boost your grade by 15-20%.',
          category: 'academic',
          priority: 'high',
          confidence: 87,
          actionRequired: true,
          estimatedTime: '2-3 weeks',
          benefits: [
            'Better understanding of algorithmic complexity',
            'Improved problem-solving skills',
            'Higher course grade potential'
          ],
          steps: [
            'Review binary tree traversal methods',
            'Practice 5 graph algorithm problems daily',
            'Schedule office hours with Dr. Smith',
            'Join the CS study group'
          ]
        },
        {
          id: '2',
          title: 'Join Mathematics Club',
          description: 'Your strong performance in calculus suggests you would benefit from advanced mathematical challenges and peer collaboration.',
          category: 'extracurricular',
          priority: 'medium',
          confidence: 78,
          actionRequired: false,
          estimatedTime: '1 semester',
          benefits: [
            'Enhanced mathematical thinking',
            'Leadership opportunities',
            'College application boost'
          ],
          steps: [
            'Attend next Math Club meeting',
            'Speak with Prof. Johnson',
            'Participate in regional competitions'
          ]
        }
      ]
    } else if (userRole === 'teacher') {
      mockRecommendations = [
        {
          id: '5',
          title: 'Implement Active Learning Techniques',
          description: 'Student engagement in your Data Structures class could improve by 25% with interactive coding exercises and peer programming.',
          category: 'academic',
          priority: 'high',
          confidence: 84,
          actionRequired: true,
          estimatedTime: '2-3 weeks',
          benefits: [
            'Higher student engagement',
            'Better learning outcomes',
            'Improved course evaluations'
          ],
          steps: [
            'Introduce pair programming sessions',
            'Use live coding demonstrations',
            'Implement think-pair-share activities',
            'Create interactive problem sets'
          ]
        }
      ]
    } else if (userRole === 'parent') {
      mockRecommendations = [
        {
          id: '8',
          title: 'Support John\'s STEM Interest',
          description: 'John shows exceptional aptitude in mathematics and science. Consider enrolling him in advanced STEM programs.',
          category: 'academic',
          priority: 'high',
          confidence: 91,
          actionRequired: true,
          estimatedTime: 'Next semester',
          benefits: [
            'Accelerated learning',
            'College preparation',
            'Career pathway clarity'
          ],
          steps: [
            'Meet with guidance counselor',
            'Research summer STEM camps',
            'Consider AP course enrollment',
            'Connect with STEM mentors'
          ]
        }
      ]
    }

    setRecommendations(mockRecommendations)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return <BookOpen className="h-4 w-4" />
      case 'social': return <Users className="h-4 w-4" />
      case 'career': return <Target className="h-4 w-4" />
      case 'study': return <Clock className="h-4 w-4" />
      case 'health': return <Star className="h-4 w-4" />
      case 'extracurricular': return <Award className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const markAsCompleted = (recommendationId) => {
    setCompletedRecommendations(prev => [...prev, recommendationId])
  }

  const filteredRecommendations = recommendations.filter(rec =>
    selectedCategory === 'all' || rec.category === selectedCategory
  )

  const categories = ['all', 'academic', 'social', 'career', 'study', 'health', 'extracurricular']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Recommendations
          </h1>
          <p className="text-gray-500">
            Personalized suggestions to enhance your {userRole === 'parent' ? "child's" : ''} academic journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm">
            {recommendations.length} Suggestions
          </span>
          <span className="px-2 py-1 rounded border text-sm">
            AI Powered
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded capitalize text-sm border ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm font-medium">High Priority</p>
          <div className="text-2xl font-bold text-red-600">
            {filteredRecommendations.filter(r => r.priority === 'high').length}
          </div>
          <p className="text-xs text-gray-500">Needs attention</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm font-medium">Avg Confidence</p>
          <div className="text-2xl font-bold text-blue-600">
            {filteredRecommendations.length > 0 ? Math.round(filteredRecommendations.reduce((acc, r) => acc + r.confidence, 0) / filteredRecommendations.length) : 0}%
          </div>
          <p className="text-xs text-gray-500">AI certainty</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm font-medium">Completed</p>
          <div className="text-2xl font-bold text-green-600">
            {completedRecommendations.length}
          </div>
          <p className="text-xs text-gray-500">Actions taken</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm font-medium">Active Goals</p>
          <div className="text-2xl font-bold text-purple-600">
            {filteredRecommendations.filter(r => r.actionRequired).length}
          </div>
          <p className="text-xs text-gray-500">Require action</p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((recommendation) => {
          const isCompleted = completedRecommendations.includes(recommendation.id)

          return (
            <div key={recommendation.id} className={`p-4 border rounded-lg shadow-sm bg-white ${isCompleted ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getCategoryIcon(recommendation.category)}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg font-semibold">{recommendation.title}</h2>
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <p className="text-gray-600">{recommendation.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`px-2 py-1 rounded text-sm border ${getPriorityColor(recommendation.priority)}`}>
                    {recommendation.priority} priority
                  </span>
                  {recommendation.actionRequired && (
                    <span className="px-2 py-1 rounded text-sm border border-orange-300 text-orange-700 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Action needed
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">AI Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: `${recommendation.confidence}%`}}></div>
                      </div>
                      <span className="text-sm text-gray-500">{recommendation.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Estimated Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{recommendation.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Expected Benefits</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {recommendation.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Recommended Steps</p>
                  <div className="space-y-2">
                    {recommendation.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded border text-sm capitalize">{recommendation.category}</span>
                    <span className="text-xs text-gray-500">Generated by AI analysis</span>
                  </div>
                  <div className="flex gap-2">
                    {!isCompleted && (
                      <button
                        onClick={() => markAsCompleted(recommendation.id)}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="p-6 border rounded-lg shadow-sm bg-white text-center">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-2">No recommendations found</h3>
          <p className="text-gray-500">
            Try selecting a different category or check back later for new suggestions.
          </p>
        </div>
      )}
    </div>
  )
}
