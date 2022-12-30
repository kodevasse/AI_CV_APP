const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const jobDescription =
  "Vil du være med oss å skape de nye teknologiene for bank & finans? Vi søker deg som ser løsninger, setter deg inn i kundens behov og kan løse utfordringer ved hjelp av moderne teknologi. ArbeidsgiverKnowit, Bergen og Oslo StillingstittelIn-house utviklere - både backend og fullstack, seniorutviklere og nyutdannete. Vi søker nyutdannede og erfarne utviklere i Bergen og Oslo Knowit er et av Nordens ledende selskaper innen teknologi og innovasjon, og bruker vår kompetanse innen digitalisering til å skape et bærekraftig og menneskelig samfunn.";

async function generateResponse(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 2000,

    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  return response.data.choices[0].text;
}

async function main() {
  const response1 = await generateResponse(
    `Lag et kort sammendrag av viktigste punktene i denne stillingsbeskrivelsen: ${jobDescription}`
  );
  console.log(response1);

  const response2 = await generateResponse(
    `Lag en jobb søknad på norsk for denne jobben ${response1}. `
  );
  console.log(response2);
}

main();

// async function generateImportantPoints(jobDescription) {
//   const response2 = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: `Please list the 3 most important points in this job description: ${jobDescription}`,
//     temperature: 0.5,
//     max_tokens: 4000,
//     top_p: 0.3,
//     frequency_penalty: 0.5,
//     presence_penalty: 0.0,
//   });
//   return response2.data.choices[0].text;
// }

// async function generateJobApplication(
//   jobDescription,
//   skills,
//   experiences,
//   motivation,
//   education
// ) {
//   const response = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: `I am writing to apply for the `,
//     temperature: 0.5,
//     max_tokens: 4000,
//     top_p: 0.3,
//     frequency_penalty: 0.5,
//     presence_penalty: 0.0,
//   });
//   return response.data.choices[0].text;
// }
// async function main() {
//   const jobDescription =
//     "We are seeking a highly motivated and experienced software engineer to join our team. The ideal candidate will have experience in JavaScript, Node.js, and React, and a strong understanding of software development best practices. The candidate will be responsible for designing and implementing new features, as well as maintaining and improving existing ones. Strong problem-solving skills and the ability to work in a fast-paced, agile environment are essential.";

//   const importantPoints = await generateImportantPoints(jobDescription);
//   console.log("important points", importantPoints);

//   const jobApplication = await generateJobApplication(
//     "Software Engineer",
//     "JavaScript, Node.js, React",
//     "Worked on several projects as a full-stack developer",
//     "I am motivated to apply for this position because I am passionate about using my skills and experiences to build innovative software solutions and make a positive impact on the world.",
//     "Bachelor of Science in Computer Science from XYZ University"
//   );
//   console.log("jobapplication", jobApplication);
// }
// main();

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
