const axios = require("axios");
async function generateImportantPoints(jobDescription) {
  const prompt = `Please list the 15 most important points in this job description: ${jobDescription}`;
  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    { prompt: prompt, model: "text-davinci-002", temperature: 0.5 },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
    }
  );
  return response.data.data.text;
}
async function generateJobApplication(
  jobDescription,
  skills,
  experiences,
  motivation,
  education
) {
  const prompt = `I am writing to apply for the ${jobDescription} position. My skills include ${skills}. I have the following experiences: ${experiences}. ${motivation} My education includes: ${education}.`;
  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    { prompt: prompt, model: "text-davinci-002", temperature: 0.5 },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
    }
  );
  return response.data.data.text;
}
const jobDescription =
  "We are seeking a highly motivated and experienced software engineer to join our team. The ideal candidate will have experience in JavaScript, Node.js, and React, and a strong understanding of software development best practices. The candidate will be responsible for designing and implementing new features, as well as maintaining and improving existing ones. Strong problem-solving skills and the ability to work in a fast-paced, agile environment are essential.";
const importantPoints = await generateImportantPoints(jobDescription);
console.log(importantPoints);
const jobApplication = await generateJobApplication(
  "Software Engineer",
  "JavaScript, Node.js, React",
  "Worked on several projects as a full-stack developer",
  "I am motivated to apply for this position because I am passionate about using my skills and experiences to build innovative software solutions and make a positive impact on the world.",
  "Bachelor of Science in Computer Science from XYZ University"
);
console.log(jobApplication);
