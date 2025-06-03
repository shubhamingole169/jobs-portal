import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB ✅");

    // Cleanup
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({})
    ]);

    // ==== USERS ====
    const recruiters = await User.insertMany([
      {
        fullname: "Alice Johnson",
        email: "alice@techcorp.com",
        phoneNumber: 1111111111,
        password: "hashedpassword",
        role: "recruiter",
        profile: {},
      },
      {
        fullname: "David Kim",
        email: "david@devhouse.com",
        phoneNumber: 2222222222,
        password: "hashedpassword",
        role: "recruiter",
        profile: {},
      }
    ]);

    const students = await User.insertMany([
      {
        fullname: "Bob Student",
        email: "bob@student.com",
        phoneNumber: 3333333333,
        password: "hashedpassword",
        role: "student",
        profile: {
          bio: "Frontend enthusiast",
          skills: ["HTML", "CSS", "JavaScript"],
          resume: "https://example.com/bob_resume.pdf",
          resumeOriginalName: "Bob_Resume.pdf"
        }
      },
      {
        fullname: "Carol Developer",
        email: "carol@student.com",
        phoneNumber: 4444444444,
        password: "hashedpassword",
        role: "student",
        profile: {
          bio: "Backend developer",
          skills: ["Node.js", "MongoDB"],
          resume: "https://example.com/carol_resume.pdf",
          resumeOriginalName: "Carol_Resume.pdf"
        }
      },
      {
        fullname: "Ethan Learner",
        email: "ethan@student.com",
        phoneNumber: 5555555555,
        password: "hashedpassword",
        role: "student",
        profile: {
          bio: "Full-stack dev",
          skills: ["React", "Express", "MongoDB"],
          resume: "https://example.com/ethan_resume.pdf",
          resumeOriginalName: "Ethan_Resume.pdf"
        }
      }
    ]);

    // ==== COMPANIES ====
    const companies = await Company.insertMany([
      {
        name: "TechCorp",
        description: "Leading tech company",
        website: "https://techcorp.com",
        location: "San Francisco",
        logo: "https://example.com/logo1.png",
        userId: recruiters[0]._id,
      },
      {
        name: "DevHouse",
        description: "Software development agency",
        website: "https://devhouse.io",
        location: "New York",
        logo: "https://example.com/logo2.png",
        userId: recruiters[1]._id,
      },
      {
        name: "CloudBase",
        description: "Cloud computing startup",
        website: "https://cloudbase.net",
        location: "Seattle",
        logo: "https://example.com/logo3.png",
        userId: recruiters[1]._id,
      }
    ]);

    // Link companies to recruiter profiles
    recruiters[0].profile.company = companies[0]._id;
    recruiters[1].profile.company = companies[1]._id;
    await recruiters[0].save();
    await recruiters[1].save();

    // ==== JOBS ====
    const jobs = await Job.insertMany([
      // TechCorp Jobs
      {
        title: "React Developer",
        description: "Build UI with React",
        requirements: ["React", "Redux", "CSS"],
        salary: 85000,
        experienceLevel: 2,
        location: "Remote",
        jobType: "Full-time",
        position: 1,
        company: companies[0]._id,
        created_by: recruiters[0]._id,
      },
      {
        title: "UI/UX Designer",
        description: "Design web interfaces",
        requirements: ["Figma", "Sketch"],
        salary: 75000,
        experienceLevel: 1,
        location: "Remote",
        jobType: "Contract",
        position: 1,
        company: companies[0]._id,
        created_by: recruiters[0]._id,
      },
      {
        title: "QA Engineer",
        description: "Test our platform",
        requirements: ["Selenium", "Jest"],
        salary: 70000,
        experienceLevel: 2,
        location: "On-site",
        jobType: "Full-time",
        position: 2,
        company: companies[0]._id,
        created_by: recruiters[0]._id,
      },

      // DevHouse Jobs
      {
        title: "Backend Developer",
        description: "Node.js microservices",
        requirements: ["Node.js", "MongoDB", "Docker"],
        salary: 95000,
        experienceLevel: 3,
        location: "New York",
        jobType: "Full-time",
        position: 1,
        company: companies[1]._id,
        created_by: recruiters[1]._id,
      },
      {
        title: "DevOps Engineer",
        description: "CI/CD pipelines",
        requirements: ["AWS", "GitHub Actions", "Terraform"],
        salary: 100000,
        experienceLevel: 3,
        location: "Hybrid",
        jobType: "Full-time",
        position: 1,
        company: companies[1]._id,
        created_by: recruiters[1]._id,
      },
      {
        title: "Project Manager",
        description: "Lead dev team",
        requirements: ["Agile", "Scrum", "Jira"],
        salary: 105000,
        experienceLevel: 4,
        location: "Remote",
        jobType: "Contract",
        position: 1,
        company: companies[1]._id,
        created_by: recruiters[1]._id,
      },

      // CloudBase Jobs
      {
        title: "Cloud Engineer",
        description: "Deploy cloud infra",
        requirements: ["GCP", "Kubernetes"],
        salary: 99000,
        experienceLevel: 2,
        location: "Seattle",
        jobType: "Full-time",
        position: 1,
        company: companies[2]._id,
        created_by: recruiters[1]._id,
      },
      {
        title: "AI Researcher",
        description: "AI & ML projects",
        requirements: ["TensorFlow", "Python"],
        salary: 120000,
        experienceLevel: 5,
        location: "Remote",
        jobType: "Full-time",
        position: 1,
        company: companies[2]._id,
        created_by: recruiters[1]._id,
      },
      {
        title: "Data Analyst",
        description: "Analyze product data",
        requirements: ["SQL", "Tableau"],
        salary: 85000,
        experienceLevel: 2,
        location: "Remote",
        jobType: "Full-time",
        position: 1,
        company: companies[2]._id,
        created_by: recruiters[1]._id,
      },
      {
        title: "Support Engineer",
        description: "Assist users",
        requirements: ["Customer Service", "Troubleshooting"],
        salary: 65000,
        experienceLevel: 1,
        location: "On-site",
        jobType: "Part-time",
        position: 2,
        company: companies[2]._id,
        created_by: recruiters[1]._id,
      }
    ]);

    // ==== APPLICATIONS ====
    const applications = await Application.insertMany([
      {
        job: jobs[0]._id,
        applicant: students[0]._id,
        status: "pending"
      },
      {
        job: jobs[1]._id,
        applicant: students[1]._id,
        status: "accepted"
      },
      {
        job: jobs[2]._id,
        applicant: students[2]._id,
        status: "pending"
      },
      {
        job: jobs[3]._id,
        applicant: students[0]._id,
        status: "rejected"
      },
      {
        job: jobs[4]._id,
        applicant: students[1]._id,
        status: "pending"
      },
      {
        job: jobs[5]._id,
        applicant: students[2]._id,
        status: "pending"
      }
    ]);

    // Link applications to job
    for (let app of applications) {
      const job = await Job.findById(app.job);
      job.applications.push(app._id);
      await job.save();
    }

    console.log("🎉 Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
