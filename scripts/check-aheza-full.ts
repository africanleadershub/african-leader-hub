import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: "postgresql://postgres:1213@localhost:5432/alh_dev" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const p = await prisma.program.findUnique({ where: { slug: "aheza" } });
  if (!p) { console.log("NOT FOUND"); return; }
  console.log("slug:", p.slug);
  console.log("title:", p.title);
  console.log("detailsHtml:", p.detailsHtml ? "YES" : "NO");
  console.log("introductionHtml:", p.introductionHtml ? "YES" : "NO");
  console.log("backgroundHtml:", p.backgroundHtml ? "YES" : "NO");
  console.log("goalHtml:", p.goalHtml ? "YES" : "NO");
  console.log("whoServesHtml:", p.whoServesHtml ? "YES" : "NO");
  console.log("timelineHtml:", p.timelineHtml ? "YES" : "NO");
  console.log("objectives:", p.objectives.length);
  console.log("keyActivities:", p.keyActivities.length);
  console.log("expectedOutcomes:", p.expectedOutcomes.length);
  console.log("showIntroduction:", p.showIntroduction);
  console.log("showBackground:", p.showBackground);
  console.log("showGoal:", p.showGoal);
  console.log("showWhoServes:", p.showWhoServes);
  console.log("showTimeline:", p.showTimeline);
  console.log("showObjectives:", p.showObjectives);
  console.log("showKeyActivities:", p.showKeyActivities);
  console.log("showExpectedOutcomes:", p.showExpectedOutcomes);
  console.log("showTestimonials:", p.showTestimonials);
  console.log("showParticipants:", p.showParticipants);
  console.log("showAlumni:", p.showAlumni);
  console.log("showGallery:", p.showGallery);
  console.log("phases:", p.timelinePhases.length);
  console.log("galleryImages:", p.galleryImages.length);
  console.log("objectivesManaged:", p.objectivesManaged.length);
  console.log("outcomes:", p.outcomes.length);
  console.log("activities:", p.activities.length);
  console.log("testimonials:", p.testimonials.length);
  console.log("participants:", p.participants.length);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });