import React from "react";
import Navbar from "./Navbar";
import "./Styles/Home.css";
import { Link } from "react-router-dom";
import hero from "./Assets/hero-box-img-01.png";
import hero_2 from "./Assets/hero-box2-img.png";
import hero_3 from "./Assets/hero-box-3.png";
import hero_4 from "./Assets/hero-box-4.png";
import "./Styles/AboutUs.css";
import card1_img from "./Assets/card1-img.png";
import card2_img from "./Assets/card2-img.png";
import card3_img from "./Assets/card3-img.png";
import card4_img from "./Assets/card4-img.png";
import tuition_img from "./Assets/tuition_img.png";
import hero_5 from "./Assets/hero-box-img5.png";
import "./Styles/Services.css";
import stu_track from "./Assets/personalized_stu_track.png";
import point1 from "./Assets/firstpoint.png";
import point2 from "./Assets/point2.png";
import stu_recommend from "./Assets/Recommended_content.png";
import mcq from "./Assets/mcq.png";
import contact_us from "./Assets/contact_us.png";
import location from "./Assets/location.png";
import phone from "./Assets/phone.png";
import email from "./Assets/e-mail.png";
import Footer from "./Footer";
import studentCom from "./Assets/studentCom.png";

function LandingPage() {
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const contactCard = {
		width: "270px",
		height: "240px",
		marginBottom: "20px",
	};
	return (
		<div>
			{/**1.Navigation bar */}
			<section id="home">
				<Navbar />
				{/**2.Hero-section */}
				<div className="hero-section">
					{/**Left part */}
					<div className="left">
						<div className="text">
							<div className="text1">
								<h1>Welcome to Next Tier!</h1>
							</div>
							<div className="text2">
								<h1>Empowering educataion</h1>
							</div>
							<p>The Future of Learning! Discover engaging courses, expert instructors, and powerful learning tools all in one place. Elevate your education, track your progress, and embrace endless possibilities. Join NextTier today and unleash your brilliance!</p>
							<button className="stu-signup-btn">
								<Link to="/register" className="join">
									Join the community
								</Link>
							</button>
						</div>
					</div>
					{/**Right Part */}
					<div className="right">
						<div className="hero-boxes">
							<div className="hero-box1">
								<div className="hero-box-img">
									<img src={hero} alt="" />
								</div>
								<div className="hero-box-text">
									<p className="count">200+</p>
									<p className="description-one">Active Students</p>
								</div>
							</div>
							<div className="hero-box2">
								<div className="hero-box-img">
									<img src={hero_2} alt="" />
								</div>
								<div className="hero-box-text">
									<p className="description">Physical Classrom</p>
									<p className="des-des">Experience</p>
								</div>
							</div>
							<div className="hero-box3">
								<div className="hero-box-img">
									<img src={hero_3} alt="" />
								</div>
								<div className="hero-box-text">
									<p className="description">Individual Student </p>
									<p className="des-des">Monitoring</p>
								</div>
							</div>
							<div className="hero-box4">
								<div className="hero-box-img">
									<img src={hero_4} alt="" />
								</div>
								<div className="hero-box-text">
									<p className="description">
										{" "}
										<span className="count">20+</span> Teachers{" "}
									</p>
									<p className="des-des">and Supporting Staff</p>
								</div>
							</div>
							<div className="hero-box5">
								<div className="hero-box-img">
									<img src={hero_5} alt="" />
								</div>
								<div className="hero-box-text">
									<p className="des_lastbox">Enagagement of</p>
									<p className="des-des_lastbox">parents</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/**3.About Us */}

			<section id="about">
				<div className="about-text">
					<h1 className="about-text-title1">
						Your Ultimate <span className="about-text-span">All-In-One</span> Education Platform
					</h1>
					<p>
						{" "}
						Experience the power of NextTier is a comprehensive cloud software suite designed to revolutionize your learning journey. Seamlessly integrate courses, teachers, students, and administrative tasks in one centralized platform. Discover the future of education with NextTier.
					</p>
				</div>
				<div className="cards">
					<div className="card-items">
						<div className="card-img">
							<img className="card1-img" src={card1_img} alt="" />
						</div>
						<div className="card-text-title">Personalized Student</div>
						<div className="card-text-title">Tracking </div>
						<div className="card-text-des1">Effortlessly track student progress, attendance, and performance with NextTier. Gain valuable insights, personalize learning paths, and empower student success.</div>
					</div>

					<div className="card-items">
						<div className="card-img">
							<img className="card1-img" src={card2_img} alt="" />
						</div>
						<div className="card-text-title">Student Community </div>

						<div className="card-text-des2">Collaborate, share ideas, and learn from peers on NextTier. Connect with students across disciplines, engage in discussions, and create a supportive learning environment.</div>
					</div>

					<div className="card-items">
						<div className="card-img">
							<img className="card1-img" src={card3_img} alt="" />
						</div>
						<div className="card-text-title">Courses,Study Pack,</div>
						<div className="card-text-title">Quizzes & Tests </div>
						<div className="card-text-des3">Access a vast library of educational resources on NextTier. Dive into interactive courses, study packs, and quizzes to enhance your learning experience and test your knowledge..</div>
					</div>

					<div className="card-items">
						<div className="card-img">
							<img className="card1-img" src={card4_img} alt="" />
						</div>
						<div className="card-text-title">Parental Engagement </div>
						<div className="card-text-des4">Stay involved and connected with your child's educational journey. Access real-time updates on their progress, attendance, and performance.</div>
					</div>
				</div>

				<div className="more_des">
					<div className="more_des_text">
						<h1 className="more_des_text_title">
							What is <span className="more_des_title_span">NextTier?</span>
						</h1>
						<p>
							Since its establishment in 2002, NextTier has been dedicated to transforming the education landscape in Sri Lanka. Today, we are proud to introduce our state-of-the-art online platform tailored specifically for educational institute in Nugegoda, Colombo. Our comprehensive
							platform empowers institutions to streamline operation and enhance student engagement. With NextTier,Join us in embracing the digital era and unlocking new possibilities in education. Let's embark on a journey of academic excellence together with NextTier
						</p>
					</div>
					<div className="more_des_img">
						<img className="tuition_img" src={tuition_img} alt="" />
					</div>
				</div>

				<div className="get_started">
					<div className="getstarted_image_stu">
						<p> FOR STUDENTS</p>
						<button>
							<Link to="/register" className="join">
								Get Started
							</Link>
						</button>
					</div>
					<div className="getstarted_image_teacher">
						<p> FOR TEACHERS</p>
						<div className="getstarted_image_teacher_text2"> Contact NextTier</div>
						<button onClick={() => scrollToSection("contact")}>Start a course today</button>
					</div>
				</div>
			</section>
			<hr className="hr_first" />

			{/**Services */}

			<section id="services">
				<h1 className="main_heading">
					Our <span>Features</span>
				</h1>
				<p className="main_heading_para">Discover the power of our comprehensive features designed to enhance your experience and drive success.</p>
			</section>

			{/**First Feature-Personalized Student Tracking */}
			<div className="feature1">
				<div className="image">
					<img className="image1" src={stu_track} alt="" />
				</div>
				<div className="feature_text">
					<h1 className="first_feature_title">Personalized Student Tracking</h1>
					<div className="text">
						<div className="image" style={{ "margin-top": "60px" }}>
							<img src={point1} alt="" />
						</div>
						<p className="feature_text_point1">Students can look up courses and teachers,  enroll in courses offered by teachers.</p>
					</div>
					<div className="text">
						<div className="image">
							<img src={point2} alt="" />
						</div>
						<p className="feature_text_point2">Students can access their grades and results for the enrolled courses.</p>
					</div>
					<div className="text">
						<div className="image">
							<img src={point1} alt="" />
						</div>
						<p className="feature_text_point3">Students can access analytics related to their progress and performance.</p>
					</div>
				</div>
			</div>

			{/**Second feature -Suggest Recommended content*/}
			<div className="feature1">
				<div className="feature_text">
					<h1 className="first_feature_title" style={{ "margin-left": "180px" }}>
						Suggest Recommended Content
					</h1>
					<div className="text">
						<p className="feature_text_point1" style={{ "margin-left": "180px", "margin-right": "60px" }}>
							Based on each student's unique needs and areas of weakness, the system suggests topics. The tutor or his assisting staff can add each student's grades and areas of weakness. Therefore, when the system pinpoints the student's weak regions, the system suggests content
							focusing on those areas.
						</p>
					</div>
				</div>
				<div className="image">
					<img className="image1" style={{ width: "570px" }} src={stu_recommend} alt="" />
				</div>
			</div>

			{/**Third Feature */}

			<div className="feature1">
				<div className="image">
					<img className="image1" style={{ "margin-left": "120px", height: "390px" }} src={mcq} alt="" />
				</div>
				<div className="feature_text">
					<h1 className="first_feature_title">Randomly Generated MCQ’s</h1>
					<div className="text">
						<p className="feature_text_point1" style={{ "margin-right": "180px" }}>
							An MCQ section offers an MCQ paper based on the subject the student chooses. Additionally, the system generates MCQ papers with that focus when it identifies the student's weak areas, until the student masters those subjects.
						</p>
					</div>
				</div>
			</div>
			{/**fourth feature -Student Community*/}
			<div className="feature1">
				<div className="feature_text">
					<h1 className="first_feature_title" style={{ "margin-left": "180px" }}>
						Student Community
					</h1>
					<div className="text">
						<p className="feature_text_point1" style={{ "margin-left": "180px", "margin-right": "60px" }}>
							Students can publish, respond to posts, and report information that is improper. Students may also file complaints about classes or course materials.
						</p>
					</div>
				</div>
				<div className="image">
					<img className="image1" style={{ width: "570px", height: "350px" }} src={studentCom} alt="" />
				</div>
			</div>
			{/**Fifth Feature */}

			<div className="feature1">
				<div className="image">
					<img className="image1" style={{ "margin-left": "120px" }} src={mcq} alt="" />
				</div>
				<div className="feature_text">
					<h1 className="first_feature_title">Parent Engagement</h1>
					<div className="text">
						<p className="feature_text_point1" style={{ "margin-right": "180px" }}>
							Parents of students also can engage with this system for monitoring their children. A parent's portal will also allow them to pay for their child's education.
						</p>
					</div>
				</div>
			</div>
			<hr className="hr_first" />

			{/**Conact page */}
			<section id="contact">
				{/**Conatct Us*/}
				<div className="feature1">
					<div className="feature_text">
						<h1 className="first_feature_title" style={{ "margin-left": "180px", "font-size": "30px" }}>
							We would love to <span style={{ color: "#F48C06" }}>hear from you!</span>
						</h1>
						<div className="text">
							<p className="feature_text_point1" style={{ "margin-left": "180px", "margin-right": "60px", "justify-content": "center" }}>
								We value your input and are eager to connect with you! Weather you have inquiries, feedback, or require support, the NextTier team is here to assist you. Additionally, teachers interested in joining our platform are encouraged to reach out to us. We look forward to
								hearing from you and working together to shape the future of education.
							</p>
						</div>
					</div>
					<div className="image">
						<img className="image1" style={{ width: "570px" }} src={contact_us} alt="" />
					</div>
				</div>

				<div className="cards" style={{ "margin-top": "50px" }}>
					<div className="card-items" style={contactCard}>
						<div className="card-img">
							<img style={{ width: "70px", height: "70px" }} className="card1-img" src={location} alt="" />
						</div>
						<div className="card-text-title" style={{ "margin-top": "10px" }}>
							Address
						</div>

						<div className="card-text-des1" style={{ "margin-top": "40px", "font-size": "17px" }}>
							No. 123, Main Street, Nugegoda, Colombo, Sri Lanka
						</div>
					</div>

					<div className="card-items" style={contactCard}>
						<div className="card-img">
							<img style={{ width: "70px", height: "70px" }} className="card1-img" src={phone} alt="" />
						</div>
						<div className="card-text-title" style={{ "margin-top": "10px" }}>
							Phone Number
						</div>

						<div className="card-text-des2" style={{ "margin-top": "40px", "font-size": "17px" }}>
							+94 77 123 4567
						</div>
					</div>

					<div className="card-items" style={contactCard}>
						<div className="card-img">
							<img style={{ width: "70px", height: "70px" }} className="card1-img" src={email} alt="" />
						</div>

						<div className="card-text-title" style={{ "margin-top": "10px" }}>
							E-mail{" "}
						</div>
						<div className="card-text-des3" style={{ "margin-top": "40px", "font-size": "17px" }}>
							info@nexttier.lk
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default LandingPage;
