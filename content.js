/*
  PH101 SITE CONTENT
  ------------------
  This is the only file you need to edit to update the site.
  Easiest way: open the site with ?admin at the end of the URL
  (e.g. https://yourname.github.io/ph101/?admin), fill the form,
  then click "Download content.js" and upload it to the repo.

  Links can point to:
   - files inside this repo, e.g.  "materials/lectures/L01.pdf"
   - Google Drive / OneDrive / any web link
  Demo videos: paste any YouTube link in "video" (watch, youtu.be or shorts),
  or a direct .mp4 link / repo path like "materials/videos/demo.mp4".

  Everything below marked SAMPLE is placeholder content: replace or delete it.
*/
window.COURSE = {
  "info": {
    "code": "PH101",
    "title": "Applied Physics",
    "semester": "Fall 2026",
    "institute": "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
    "department": "Faculty of Engineering Sciences",
    "instructor": "Course Instructor (edit in content.js)",
    "labEngineer": "Hamzah Naeem, Lab Engineer",
    "contact": "G-66, Engineers Office, GIK Institute, Topi",
    "about": "PH101 introduces the physical principles behind engineering: mechanics, oscillations and waves, electricity and magnetism, and the basics of modern physics. Lectures build the theory, tutorials build problem-solving, and the lab (PH101L) puts the ideas on the bench with real measurements and uncertainty analysis."
  },

  "announcements": [
    { "date": "2026-11-02", "text": "SAMPLE: Course website is live. Lecture slides and tutorial sheets will be posted here every week." },
    { "date": "2026-11-05", "text": "SAMPLE: Lab 6 pre-lab quiz will be held at the start of the session. Bring your lab notebook." }
  ],

  "lectures": [
    {
      "week": 1, "title": "Vectors, units and dimensional analysis",
      "description": "SI units, significant figures, vector algebra, dot and cross products.",
      "links": [
        { "label": "Slides", "url": "materials/lectures/L01-vectors.pdf" },
        { "label": "Notes", "url": "materials/lectures/L01-notes.pdf" }
      ]
    },
    {
      "week": 2, "title": "Kinematics in one and two dimensions",
      "description": "Displacement, velocity, acceleration; projectile and circular motion.",
      "links": [ { "label": "Slides", "url": "materials/lectures/L02-kinematics.pdf" } ]
    },
    {
      "week": 3, "title": "Newton's laws and their applications",
      "description": "Free-body diagrams, friction, inclined planes, connected bodies.",
      "links": [ { "label": "Slides", "url": "materials/lectures/L03-newton.pdf" } ]
    }
  ],

  "tutorials": [
    {
      "week": 1, "title": "Tutorial 1: Vectors and units",
      "description": "SAMPLE problem set. Solutions are released after the tutorial session.",
      "links": [
        { "label": "Problem sheet", "url": "materials/tutorials/T01.pdf" },
        { "label": "Solutions", "url": "materials/tutorials/T01-sol.pdf" }
      ]
    },
    {
      "week": 2, "title": "Tutorial 2: Kinematics",
      "description": "SAMPLE problem set on projectiles and relative motion.",
      "links": [ { "label": "Problem sheet", "url": "materials/tutorials/T02.pdf" } ]
    }
  ],

  "labs": [
    {
      "week": 1, "title": "Lab 1: Measurement and uncertainty",
      "description": "Vernier calipers, micrometer screw gauge, least count, propagation of errors.",
      "objective": "Measure the density of a metal cylinder and report it with its uncertainty.",
      "links": [
        { "label": "Lab manual", "url": "materials/labs/Lab01-manual.pdf" },
        { "label": "Data sheet", "url": "materials/labs/Lab01-datasheet.pdf" }
      ]
    },
    {
      "week": 2, "title": "Lab 2: Simple pendulum",
      "description": "Period versus length, linear fit of T² against L, estimate of g.",
      "objective": "Determine g from the slope of T² vs L to within 2%.",
      "links": [ { "label": "Lab manual", "url": "materials/labs/Lab02-manual.pdf" } ]
    }
  ],

  "demos": [
    {
      "title": "SAMPLE: Conservation of angular momentum",
      "description": "Rotating stool with dumbbells. Replace this link with your own recorded demonstration.",
      "topic": "Rotational dynamics",
      "video": "https://www.youtube.com/watch?v=REPLACE_ME"
    }
  ]
};
