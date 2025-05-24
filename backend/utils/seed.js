const { faker } = require("@faker-js/faker");

import Certificate from "../models/certificate.model";
import Project from "../models/project.model";
import Experience from "../models/experience.model";

const USER_ID = "682b044be0d0d58da40bfc95";

const generateCertificates = (count) =>
  Array.from({ length: count }, () => ({
    name: faker.helpers.unique(faker.lorem.words, [3]),
    description: faker.lorem.sentences(2),
    issuedBy: faker.company.name(),
    issuedDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
    userId: USER_ID,
  }));

const generateProjects = (count) =>
  Array.from({ length: count }, () => {
    const start = faker.date.past({ years: 3 });
    const end = faker.date.between({ from: start, to: new Date() });

    return {
      name: faker.helpers.unique(faker.commerce.productName),
      description: faker.lorem.paragraph(),
      technologies: faker.helpers.arrayElements(
        [
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "FastAPI",
          "Flutter",
          "TensorFlow",
          "Java",
          "Python",
        ],
        3
      ),
      from: start.toISOString().split("T")[0],
      to: end.toISOString().split("T")[0],
      userId: USER_ID,
    };
  });

const generateExperiences = (count) =>
  Array.from({ length: count }, () => {
    const start = faker.date.past({ years: 4 });
    const end = faker.date.between({ from: start, to: new Date() });

    return {
      role: faker.name.jobTitle(),
      company: faker.company.name(),
      description: faker.lorem.sentences(3),
      from: start.toISOString().split("T")[0],
      to: end.toISOString().split("T")[0],
      userId: USER_ID,
    };
  });

async function seed() {
  try {
    await Certificate.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();

    const certs = generateCertificates(20);
    const projects = generateProjects(10);
    const exps = generateExperiences(10);

    await Certificate.insertMany(certs);
    await Project.insertMany(projects);
    await Experience.insertMany(exps);

    console.log("Seeded 20 certificates, 10 projects, and 10 experiences!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
