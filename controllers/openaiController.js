const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// async function generateImportantPoints(jobDescription) {
//   const prompt = `Please list the 15 most important points in this job description: ${jobDescription}`;
//   const response = await axios.post(
//     "https://api.openai.com/v1/images/generations",
//     { prompt: prompt, model: "text-davinci-002", temperature: 0.5 },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: process.env.OPENAI_API_KEY,
//       },
//     }
//   );
//   return response.data.data.text;
// }
// async function generateJobApplication(
//   jobDescription,
//   skills,
//   experiences,
//   motivation,
//   education
// ) {
//   const prompt = `I am writing to apply for the ${jobDescription} position. My skills include ${skills}. I have the following experiences: ${experiences}. ${motivation} My education includes: ${education}.`;
//   const response = await axios.post(
//     "https://api.openai.com/v1/images/generations",
//     { prompt: prompt, model: "text-davinci-002", temperature: 0.5 },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: process.env.OPENAI_API_KEY,
//       },
//     }
//   );
//   return response.data.data.text;
// }
// const jobDescription =
//   "We are seeking a highly motivated and experienced software engineer to join our team. The ideal candidate will have experience in JavaScript, Node.js, and React, and a strong understanding of software development best practices. The candidate will be responsible for designing and implementing new features, as well as maintaining and improving existing ones. Strong problem-solving skills and the ability to work in a fast-paced, agile environment are essential.";
// const importantPoints = generateImportantPoints(jobDescription);
// console.log(importantPoints);
// const jobApplication = generateJobApplication(
//   "Software Engineer",
//   "JavaScript, Node.js, React",
//   "Worked on several projects as a full-stack developer",
//   "I am motivated to apply for this position because I am passionate about using my skills and experiences to build innovative software solutions and make a positive impact on the world.",
//   "Bachelor of Science in Computer Science from XYZ University"
// );
// console.log(jobApplication);

const generateText = async (req, res) => {
  const { inputText } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText,
      temperature: 0.5,
      max_tokens: 400,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    const textResponse = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: textResponse,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "There was an error fetching your question",
    });
  }
};
const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = {
  generateImage,
  generateText,
  // generateImportantPoints,
  // generateJobApplication,
};
