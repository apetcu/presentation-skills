const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");

// Icon imports
const {
  FaServer, FaCubes, FaPuzzlePiece, FaColumns, FaCheckCircle,
  FaExclamationTriangle, FaFlask, FaChartBar, FaEnvelope, FaGraduationCap
} = require("react-icons/fa");
const {
  MdDashboard, MdExtension, MdRocket, MdSecurity, MdCode, MdCompareArrows
} = require("react-icons/md");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Color palette: Ocean Gradient / Deep Academic Blue
const COLORS = {
  darkNavy: "0D1B2A",
  navy: "1B2838",
  deepBlue: "065A82",
  teal: "1C7293",
  accent: "21295C",
  white: "FFFFFF",
  offWhite: "F0F4F8",
  lightGray: "E2E8F0",
  medGray: "94A3B8",
  darkText: "1E293B",
  bodyText: "334155",
  cardBg: "FFFFFF",
  cardBorder: "CBD5E1",
  greenAccent: "059669",
  amberAccent: "D97706",
  redAccent: "DC2626",
};

const FONTS = {
  heading: "Georgia",
  body: "Calibri",
};

const IMG = {
  fig1: path.resolve(__dirname, "images/fig1_monolith_vs_micro.png"),
  fig2: path.resolve(__dirname, "images/fig2_cross_functional.png"),
  fig3: path.resolve(__dirname, "images/fig3_horizontal.png"),
  fig5: path.resolve(__dirname, "images/fig5_deployments.png"),
  fig6: path.resolve(__dirname, "images/fig6_team_ownership.png"),
  fig10: path.resolve(__dirname, "images/fig10_radar.png"),
};

function makeShadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.12 };
}

function addSlideNumber(slide, num) {
  slide.addText(String(num), {
    x: 9.2, y: 5.0, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray,
    align: "right", valign: "middle",
  });
}

function addFooterBar(slide) {
  slide.addShape(slide._slideLayout ? "rect" : "rect", {
    x: 0, y: 5.35, w: 10, h: 0.275,
    fill: { color: COLORS.deepBlue },
  });
}

// Workaround: addShape needs pres reference
let pres;

async function buildPresentation() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Adrian Petcu, Madalin Frunzete, Dan Alexandru Stoichescu";
  pres.title = "Benefits, Challenges, and Performance Analysis of a Scalable Web Architecture Based on Micro-Frontends";

  // Pre-render icons
  const iconServer = await iconToBase64Png(FaServer, "#" + COLORS.white);
  const iconCubes = await iconToBase64Png(FaCubes, "#" + COLORS.white);
  const iconPuzzle = await iconToBase64Png(FaPuzzlePiece, "#" + COLORS.white);
  const iconColumns = await iconToBase64Png(FaColumns, "#" + COLORS.white);
  const iconCheck = await iconToBase64Png(FaCheckCircle, "#" + COLORS.greenAccent);
  const iconWarn = await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.amberAccent);
  const iconFlask = await iconToBase64Png(FaFlask, "#" + COLORS.white);
  const iconChart = await iconToBase64Png(FaChartBar, "#" + COLORS.white);
  const iconGrad = await iconToBase64Png(FaGraduationCap, "#" + COLORS.white);
  const iconRocket = await iconToBase64Png(MdRocket, "#" + COLORS.white);
  const iconExtension = await iconToBase64Png(MdExtension, "#" + COLORS.white);
  const iconCompare = await iconToBase64Png(MdCompareArrows, "#" + COLORS.white);

  // TOC icons in teal
  const tocIconIntro = await iconToBase64Png(MdDashboard, "#" + COLORS.teal);
  const tocIconArch = await iconToBase64Png(FaServer, "#" + COLORS.teal);
  const tocIconMF = await iconToBase64Png(FaCubes, "#" + COLORS.teal);
  const tocIconComp = await iconToBase64Png(FaColumns, "#" + COLORS.teal);
  const tocIconBen = await iconToBase64Png(FaCheckCircle, "#" + COLORS.teal);
  const tocIconChal = await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.teal);
  const tocIconMeth = await iconToBase64Png(FaFlask, "#" + COLORS.teal);
  const tocIconRes = await iconToBase64Png(FaChartBar, "#" + COLORS.teal);
  const tocIconTY = await iconToBase64Png(FaGraduationCap, "#" + COLORS.teal);

  // Benefits icons
  const iconCheckGreen = await iconToBase64Png(FaCheckCircle, "#059669");
  const iconRocketTeal = await iconToBase64Png(MdRocket, "#" + COLORS.teal);
  const iconCodeTeal = await iconToBase64Png(MdCode, "#" + COLORS.teal);
  const iconExtTeal = await iconToBase64Png(MdExtension, "#" + COLORS.teal);

  // Challenges icons
  const iconWarnAmber = await iconToBase64Png(FaExclamationTriangle, "#D97706");
  const iconSecRed = await iconToBase64Png(MdSecurity, "#DC2626");

  // ==================== SLIDE 1: TITLE ====================
  const slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkNavy };

  // Top accent stripe
  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06, fill: { color: COLORS.teal },
  });

  // Icon cluster
  slide1.addImage({ data: iconCubes, x: 4.5, y: 0.6, w: 1, h: 1 });

  // Title
  slide1.addText("Benefits, Challenges, and\nPerformance Analysis of a Scalable\nWeb Architecture Based on\nMicro-Frontends", {
    x: 0.8, y: 1.7, w: 8.4, h: 1.8,
    fontSize: 28, fontFace: FONTS.heading, color: COLORS.white,
    align: "center", valign: "middle", bold: true,
    lineSpacingMultiple: 1.1,
  });

  // Divider line
  slide1.addShape(pres.shapes.LINE, {
    x: 3.5, y: 3.6, w: 3, h: 0,
    line: { color: COLORS.teal, width: 2 },
  });

  // Authors
  slide1.addText("Adrian Petcu, Madalin Frunzete, Dan Alexandru Stoichescu", {
    x: 1, y: 3.8, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray,
    align: "center",
  });

  // Affiliation
  slide1.addText("University \"Politehnica\" of Bucharest, Romania", {
    x: 1, y: 4.25, w: 8, h: 0.4,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray,
    align: "center", italic: true,
  });

  // Journal info
  slide1.addText("U.P.B. Sci. Bull., Series C, Vol. 85, Iss. 3, 2023", {
    x: 1, y: 4.65, w: 8, h: 0.35,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.teal,
    align: "center",
  });

  // Bottom accent stripe
  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.teal },
  });

  // ==================== SLIDE 2: TABLE OF CONTENTS ====================
  const slide2 = pres.addSlide();
  slide2.background = { color: COLORS.offWhite };

  // Title bar
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide2.addText("Table of Contents", {
    x: 0.7, y: 0, w: 8.6, h: 0.9,
    fontSize: 28, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  const tocItems = [
    { icon: tocIconIntro, text: "Introduction" },
    { icon: tocIconArch, text: "Architectural Overview: Monolith vs. Microservices" },
    { icon: tocIconMF, text: "Micro-Frontends: Concept and Motivation" },
    { icon: tocIconComp, text: "Composition Types and Splitting Strategies" },
    { icon: tocIconBen, text: "Benefits of Micro-Frontend Architecture" },
    { icon: tocIconChal, text: "Challenges of Micro-Frontend Architecture" },
    { icon: tocIconMeth, text: "Research Methodology and Implementation" },
    { icon: tocIconRes, text: "Results: Performance Comparison" },
    { icon: tocIconTY, text: "Thank You" },
  ];

  const tocStartY = 1.2;
  const tocRowH = 0.42;
  tocItems.forEach((item, i) => {
    // Number circle
    slide2.addShape(pres.shapes.OVAL, {
      x: 0.7, y: tocStartY + i * tocRowH, w: 0.3, h: 0.3,
      fill: { color: COLORS.deepBlue },
    });
    slide2.addText(String(i + 1), {
      x: 0.7, y: tocStartY + i * tocRowH, w: 0.3, h: 0.3,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Icon
    slide2.addImage({ data: item.icon, x: 1.15, y: tocStartY + i * tocRowH + 0.03, w: 0.24, h: 0.24 });
    // Text
    slide2.addText(item.text, {
      x: 1.55, y: tocStartY + i * tocRowH, w: 7.5, h: 0.32,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText,
      align: "left", valign: "middle", margin: 0,
    });
  });

  addSlideNumber(slide2, 2);
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 3: INTRODUCTION ====================
  const slide3 = pres.addSlide();
  slide3.background = { color: COLORS.offWhite };

  // Title bar
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide3.addImage({ data: iconRocket, x: 0.5, y: 0.17, w: 0.55, h: 0.55 });
  slide3.addText("Introduction", {
    x: 1.2, y: 0, w: 8, h: 0.9,
    fontSize: 28, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Bullet content
  const introBullets = [
    { text: "Web applications have evolved to support parallel development across multiple layers and teams", bold: "parallel development" },
    { text: "The shift from monolithic to microservice-based architectures has transformed backend development", bold: "microservice-based" },
    { text: "Front-end applications lack a simple, scalable implementation pattern comparable to backend microservices", bold: "" },
    { text: "Micro-frontends extend the microservice philosophy to the UI layer, enabling independent development and scalable codebases", bold: "Micro-frontends" },
  ];

  const bulletStartY = 1.2;
  const bulletH = 0.85;
  introBullets.forEach((item, i) => {
    // Card background
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: bulletStartY + i * bulletH, w: 8.8, h: 0.7,
      fill: { color: COLORS.cardBg },
      shadow: makeShadow(),
    });
    // Left accent bar
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: bulletStartY + i * bulletH, w: 0.06, h: 0.7,
      fill: { color: COLORS.teal },
    });
    // Text
    slide3.addText(item.text, {
      x: 0.85, y: bulletStartY + i * bulletH, w: 8.35, h: 0.7,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.bodyText,
      align: "left", valign: "middle", margin: [0, 5, 0, 5],
    });
  });

  // Objective card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.65, w: 8.8, h: 0.55,
    fill: { color: COLORS.deepBlue },
  });
  slide3.addText([
    { text: "Objective: ", options: { bold: true, color: COLORS.teal } },
    { text: "Explore the benefits, challenges, and performance of a scalable architecture based on micro-frontends", options: { color: COLORS.white } },
  ], {
    x: 0.85, y: 4.65, w: 8.35, h: 0.55,
    fontSize: 12, fontFace: FONTS.body,
    align: "left", valign: "middle", margin: [0, 5, 0, 5],
  });

  addSlideNumber(slide3, 3);
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 4: ARCHITECTURAL OVERVIEW ====================
  const slide4 = pres.addSlide();
  slide4.background = { color: COLORS.offWhite };

  // Title bar
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide4.addImage({ data: iconServer, x: 0.5, y: 0.17, w: 0.55, h: 0.55 });
  slide4.addText("Architectural Overview", {
    x: 1.2, y: 0, w: 8, h: 0.9,
    fontSize: 28, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Left column: two cards
  // Monolithic card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.15, w: 4.3, h: 1.7,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.15, w: 4.3, h: 0.4,
    fill: { color: COLORS.redAccent },
  });
  slide4.addText("Monolithic Architecture", {
    x: 0.65, y: 1.15, w: 4.0, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
  slide4.addText([
    { text: "Single-tiered application; all components bundled as one unit", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Full redeployment for minor changes", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Growing build times, difficult maintenance", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Poor fault isolation", options: { bullet: true, fontSize: 11 } },
  ], {
    x: 0.65, y: 1.65, w: 4.0, h: 1.1,
    fontFace: FONTS.body, color: COLORS.bodyText,
    align: "left", valign: "top", paraSpaceAfter: 4,
  });

  // Microservices card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.05, w: 4.3, h: 1.7,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.05, w: 4.3, h: 0.4,
    fill: { color: COLORS.greenAccent },
  });
  slide4.addText("Microservices Architecture", {
    x: 0.65, y: 3.05, w: 4.0, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.white,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
  slide4.addText([
    { text: "Small, autonomous services by sub-domain", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Independently developed, deployed, and scaled", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Continuous delivery, improved fault isolation", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Technology freedom per service", options: { bullet: true, fontSize: 11 } },
  ], {
    x: 0.65, y: 3.55, w: 4.0, h: 1.1,
    fontFace: FONTS.body, color: COLORS.bodyText,
    align: "left", valign: "top", paraSpaceAfter: 4,
  });

  // Right side: Figure 1
  slide4.addImage({
    path: IMG.fig1, x: 5.1, y: 1.15, w: 4.4, h: 2.85,
    sizing: { type: "contain", w: 4.4, h: 2.85 },
  });

  // Key distinction bar
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 4.2, w: 4.4, h: 0.55,
    fill: { color: COLORS.navy },
  });
  slide4.addImage({ data: iconCompare, x: 5.2, y: 4.27, w: 0.38, h: 0.38 });
  slide4.addText("Monoliths scale vertically; microservices scale horizontally", {
    x: 5.65, y: 4.2, w: 3.75, h: 0.55,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, italic: true,
    align: "left", valign: "middle", margin: 0,
  });

  // Caption
  slide4.addText("Figure 1. Monolith vs Microservice Architecture", {
    x: 5.1, y: 4.85, w: 4.4, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "center", valign: "middle",
  });

  addSlideNumber(slide4, 4);
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 5: MICRO-FRONTENDS CONCEPT ====================
  const slide5 = pres.addSlide();
  slide5.background = { color: COLORS.offWhite };

  // Title bar
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide5.addImage({ data: iconCubes, x: 0.5, y: 0.17, w: 0.55, h: 0.55 });
  slide5.addText("Micro-Frontends: Concept and Motivation", {
    x: 1.2, y: 0, w: 8.3, h: 0.9,
    fontSize: 24, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Left: bullet points
  const mfBullets = [
    "As backend migrates to microservices, front-end monoliths grow larger and harder to maintain",
    "Micro-frontends apply the microservice paradigm to the UI layer",
    "Application split into independent units by functionality or domain",
    "Each unit owned end-to-end by a cross-functional team",
    "Loose coupling via well-defined contracts",
    "Enables technology agnosticism across teams",
  ];

  const mfStartY = 1.15;
  mfBullets.forEach((text, i) => {
    slide5.addImage({ data: iconCheckGreen, x: 0.65, y: mfStartY + i * 0.6 + 0.06, w: 0.22, h: 0.22 });
    slide5.addText(text, {
      x: 1.0, y: mfStartY + i * 0.6, w: 4.2, h: 0.5,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.bodyText,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // Right: Figure 2 (cross-functional teams)
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 1.1, w: 4.1, h: 3.6,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide5.addImage({
    path: IMG.fig2, x: 5.65, y: 1.2, w: 3.8, h: 3.2,
    sizing: { type: "contain", w: 3.8, h: 3.2 },
  });
  slide5.addText("Figure 2. Cross-functional teams with micro-frontends", {
    x: 5.5, y: 4.4, w: 4.1, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "center",
  });

  addSlideNumber(slide5, 5);
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 6: COMPOSITION TYPES ====================
  const slide6 = pres.addSlide();
  slide6.background = { color: COLORS.offWhite };

  // Title bar
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide6.addImage({ data: iconColumns, x: 0.5, y: 0.17, w: 0.55, h: 0.55 });
  slide6.addText("Composition Types and Splitting Strategies", {
    x: 1.2, y: 0, w: 8.3, h: 0.9,
    fontSize: 24, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Left column: Horizontal + Vertical descriptions
  // Horizontal card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.5, h: 1.25,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 0.06, h: 1.25, fill: { color: COLORS.teal },
  });
  slide6.addText("Horizontal Split", {
    x: 0.75, y: 1.12, w: 4.1, h: 0.3,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.deepBlue,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
  slide6.addText([
    { text: "Multiple micro-frontends on the same page", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Each team responsible for a screen section", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Requires inter-team coordination", options: { bullet: true, fontSize: 10 } },
  ], {
    x: 0.75, y: 1.45, w: 4.1, h: 0.8,
    fontFace: FONTS.body, color: COLORS.bodyText,
    align: "left", valign: "top", paraSpaceAfter: 2,
  });

  // Vertical card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.5, h: 1.05,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 0.06, h: 1.05, fill: { color: COLORS.deepBlue },
  });
  slide6.addText("Vertical Split", {
    x: 0.75, y: 2.52, w: 4.1, h: 0.3,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.deepBlue,
    bold: true, align: "left", valign: "middle", margin: 0,
  });
  slide6.addText([
    { text: "Each micro-frontend represents an entire page", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Simpler team boundaries and ownership", options: { bullet: true, fontSize: 10 } },
  ], {
    x: 0.75, y: 2.85, w: 4.1, h: 0.6,
    fontFace: FONTS.body, color: COLORS.bodyText,
    align: "left", valign: "top", paraSpaceAfter: 2,
  });

  // Implementation solutions table
  const tableRows = [
    [
      { text: "Solution", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 11, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: "Description", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 11, fontFace: FONTS.body, align: "center", valign: "middle" } },
    ],
    [
      { text: "Routing", options: { bold: true, fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, fill: { color: COLORS.white } } },
      { text: "Each route maps to a different micro-frontend", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.bodyText, fill: { color: COLORS.white } } },
    ],
    [
      { text: "Iframe", options: { bold: true, fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, fill: { color: COLORS.offWhite } } },
      { text: "Micro-frontends embedded via frames", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.bodyText, fill: { color: COLORS.offWhite } } },
    ],
    [
      { text: "Web Components", options: { bold: true, fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, fill: { color: COLORS.white } } },
      { text: "Framework-agnostic browser APIs", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.bodyText, fill: { color: COLORS.white } } },
    ],
    [
      { text: "Module Federation", options: { bold: true, fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, fill: { color: COLORS.offWhite } } },
      { text: "Dynamic loading of code and shared resources", options: { fontSize: 10, fontFace: FONTS.body, color: COLORS.bodyText, fill: { color: COLORS.offWhite } } },
    ],
  ];
  slide6.addTable(tableRows, {
    x: 0.5, y: 3.7, w: 4.5, h: 1.1,
    border: { pt: 0.5, color: COLORS.cardBorder },
    colW: [1.6, 2.9],
  });

  // Right: Figure 3
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.1, w: 4.3, h: 4.1,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addImage({
    path: IMG.fig3, x: 5.45, y: 1.2, w: 4.0, h: 3.7,
    sizing: { type: "contain", w: 4.0, h: 3.7 },
  });
  slide6.addText("Figure 3. Horizontal splitting", {
    x: 5.3, y: 4.85, w: 4.3, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "center",
  });

  addSlideNumber(slide6, 6);
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 7: BENEFITS ====================
  const slide7 = pres.addSlide();
  slide7.background = { color: COLORS.offWhite };

  // Title bar
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide7.addImage({ data: iconCheck, x: 0.55, y: 0.2, w: 0.5, h: 0.5 });
  slide7.addText("Benefits of Micro-Frontend Architecture", {
    x: 1.2, y: 0, w: 8.3, h: 0.9,
    fontSize: 24, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // 2x2 grid of benefit cards
  const benefits = [
    { title: "Incremental Updates", icon: iconRocketTeal, desc: "Gradual migration from monolith; isolated experiments on parts of the application" },
    { title: "Decoupled Codebases", icon: iconCodeTeal, desc: "Smaller, focused repositories reduce complexity and code duplication" },
    { title: "Independent Deployments", icon: iconExtTeal, desc: "Each micro-frontend released independently; failures impact only one UI area" },
    { title: "Autonomous Teams", icon: iconCheckGreen, desc: "Cross-functional teams own code quality, business logic, framework, and styling" },
  ];

  benefits.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 0.5 + col * 4.7;
    const by = 1.15 + row * 1.65;

    // Card
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: by, w: 4.4, h: 1.4,
      fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide7.addShape(pres.shapes.OVAL, {
      x: bx + 0.2, y: by + 0.2, w: 0.55, h: 0.55,
      fill: { color: COLORS.offWhite },
    });
    slide7.addImage({ data: b.icon, x: bx + 0.3, y: by + 0.3, w: 0.35, h: 0.35 });
    // Title
    slide7.addText(b.title, {
      x: bx + 0.9, y: by + 0.15, w: 3.3, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.deepBlue,
      bold: true, align: "left", valign: "middle", margin: 0,
    });
    // Description
    slide7.addText(b.desc, {
      x: bx + 0.9, y: by + 0.6, w: 3.3, h: 0.65,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.bodyText,
      align: "left", valign: "top", margin: 0,
    });
  });

  // Figure 5 centered at the bottom
  slide7.addImage({
    path: IMG.fig5, x: 1.0, y: 4.45, w: 5.5, h: 0.8,
    sizing: { type: "contain", w: 5.5, h: 0.8 },
  });
  slide7.addText("Figure 5. Independent deployments", {
    x: 6.5, y: 4.65, w: 3.0, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "left", valign: "middle",
  });

  addSlideNumber(slide7, 7);
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 8: CHALLENGES ====================
  const slide8 = pres.addSlide();
  slide8.background = { color: COLORS.offWhite };

  // Title bar
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide8.addImage({ data: iconWarn, x: 0.55, y: 0.2, w: 0.5, h: 0.5 });
  slide8.addText("Challenges of Micro-Frontend Architecture", {
    x: 1.2, y: 0, w: 8.3, h: 0.9,
    fontSize: 24, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Left side: challenge items
  const challenges = [
    { title: "Inter-unit Communication", desc: "Robust framework for coordinating events between separate sections" },
    { title: "Backward Compatibility", desc: "Shell application modifications must not break existing micro-frontends" },
    { title: "Standardized Contracts", desc: "Well-defined inputs and outputs for inter-unit communication" },
    { title: "Centralized Communication", desc: "Publisher/Subscriber pattern for multi-component coordination" },
    { title: "Bundle Size Control", desc: "Framework core instantiated only as needed, not duplicated per unit" },
    { title: "Consistent Styling", desc: "Shared styling library for visual consistency across all units" },
  ];

  challenges.forEach((c, i) => {
    const cy = 1.1 + i * 0.68;
    slide8.addImage({ data: iconWarnAmber, x: 0.6, y: cy + 0.05, w: 0.22, h: 0.22 });
    slide8.addText([
      { text: c.title, options: { bold: true, color: COLORS.darkText, fontSize: 12, breakLine: true } },
      { text: c.desc, options: { color: COLORS.bodyText, fontSize: 10 } },
    ], {
      x: 0.95, y: cy, w: 4.3, h: 0.6,
      fontFace: FONTS.body, align: "left", valign: "top", margin: 0, paraSpaceAfter: 2,
    });
  });

  // Right: Figure 6
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 1.1, w: 4.1, h: 3.6,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide8.addImage({
    path: IMG.fig6, x: 5.65, y: 1.25, w: 3.8, h: 3.1,
    sizing: { type: "contain", w: 3.8, h: 3.1 },
  });
  slide8.addText("Figure 6. Team ownership", {
    x: 5.5, y: 4.4, w: 4.1, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "center",
  });

  addSlideNumber(slide8, 8);
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 9: RESULTS ====================
  const slide9 = pres.addSlide();
  slide9.background = { color: COLORS.offWhite };

  // Title bar
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.deepBlue },
  });
  slide9.addImage({ data: iconChart, x: 0.5, y: 0.17, w: 0.55, h: 0.55 });
  slide9.addText("Results: Performance Comparison", {
    x: 1.2, y: 0, w: 8.3, h: 0.9,
    fontSize: 26, fontFace: FONTS.heading, color: COLORS.white,
    align: "left", valign: "middle", bold: true, margin: 0,
  });

  // Performance table
  const resultTableRows = [
    [
      { text: "Criterion", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: "Monolith", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: "Iframe", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center", valign: "middle" } },
      { text: "Module Fed.", options: { fill: { color: COLORS.deepBlue }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center", valign: "middle" } },
    ],
    [
      { text: "First Paint", options: { bold: true, fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.darkText } },
      { text: "418 ms", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.bodyText, align: "center" } },
      { text: "1222 ms", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.redAccent, align: "center", bold: true } },
      { text: "540 ms", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.bodyText, align: "center" } },
    ],
    [
      { text: "Requests", options: { bold: true, fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.darkText } },
      { text: "13", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.greenAccent, align: "center", bold: true } },
      { text: "34", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.redAccent, align: "center", bold: true } },
      { text: "26", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.bodyText, align: "center" } },
    ],
    [
      { text: "Resources", options: { bold: true, fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.darkText } },
      { text: "5.4 MB", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.greenAccent, align: "center", bold: true } },
      { text: "16.6 MB", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.redAccent, align: "center", bold: true } },
      { text: "6.6 MB", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: COLORS.white }, color: COLORS.bodyText, align: "center" } },
    ],
    [
      { text: "Load Time", options: { bold: true, fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.darkText } },
      { text: "1.35 s", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.bodyText, align: "center" } },
      { text: "1.12 s", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.bodyText, align: "center" } },
      { text: "0.774 s", options: { fontSize: 11, fontFace: FONTS.body, fill: { color: "F8FAFC" }, color: COLORS.greenAccent, align: "center", bold: true } },
    ],
  ];
  slide9.addTable(resultTableRows, {
    x: 0.5, y: 1.1, w: 5.0, h: 1.8,
    border: { pt: 0.5, color: COLORS.cardBorder },
    colW: [1.3, 1.2, 1.2, 1.3],
  });

  // Key findings
  slide9.addText("Key Findings", {
    x: 0.5, y: 3.1, w: 5.0, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.deepBlue,
    bold: true, align: "left", valign: "middle", margin: 0,
  });

  const findings = [
    { stat: "-55%", label: "first paint time vs. Iframe" },
    { stat: "-60%", label: "bundle size vs. Iframe" },
    { stat: "-42%", label: "load time vs. Monolith" },
    { stat: "-23%", label: "requests vs. Iframe" },
  ];

  findings.forEach((f, i) => {
    const fx = 0.5 + i * 1.25;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: fx, y: 3.55, w: 1.15, h: 1.1,
      fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addText(f.stat, {
      x: fx, y: 3.6, w: 1.15, h: 0.5,
      fontSize: 22, fontFace: FONTS.heading, color: COLORS.greenAccent,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide9.addText(f.label, {
      x: fx + 0.05, y: 4.1, w: 1.05, h: 0.45,
      fontSize: 8, fontFace: FONTS.body, color: COLORS.bodyText,
      align: "center", valign: "top", margin: 0,
    });
  });

  // Conclusion bar
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.8, w: 5.0, h: 0.4,
    fill: { color: COLORS.navy },
  });
  slide9.addText("Module Federation expected to outperform monolith for larger applications", {
    x: 0.65, y: 4.8, w: 4.7, h: 0.4,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, italic: true,
    align: "left", valign: "middle", margin: 0,
  });

  // Right: Figure 10 radar chart
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 5.8, y: 1.1, w: 3.8, h: 4.1,
    fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide9.addImage({
    path: IMG.fig10, x: 5.95, y: 1.2, w: 3.5, h: 3.7,
    sizing: { type: "contain", w: 3.5, h: 3.7 },
  });
  slide9.addText("Figure 10. Relative comparison between solutions", {
    x: 5.8, y: 4.85, w: 3.8, h: 0.3,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, italic: true,
    align: "center",
  });

  addSlideNumber(slide9, 9);
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.deepBlue },
  });

  // ==================== SLIDE 10: THANK YOU ====================
  const slide10 = pres.addSlide();
  slide10.background = { color: COLORS.darkNavy };

  // Top accent stripe
  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06, fill: { color: COLORS.teal },
  });

  // Graduation cap icon
  slide10.addImage({ data: iconGrad, x: 4.5, y: 1.0, w: 1.0, h: 1.0 });

  // Thank You text
  slide10.addText("Thank You", {
    x: 1, y: 2.1, w: 8, h: 0.8,
    fontSize: 44, fontFace: FONTS.heading, color: COLORS.white,
    align: "center", valign: "middle", bold: true,
  });

  // Questions
  slide10.addText("Questions?", {
    x: 1, y: 2.9, w: 8, h: 0.5,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.teal,
    align: "center", valign: "middle", italic: true,
  });

  // Divider
  slide10.addShape(pres.shapes.LINE, {
    x: 3.5, y: 3.6, w: 3, h: 0,
    line: { color: COLORS.teal, width: 1.5 },
  });

  // Contact
  slide10.addImage({ data: await iconToBase64Png(FaEnvelope, "#" + COLORS.teal), x: 4.05, y: 3.85, w: 0.3, h: 0.3 });
  slide10.addText("adrian.petcu@stud.etti.upb.ro", {
    x: 4.4, y: 3.85, w: 4, h: 0.3,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.medGray,
    align: "left", valign: "middle", margin: 0,
  });

  // Reference
  slide10.addText("Petcu, A., Frunzete, M., & Stoichescu, D. A. (2023).\nU.P.B. Sci. Bull., Series C, 85(3), 319\u2013334.", {
    x: 1.5, y: 4.4, w: 7, h: 0.6,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray,
    align: "center", valign: "middle", italic: true,
  });

  // Bottom accent stripe
  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: COLORS.teal },
  });

  // Write file
  await pres.writeFile({ fileName: path.resolve(__dirname, "presentation.pptx") });
  console.log("Presentation saved to presentation.pptx");
}

buildPresentation().catch(err => {
  console.error("Error building presentation:", err);
  process.exit(1);
});
