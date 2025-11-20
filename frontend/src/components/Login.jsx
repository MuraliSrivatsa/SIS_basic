import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    Brain,
    Users,
    Award,
    TrendingUp,
    Zap,
} from "lucide-react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [showLogin, setShowLogin] = useState(false);

    const features = [
        {
            icon: GraduationCap,
            title: "Academic Excellence",
            description: "Track student progress with analytics",
        },
        {
            icon: Brain,
            title: "AI-Powered Insights",
            description: "Personalized recommendations for every user",
        },
        {
            icon: Users,
            title: "Community Collaboration",
            description: "Connect students, teachers, and parents seamlessly",
        },
        {
            icon: Award,
            title: "Achievement Tracking",
            description: "Monitor and celebrate academic milestones",
        },
    ];

    const stats = [
        { label: "Active Students", value: "2,847" },
        { label: "Faculty Members", value: "156" },
        { label: "Courses", value: "89" },
        { label: "Success Rate", value: "94%" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await authService.login(
                formData.username,
                formData.password
            );
            onLogin(response.user);
        } catch (error) {
            setError(
                error.error || "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };
    const navigate = useNavigate();

    const handleDemoLogin = (userType) => {
        const demoCredentials = {
            student: { username: "student1", password: "password123" },
            staff: { username: "teacher1", password: "password123" },
            principal: { username: "principal1", password: "password123" },
            parent: { username: "parent1", password: "password123" },
            admin: { username: "admin1", password: "password123" },
        };
        const credentials = demoCredentials[userType];
        if (credentials) {
            setFormData(credentials);
            setTimeout(() => {
                document.getElementById("login-form").requestSubmit();
            }, 100);
        }
    };

    const currentFeatureData = features[currentFeature];
    const CurrentIcon = currentFeatureData.icon;

    return (
        <Container fluid className="min-vh-100 p-0">
            <Row className="g-0 min-vh-100">
                {/* LEFT PANEL */}
                <Col
                    xs={12}
                    lg={6}
                    className="d-flex flex-column justify-content-between text-white p-5 position-relative order-1 order-lg-1"
                    style={{
                        background: "linear-gradient(135deg, #1d2671 0%, #d55880ff 100%)",
                        overflow: "hidden",
                    }}
                >
                    {/* Floating circles background */}
                    <div
                        className="position-absolute w-100 h-100"
                        style={{ top: 0, left: 0, zIndex: 0, overflow: "hidden" }}
                    >
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="rounded-circle bg-white bg-opacity-10 position-absolute"
                            style={{ width: 120, height: 120, top: "15%", left: "20%" }}
                        />
                        <motion.div
                            animate={{ x: [0, 30, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="rounded-circle bg-white bg-opacity-10 position-absolute"
                            style={{ width: 200, height: 200, bottom: "20%", right: "10%" }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ zIndex: 1 }}
                    >
                        {/* Logo */}
                        <div className="d-flex align-items-center gap-3 mb-5">
                            <div
                                className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center"
                                style={{ width: 56, height: 56 }}
                            >
                                <Zap className="text-white" size={28} />
                            </div>
                            <div onClick={() => navigate("/")} className="cursor-pointer">
                                <h1 className="fw-bold mb-0">ZENDESK</h1>
                                <p className="text-white-50 mb-0">
                                    Education Management Platform
                                </p>
                            </div>
                        </div>

                        {/* Animated Feature */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFeature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center"
                                        style={{ width: 64, height: 64 }}
                                    >
                                        <CurrentIcon size={28} />
                                    </div>
                                    <div>
                                        <h2 className="h5 mb-1">{currentFeatureData.title}</h2>
                                        <p className="text-white-50 mb-0">
                                            {currentFeatureData.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Indicators */}
                        <div className="d-flex gap-2 mb-5">
                            {features.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    layout
                                    className={`rounded-pill bg-white ${idx === currentFeature ? "opacity-100" : "opacity-50"
                                        }`}
                                    style={{ height: 8, width: idx === currentFeature ? 24 : 8 }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Get Started button for mobile */}


                    {/* Stats */}
                    <div style={{ zIndex: 1 }}>
                        <h5 className="d-flex align-items-center gap-2 mb-3">
                            <TrendingUp size={18} /> Platform Statistics
                        </h5>
                        <Row>
                            {stats.map((stat, idx) => (
                                <Col xs={6} key={idx} className="mb-3">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <div className="fw-bold fs-4">{stat.value}</div>
                                        <div className="text-white-50 small">{stat.label}</div>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                {/* RIGHT PANEL (Login) */}
                <AnimatePresence>
                    {(showLogin || window.innerWidth >= 992) && (
                        <motion.div
                            key="login-panel"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.6 }}
                            className="order-2 order-lg-2 col-12 col-lg-6 d-flex align-items-center justify-content-center bg-light"
                            style={{ minHeight: "100vh" }}
                        >
                            <div
                                className="w-100"
                                style={{ maxWidth: 440, zIndex: 1 }}
                            >
                                <Card
                                    className="shadow-lg border-0"
                                    style={{
                                        borderRadius: "1.5rem",
                                        overflow: "hidden",
                                        background:
                                            "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                                    }}
                                >
                                    <Card.Body className="p-5">
                                        {/* Top Logo */}
                                        <motion.div
                                            className="text-center mb-4"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="mb-3 d-flex justify-content-center">
                                                <div
                                                    className="rounded-circle d-flex align-items-center justify-content-center shadow"
                                                    style={{
                                                        width: 72,
                                                        height: 72,
                                                        background:
                                                            "linear-gradient(135deg, #4f46e5, #9333ea)",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <GraduationCap size={32} />
                                                </div>
                                            </div>
                                            <h3 className="fw-bold text-dark">Welcome Back</h3>
                                            <p className="text-muted">
                                                Sign in to continue your journey
                                            </p>
                                        </motion.div>

                                        {error && <Alert variant="danger">{error}</Alert>}

                                        {/* Login Form */}
                                        <Form id="login-form" onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Enter your username"
                                                    className="rounded-pill shadow-sm"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-4">
                                                <Form.Label className="fw-semibold">Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Enter your password"
                                                    className="rounded-pill shadow-sm"
                                                />
                                            </Form.Group>

                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="w-100 mb-3 fw-semibold rounded-pill shadow"
                                                style={{
                                                    background: "linear-gradient(90deg, #4f46e5, #9333ea)",
                                                    border: "none",
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? "Signing in..." : "Sign In"}
                                            </Button>


                                        </Form>

                                        {/* Divider */}
                                        <div className="d-flex align-items-center my-4">
                                            <hr className="flex-grow-1" />
                                            <span className="mx-2 text-muted small">OR</span>
                                            <hr className="flex-grow-1" />
                                        </div>

                                        {/* Quick Demo Access */}
                                        <div className="text-center">
                                            <p className="text-muted mb-3 fw-semibold">
                                                Quick Demo Access
                                            </p>
                                            <Row className="g-2">
                                                {[
                                                    { type: "student", label: "🎓 Student", color: "primary" },
                                                    { type: "staff", label: "👨‍🏫 Teacher", color: "success" },
                                                    { type: "principal", label: "🏆 Principal", color: "info" },
                                                    { type: "parent", label: "👪 Parent", color: "warning" },
                                                    { type: "admin", label: "🛡️ Admin", color: "dark" },
                                                ].map((demo, idx) => (
                                                    <Col xs={6} key={idx}>
                                                        <Button
                                                            variant={`outline-${demo.color}`}
                                                            size="sm"
                                                            onClick={() => handleDemoLogin(demo.type)}
                                                            className="w-100 fw-semibold rounded-3 shadow-sm"
                                                        >
                                                            {demo.label}
                                                        </Button>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Row>
        </Container>
    );
};

export default Login;
