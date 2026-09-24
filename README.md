# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web application that helps professionals improve workplace productivity using AI. The application provides AI-powered tools for generating professional emails, summarising meeting notes, and creating prioritised work schedules.

## Project Overview

**AI Workplace Productivity Assistant** is designed to automate common workplace tasks and help professionals save time.

The application provides three core AI productivity tools:

* **Smart Email Generator** — Creates professional emails based on the user's purpose, recipient, key points, and preferred tone.
* **Meeting Notes Summarizer** — Converts lengthy meeting notes into concise summaries, decisions, action items, and deadlines.
* **AI Task Planner** — Organises tasks into practical daily or weekly schedules and prioritises work based on urgency and importance.

The application follows a clean SaaS dashboard design using a purple and dark-blue colour scheme and is fully responsive across desktop, tablet, and mobile devices.

## Features Implemented

### 📧 Smart Email Generator

* Generate professional workplace emails using AI
* Supports three tones:

  * Formal
  * Friendly
  * Persuasive
* User-provided email purpose, recipient, and key points
* Editable AI-generated output
* Copy generated email
* Regenerate response
* Clear output

### 📝 Meeting Notes Summarizer

* Paste lengthy meeting notes
* AI-generated meeting summary
* Extracts:

  * Key decisions
  * Action items
  * Deadlines
* Editable generated results
* Copy, regenerate, and clear functionality

### 📅 AI Task Planner

* Create daily or weekly work schedules
* Add tasks and deadlines
* Specify available working hours
* Prioritise tasks using AI
* Displays:

  * Priority
  * Task
  * Suggested time
  * Deadline
  * Reason for priority
* Editable generated schedule

### 🖥️ Dashboard

* Modern SaaS dashboard interface
* Sidebar navigation
* Responsive layout
* Feature cards for the three AI tools
* Clean professional UI
* Loading and error states

### 🤖 Responsible AI

The application includes a responsible AI disclaimer reminding users to review AI-generated content and avoid entering confidential or sensitive information.

> **Responsible AI:** AI-generated content should be reviewed before use. Do not enter confidential, personal, financial, customer, or sensitive company information. AI outputs may contain errors.

## Technologies and Tools Used

### Frontend

* **React** — Component-based user interface
* **TypeScript** — Type-safe development
* **Vite** — Frontend development and build tool
* **Tailwind CSS** — Responsive styling and UI design

### AI

* AI-powered structured prompts for:

  * Email generation
  * Meeting summarisation
  * Task planning
* User inputs are passed into prompts to generate contextual responses rather than fixed generic responses.

### Development Tools

* **Lovable** — AI-assisted application development
* **GitHub** — Source code management and project hosting
* **Git** — Version control

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/ai-workplace-productivity-assistant.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Open the Project

```bash
cd ai-workplace-productivity-assistant
```

### 3. Install Dependencies

Make sure you have **Node.js** installed.

Then run:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will start on a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser.

### 5. Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```text
ai-workplace-productivity-assistant/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Responsive Design

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

The sidebar and dashboard components adapt to smaller screen sizes for a better mobile experience.

## Responsible Use

AI-generated content can contain inaccuracies or inappropriate suggestions. Users should review all generated content before sending emails, making business decisions, or creating schedules.

Users should **never enter confidential company information, passwords, financial information, customer personal information, or other sensitive data** into the AI tools.

## Future Improvements

Potential future improvements include:

* User authentication
* Saved email templates
* Export meeting summaries
* Calendar integration
* Task reminders
* Productivity analytics
* Dark mode
* Custom AI prompt templates
* Integration with workplace applications

## License

This project is intended for educational and portfolio purposes.


