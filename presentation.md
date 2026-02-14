---

# Benefits, Challenges, and Performance Analysis of a Scalable Web Architecture Based on Micro-Frontends

**Adrian Petcu, Madalin Frunzete, Dan Alexandru Stoichescu**

University "Politehnica" of Bucharest, Romania

U.P.B. Sci. Bull., Series C, Vol. 85, Iss. 3, 2023

---

# Table of Contents

1. Introduction
2. Architectural Overview: Monolith vs. Microservices
3. Micro-Frontends: Concept and Motivation
4. Composition Types and Splitting Strategies
5. Benefits of Micro-Frontend Architecture
6. Challenges of Micro-Frontend Architecture
7. Research Methodology and Implementation
8. Results: Performance Comparison
9. Thank You

---

# Introduction

- Web applications have evolved to support **parallel development** across multiple layers and teams
- The shift from **monolithic** to **microservice-based** architectures has transformed backend development
- Front-end applications lack a simple, scalable implementation pattern comparable to backend microservices
- **Micro-frontends** extend the microservice philosophy to the UI layer, enabling:
  - Independent development and deployment of front-end modules
  - Scalable and maintainable codebases
- **Objective:** Explore the benefits, challenges, and performance of a scalable architecture based on micro-frontends

---

# Architectural Overview: Monolith vs. Microservices

### Monolithic Architecture
- Single-tiered application; all components bundled and deployed as one unit
- Drawbacks: full redeployment for minor changes, growing build times, difficult maintenance, poor fault isolation, hard to adopt new technologies

### Microservices Architecture
- Small, autonomous services organized by sub-domain
- Each service is independently developed, deployed, and scaled
- Benefits: continuous delivery, independent feature development, improved fault isolation, technology freedom, faster testing

### Key Distinction
- Monoliths scale **vertically** (resource-intensive); microservices scale **horizontally** (on-demand, per service)

---

# Micro-Frontends: Concept and Motivation

- As backend logic migrates to microservices, **front-end monoliths grow larger** and harder to maintain
- Micro-frontends apply the **microservice paradigm to the UI layer**
  - The application is split into independent units based on functionality or domain
  - Each unit is owned end-to-end by a **cross-functional team**
- Loose coupling between micro-apps via **well-defined contracts**
- Micro-frontend units can be **reused** across multiple application suites
  - Example: a shared shopping cart component across e-commerce solutions
- Enables **technology agnosticism** — teams can choose their own frameworks

---

# Composition Types and Splitting Strategies

### Horizontal Split
- Multiple micro-frontends rendered on the **same page**
- Each team is responsible for a **section of the screen**
- Requires coordination between teams

### Vertical Split
- Each micro-frontend represents an **entire page**
- One team owns one page and its integration with other pages
- Simpler team boundaries

### Implementation Solutions
| Solution             | Description                                      |
|----------------------|--------------------------------------------------|
| **Routing**          | Each route maps to a different micro-frontend    |
| **Iframe**           | Micro-frontends embedded via frames              |
| **Web Components**   | Standardized, framework-agnostic browser APIs    |
| **Module Federation**| Dynamic loading of code and shared resources      |

---

# Benefits of Micro-Frontend Architecture

- **Incremental Updates**
  - Gradual migration from monolith; isolated experiments on parts of the application
- **Simple, Decoupled Codebases**
  - Smaller, focused repositories reduce complexity and code duplication
  - Shared styling and stateless utility libraries ensure consistency
- **Independent Deployments**
  - Each micro-frontend can be released without blocking the broader release cycle
  - Failures impact only one UI area; easy rollback
- **Autonomous Teams**
  - Cross-functional teams own their code quality, business logic, framework, and styling
  - Self-organizing delivery without constraints from a larger framework

---

# Challenges of Micro-Frontend Architecture

- **Inter-unit Communication**
  - A robust framework for coordinating events between separate application sections must be maintained
- **Backward Compatibility**
  - Modifications to the coordinator/shell application must not break existing micro-frontends
- **Standardized Contracts**
  - Well-defined, standardized inputs and outputs are required for communication between units
- **Centralized Communication**
  - Publisher/Subscriber pattern recommended for multi-component coordination
- **Bundle Size Control**
  - Framework core bundles should be instantiated only as needed, not duplicated per unit
- **Consistent Styling**
  - A shared styling library is essential to maintain visual consistency and reduce duplication

---

# Research Methodology and Implementation

### Approach
- Comprehensive literature review and analysis of existing micro-frontend solutions
- Evaluation of four solution types: **Routing, Iframe, Web Components, Module Federation**

### Evaluation Criteria
| Criterion        | Description                                           |
|------------------|-------------------------------------------------------|
| **First Paint**  | Time until the full page is visually displayed         |
| **Requests**     | Number of network requests made by the application     |
| **Resources**    | Total size of transferred network resources            |
| **Load Time**    | Time until all resources are fully loaded              |

### Implementation
- A simple web application was built using three approaches: **Monolith**, **Iframe**, and **Module Federation**
- Performance measured using Chrome DevTools inspection

---

# Results: Performance Comparison

### Quantitative Comparison

| Criterion      | Monolith | Iframe   | Module Federation |
|----------------|----------|----------|-------------------|
| First Paint    | 418 ms   | 1222 ms  | 540 ms            |
| Requests       | 13       | 34       | 26                |
| Resources      | 5.4 MB   | 16.6 MB  | 6.6 MB            |
| Load Time      | 1.35 s   | 1.12 s   | 0.774 s           |

### Key Findings
- **Module Federation** achieves a **55% decrease** in first paint time vs. Iframe
- **Bundle size reduced by 60%** in Module Federation compared to Iframe
- **Load time decreased by 42%** compared to Monolith and **30%** compared to Iframe
- **Number of requests reduced by 23%** compared to Iframe
- For larger applications, Module Federation is expected to **outperform the monolith** due to asynchronous module loading

---

# Thank You

**Questions?**

**Contact:** adrian.petcu@stud.etti.upb.ro

**Reference:**
Petcu, A., Frunzete, M., & Stoichescu, D. A. (2023). Benefits, Challenges, and Performance Analysis of a Scalable Web Architecture Based on Micro-Frontends. *U.P.B. Sci. Bull., Series C*, 85(3), 319--334.
