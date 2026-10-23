
# LifeBridge AI 🌉
> **PromptWars H2H Hackathon Entry**  
> *“From confusion to clarity.”*

LifeBridge AI transforms chaotic, high-stress, real-world human reports into prioritized, structured, and verified action plans that benefit society.

---

## ⚡ What's New in this Upgrade
1. **Genuine Google Gemini Integration**:
   - Built with the official **`@google/genai`** SDK.
   - Powered by **Google Gemini 3.5 Flash** (with automatic graceful fallback to supported flash models).
   - Secure server-side endpoint (`/api/analyze`) ensuring `GEMINI_API_KEY` is **never exposed to browser bundles or logs**.
2. **Indian & Global Resource Localization**:
   - Tailored for Indian citizens and responders:
     - **All-in-One Emergency**: **112** (National Emergency Response Support System - [https://112.gov.in/](https://112.gov.in/))
     - **Severe Weather & Monsoons**: **India Meteorological Department (IMD)** ([https://mausam.imd.gov.in/](https://mausam.imd.gov.in/))
     - **Disaster Alerts**: **NDMA SACHET Portal** ([https://sachet.ndma.gov.in/](https://sachet.ndma.gov.in/))
     - **Specialized Rescue**: **National Disaster Response Force (NDRF)** (`011-24363260` / `1078`)
     - **Medical & Ambulance**: **108** (Emergency) / **102** (Maternal)
     - **Poison Information**: **National Poison Information Centre (NPIC AIIMS)** (`1800-116-117`)
     - **Power Grid & Live Wires**: **1912** (State DISCOM Emergency)
     - **Civic & Sanitation**: **1969** / Swachhata Municipal Grievance Portal
   - Strictly prevents displaying US-only numbers for Indian incidents.
3. **Preservation of Complete User Input & Unabbreviated Facts**:
   - Extracted facts display full addresses and parameters without truncation.
   - The complete original raw user input is preserved and expandable in the situation briefing.
4. **Honest Status & Error Reporting**:
   - Clear live indicators: **Gemini 3.5 Flash (Live)** vs. **Demo Mode (Key Needed)**.
   - If the API key is not configured or an API error occurs, LifeBridge AI displays an honest status notice and seamless fallback.

---

## 🚀 Quick Setup & How to Run

### Step 1: Start the Application
The server is already running, but you can start or restart it anytime:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### Step 2: Configure Your Google Gemini API Key
You can configure `GEMINI_API_KEY` in either of two simple ways:

#### Option A: Through the Web Interface (Easiest)
1. Open [http://localhost:3000](http://localhost:3000)
2. Click **Engine Settings** in the top navigation bar.
3. Paste your Gemini API key (from [Google AI Studio](https://aistudio.google.com/app/apikey)).
4. Click **Save to Server**. The key is saved directly to your `.env` file on the server without any terminal commands!

#### Option B: In the `.env` file
Add your key to the `.env` file in the project root:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
The server will automatically detect and use it for all future analyses.

---

## 🎨 Tested Core Domains
- 🩺 **Health Concern**: Heat stroke, delirium, acute poisoning, cardiac symptoms.
- 🛡️ **Public Safety**: Downed live conductors, arcing in water, school zone hazards.
- 🌧️ **Weather Emergency**: Urban flash floods, cloudbursts, trapped mobility-impaired residents.
- 👥 **Community Issue**: Sewage cross-contamination in drinking water, infant formula safety.

---

## 🔒 Security & Ethical AI Notice
- **Zero API Key Leaks**: `GEMINI_API_KEY` resides strictly in the Node.js server environment.
- **Zero Fabricated Emergency Contacts**: All phone numbers and URLs point to real, authentic government registries (112, 108, IMD, NDMA, 1912).
- **Assisting, Not Dispatching**: LifeBridge AI is an assistive structuring engine and does not claim direct CAD dispatch authority.
=======
# LifeBridge_AI

