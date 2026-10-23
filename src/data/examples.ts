import type { ExampleScenario, AnalysisResult } from '../types.js';
import { VERIFIED_RESOURCES_INDIA, VERIFIED_RESOURCES_INTERNATIONAL } from './verifiedResources.js';

export const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    id: 'health-delhi-heat',
    category: 'health',
    title: 'Elderly Relative in Extreme Heatwave',
    contextTag: 'Delhi Heatwave / Acute Heat Stroke',
    summaryPreview: 'Elderly person in Old Delhi showing severe disorientation, dry burning skin, and no sweating in 46°C heat.',
    region: 'india',
    messyText: `Urgent advice needed please! My grandfather (78 yrs) at Daryaganj, Old Delhi is feeling extremely sick. It has been 46 degrees Celsius since noon and our cooler broke down. Around 3:15pm he started talking incoherently, calling me by his brother's name and complaining of intense throbbing headache. When I touched his forehead and arms, his skin is burning hot and completely bone dry—he has completely stopped sweating! He threw up some water and is now refusing to get up from the cot. He takes blood pressure pills (Amlodipine) but I can't reach our family doctor. Should I call 112 or take him to LNJP hospital in an auto rickshaw? Please guide immediately.`
  },
  {
    id: 'safety-sparking-wire',
    category: 'public_safety',
    title: 'Snapped Live Wire at Wet Metro Crossing',
    contextTag: '11KV Line / School Zone Pedestrians',
    summaryPreview: 'Live sparking wire submerged in rainwater near school and metro crossing during afternoon rush.',
    region: 'india',
    messyText: `DANGER! A tree limb snapped in heavy squalls 10 minutes ago near Indiranagar 100ft road close to the school crossing. A thick high-voltage wire fell across the road and is actively sparking with loud buzzing zaps into a large pool of standing rainwater on the asphalt! School buses and children on foot will be arriving in 15 minutes (around 2:45 PM). Two wheeler riders are foolishly trying to skirt around the puddle through the footpath. There are no barricades or traffic police here yet. Who do I alert first—the electricity board 1912, the school gate, or police emergency 112?`
  },
  {
    id: 'weather-mumbai-flooding',
    category: 'weather_emergency',
    title: 'Rapid Flash Inundation Near River Basin',
    contextTag: 'Severe Monsoon / Trapped Seniors',
    summaryPreview: 'Mithi river overflow rapidly rising past ground floor window sills with non-ambulatory seniors trapped inside.',
    region: 'india',
    messyText: `Water is rising dangerously fast near Kranti Nagar, Kurla along the Mithi river basin after non-stop torrential downpours since morning. The muddy water is already waist-deep (almost 3.5 feet) in our lane and has started gushing inside ground-floor chawls. An elderly couple at House #18—Sharma uncle who is bedridden post-stroke and his wife—are trapped inside with water touching the mattress level. Electricity to our transformer just tripped with a loud bang. Neighbors are trying to tie nylon ropes to wade across, but the current is fierce and open drains/gutter manhole covers might have floated away under the water. We need specialized rescue assistance right now!`
  },
  {
    id: 'community-water-contamination',
    category: 'community_issue',
    title: 'Contaminated Brown Tap Water in Apartment Block',
    contextTag: 'Infant Health / Civic Sanitation',
    summaryPreview: 'Foul sulfur odor and dark brown tap water affecting 150 flats; two infants sick with gastroenteritis.',
    region: 'india',
    messyText: `For the past 3 days, all residents across 150 flats in Sector 21 complex have noticed turbid yellowish-brown water with a pungent rotten-egg sewage smell coming from the main supply taps. Several mothers used this boiled water for preparing baby milk yesterday, and now two infants under 10 months have severe diarrhea and continuous vomiting. The society RWA secretary says municipal water pipeline has a leak near the main drain, but no tankers have arrived. Local grocery shops are out of 20L Bisleri cans and elderly residents cannot carry heavy cans. We need clean drinking water supply and medical guidance for the dehydrated infants immediately.`
  }
];

export const DEMO_ANALYSES: Record<string, AnalysisResult> = {
  'health-delhi-heat': {
    id: 'demo-health-delhi',
    timestamp: new Date().toISOString(),
    originalText: EXAMPLE_SCENARIOS[0].messyText,
    category: 'health',
    categoryReasoning: 'Critical clinical presentation of acute classical Heat Stroke (hyperthermia, altered mental status, cessation of sweating) under extreme ambient thermal stress (46°C).',
    situationSummary: 'A 78-year-old resident in Daryaganj, Old Delhi is suffering from life-threatening acute heat stroke with delirium, severe vomiting, and anhidrosis (dry burning skin without sweat) in 46°C ambient heat without cooling. This requires emergency paramedic resuscitation and hospital transfer via 112 / 108.',
    extractedFacts: [
      { label: 'Patient Identity', value: '78-year-old male grandfather (on antihypertensive Amlodipine)', confidence: 'high', category: 'people' },
      { label: 'Specific Location', value: 'Daryaganj, Old Delhi (Residence with malfunctioning air cooler)', confidence: 'high', category: 'location' },
      { label: 'Ambient Temperature', value: '46°C (Severe heatwave conditions)', confidence: 'high', category: 'hazard' },
      { label: 'Observed Clinical Signs', value: 'Altered mental status/confusion, bone-dry burning skin, absence of sweating, vomiting, inability to ambulate', confidence: 'high', category: 'hazard' },
      { label: 'Primary Diagnosis Risk', value: 'Acute Exertional/Classical Heat Stroke with multi-organ failure risk', confidence: 'high', category: 'hazard' }
    ],
    urgency: {
      level: 'critical',
      score: 9.6,
      explanation: 'Hot dry skin combined with delirium in 46°C ambient heat is the clinical hallmark of heat stroke, carrying high mortality within 30 minutes without rapid cooling and advanced medical management.',
      escalationTrigger: 'Loss of consciousness, generalized seizures, or shallow irregular breathing.'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'step-1',
          text: 'Dial 112 (National Emergency) or 108 (Ambulance) immediately. Request an AC Advanced Life Support ambulance for "Elderly patient with acute Heat Stroke and altered mental state."',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'First Observer'
        },
        {
          id: 'step-2',
          text: 'Initiate active evaporative cooling immediately: move patient to coolest shaded room, strip heavy clothes, apply wet towels or ice packs to neck, armpits, and groin, and fan vigorously.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Caregiver / Family'
        },
        {
          id: 'step-3',
          text: 'Do NOT force oral fluids or medicines while patient is confused or vomiting due to acute airway choking and aspiration pneumonia risks.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Caregiver'
        }
      ],
      shortTerm: [
        {
          id: 'step-4',
          text: 'Gather his prescription medicines (Amlodipine) and medical history folder to hand directly to the arriving 108 paramedic crew.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Family Member'
        },
        {
          id: 'step-5',
          text: 'If 108 ambulance is delayed, transport in an air-conditioned vehicle directly to the nearest emergency ward (e.g. LNJP Hospital Emergency or nearest tertiary trauma center).',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Family Member'
        }
      ],
      coordination: [
        {
          id: 'step-6',
          text: 'Consult National Poison & Medical Information (NPIC AIIMS: 1800-116-117) or Tele-MANAS (14416) for physician triage guidance if transit is prolonged.',
          timeframe: 'follow_up',
          priority: 3,
          targetRole: 'Care Coordinator'
        }
      ]
    },
    unknownOrUnverified: [
      'Exact internal core body temperature (fever exceeding 104°F / 40°C).',
      'Hydration volume consumed prior to decompensation.',
      'Underlying cardiac, renal, or diabetic comorbidities beyond hypertension.'
    ],
    verifiedResources: [
      VERIFIED_RESOURCES_INDIA[3], // 112
      VERIFIED_RESOURCES_INDIA[0], // 108 Ambulance
      VERIFIED_RESOURCES_INDIA[1], // NPIC AIIMS
      VERIFIED_RESOURCES_INDIA[7]  // IMD
    ],
    isDemoData: true,
    modelUsed: 'Demo Dataset (Configure GEMINI_API_KEY in .env for Live Gemini 3.5 Flash)',
    region: 'india'
  },

  'safety-sparking-wire': {
    id: 'demo-safety-bangalore',
    timestamp: new Date().toISOString(),
    originalText: EXAMPLE_SCENARIOS[1].messyText,
    category: 'public_safety',
    categoryReasoning: 'Direct electrocution hazard involving snapped overhead electrical conductor discharging active electrical arcs into standing conductive storm water near school pedestrian flow.',
    situationSummary: 'A high-voltage power line has fallen into a flooded pedestrian road on Indiranagar 100ft road near a school crossing, 15 minutes before school dismissal. Active electrical arcing in standing water creates an imminent mass casualty electrocution zone.',
    extractedFacts: [
      { label: 'Exact Hazard Location', value: 'Indiranagar 100ft Road, near Metro station and school crossing', confidence: 'high', category: 'location' },
      { label: 'Electrical Hazard', value: 'High-voltage cable down on wet asphalt; loud buzzing arcing and visible sparks', confidence: 'high', category: 'hazard' },
      { label: 'Conductive Condition', value: 'Large standing puddle connecting wire to footpath and roadway', confidence: 'high', category: 'hazard' },
      { label: 'Critical Time Constraint', value: 'School dismissal and heavy pedestrian flow in ~15 minutes (2:45 PM)', confidence: 'high', category: 'time' },
      { label: 'Immediate Public Risk', value: 'Two-wheelers and pedestrians attempting to bypass through footpath', confidence: 'high', category: 'hazard' }
    ],
    urgency: {
      level: 'critical',
      score: 9.8,
      explanation: 'High-voltage arcing in pooled water on a busy urban school corridor right at dismissal time creates an extreme risk of fatal step-potential shock.',
      escalationTrigger: 'Pedestrian steps into puddle within 15 meters of live conductor.'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'step-1',
          text: 'Immediately call 1912 (All-India Electricity Emergency) and 112 (Police ERSS). State: "Downed live sparking wire in water near school crossing on Indiranagar 100ft road, trip substation breaker immediately."',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'First Observer'
        },
        {
          id: 'step-2',
          text: 'Alert the school security guard or principal to halt student dismissal and keep all children inside school gates until power is confirmed cut.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Observer'
        },
        {
          id: 'step-3',
          text: 'Maintain at least 15 meters (50 feet) distance. Shout warnings to prevent all two-wheelers and walkers from entering the flooded patch.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Bystander'
        }
      ],
      shortTerm: [
        {
          id: 'step-4',
          text: 'Position makeshift dry barricades (wooden signs, dry chairs) well outside the 15m radius to redirect approaching traffic.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Traffic Marshall / Citizen'
        },
        {
          id: 'step-5',
          text: 'Confirm arrival of State DISCOM line crew and local traffic police to officially cordon both sides of the corridor.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Community Leader'
        }
      ],
      coordination: [
        {
          id: 'step-6',
          text: 'Ensure the school sends an urgent SMS notification to parents about route diversion and safe designated pick-up points.',
          timeframe: 'follow_up',
          priority: 3,
          targetRole: 'School Administration'
        }
      ]
    },
    unknownOrUnverified: [
      'Line voltage rating (11kV distribution vs. 440V domestic line).',
      'Whether the nearest feeder circuit breaker has auto-tripped or remains live.',
      'Underground metallic pipeline conductivity beneath the wet asphalt.'
    ],
    verifiedResources: [
      VERIFIED_RESOURCES_INDIA[4], // 1912 Electricity Emergency
      VERIFIED_RESOURCES_INDIA[3], // 112 ERSS
      VERIFIED_RESOURCES_INDIA[8]  // NDMA SACHET
    ],
    isDemoData: true,
    modelUsed: 'Demo Dataset (Configure GEMINI_API_KEY in .env for Live Gemini 3.5 Flash)',
    region: 'india'
  },

  'weather-mumbai-flooding': {
    id: 'demo-weather-mumbai',
    timestamp: new Date().toISOString(),
    originalText: EXAMPLE_SCENARIOS[2].messyText,
    category: 'weather_emergency',
    categoryReasoning: 'Monsoon flash flooding with localized river breach, inundated residential dwellings, power failure, and entrapment of non-ambulatory elderly citizens.',
    situationSummary: 'Flash floodwaters from Mithi river have reached 3.5 feet depth on Kranti Nagar, Kurla, entering ground-floor tenements. A bedridden elderly stroke patient and his wife are trapped in House #18 with rising water. High drowning and suction risks preclude civilian water wading.',
    extractedFacts: [
      { label: 'Exact Location', value: 'Kranti Nagar, Kurla near Mithi river basin, Mumbai', confidence: 'high', category: 'location' },
      { label: 'Water Depth', value: '3.5 feet (waist-deep) and rising into ground floor rooms', confidence: 'high', category: 'hazard' },
      { label: 'Vulnerable Parties', value: 'Bedridden elderly stroke patient (Sharma uncle) & wife at House #18', confidence: 'high', category: 'people' },
      { label: 'Hazard Complications', value: 'Local transformer outage/blackout; missing sewer manhole covers under murky water; swift current', confidence: 'high', category: 'hazard' },
      { label: 'Civilian Action Risk', value: 'Untrained residents attempting swift water crossing using nylon ropes', confidence: 'high', category: 'hazard' }
    ],
    urgency: {
      level: 'critical',
      score: 9.3,
      explanation: 'Rapidly rising water in ground-floor homes housing a bedridden individual presents immediate drowning risk. Moving flood water obscures open manholes, which create fatal suction vortices.',
      escalationTrigger: 'Water level reaches chest height or breaches window level with continued cloudburst.'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'step-1',
          text: 'Call 112 (Emergency) and NDRF Control Room (011-24363260 / 1078) immediately. Specify: "Bedridden non-ambulatory stroke patient trapped in waist-deep water inside House #18, Kranti Nagar, Kurla."',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'First Observer'
        },
        {
          id: 'step-2',
          text: 'Strongly stop neighbors from wading through swift brown water. Submerged open drain covers are common in Mumbai floods and cause fatal entrapment.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Community Leader'
        },
        {
          id: 'step-3',
          text: 'If Sharma family is audible from adjacent upper floor, instruct them to move patient to highest bed/table and keep heads elevated while awaiting rescue boat.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Neighbor'
        }
      ],
      shortTerm: [
        {
          id: 'step-4',
          text: 'Check IMD Radar nowcast (mausam.imd.gov.in) and NDMA SACHET (sachet.ndma.gov.in) for river discharge alerts and high tide timings.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Local Coordinator'
        },
        {
          id: 'step-5',
          text: 'Guide municipal disaster management personnel and arriving rescue rubber inflatables (NDRF/Fire Brigade) to the exact house location.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Neighborhood Volunteer'
        }
      ],
      coordination: [
        {
          id: 'step-6',
          text: 'Coordinate with BMC Disaster Management Ward Control Room for emergency shelter placement and dry clothing.',
          timeframe: 'follow_up',
          priority: 3,
          targetRole: 'Ward Volunteer'
        }
      ]
    },
    unknownOrUnverified: [
      'High tide crest time on Arabian Sea (which backs up Mithi river discharge).',
      'Availability of an upper loft or terrace access within House #18.',
      'Presence of floating debris or submerged chemical contamination.'
    ],
    verifiedResources: [
      VERIFIED_RESOURCES_INDIA[5], // NDRF
      VERIFIED_RESOURCES_INDIA[3], // 112 ERSS
      VERIFIED_RESOURCES_INDIA[6], // IMD
      VERIFIED_RESOURCES_INDIA[7]  // NDMA SACHET
    ],
    isDemoData: true,
    modelUsed: 'Demo Dataset (Configure GEMINI_API_KEY in .env for Live Gemini 3.5 Flash)',
    region: 'india'
  },

  'community-water-contamination': {
    id: 'demo-community-water',
    timestamp: new Date().toISOString(),
    originalText: EXAMPLE_SCENARIOS[3].messyText,
    category: 'community_issue',
    categoryReasoning: 'Municipal infrastructure breakdown causing cross-contamination of drinking water with raw sewage, resulting in pediatric waterborne morbidity across 150 households.',
    situationSummary: 'A 150-flat residential society in Sector 21 is suffering from severe tap water contamination (turbid yellow-brown water, hydrogen sulfide sewer odor) following a sewage line breach. Multiple infants have developed acute gastroenteritis and local bottled water supplies are exhausted.',
    extractedFacts: [
      { label: 'Affected Scale', value: '150 apartment flats at Sector 21 Residential Complex', confidence: 'high', category: 'location' },
      { label: 'Reported Morbidity', value: 'Two infants (<10 months) displaying severe diarrhea and continuous vomiting', confidence: 'high', category: 'hazard' },
      { label: 'Contaminant Indicators', value: 'Yellowish-brown turbidity, pungent rotten-egg hydrogen sulfide sewer odor', confidence: 'high', category: 'hazard' },
      { label: 'Supply Shortage', value: 'Nearest retail stores depleted of 20L potable water cans; senior citizens unable to haul cans', confidence: 'high', category: 'resource' },
      { label: 'Suspected Source', value: 'Municipal potable supply pipe breach adjacent to open municipal drain', confidence: 'medium', category: 'hazard' }
    ],
    urgency: {
      level: 'high',
      score: 8.5,
      explanation: 'Infants are actively displaying acute dehydration symptoms from sewage-contaminated water. Pediatric dehydration from waterborne pathogens can become life-threatening within 24 hours.',
      escalationTrigger: 'Infants displaying signs of sunken eyes, lethargy, or inability to retain Oral Rehydration Solution (ORS).'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'step-1',
          text: 'Have mothers of affected infants immediately administer Oral Rehydration Solution (ORS) or pedialyte, and consult a pediatrician or call National Poison Information (1800-116-117) / 108 if lethargic.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Caregiver / RWA'
        },
        {
          id: 'step-2',
          text: 'Issue an immediate DO NOT DRINK / DO NOT COOK emergency notice across all 150 flats via WhatsApp and lobby posters. Boiling DOES NOT remove chemical/sewage toxins.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'RWA President'
        },
        {
          id: 'step-3',
          text: 'Contact the Municipal Water Supply Executive Engineer and report acute waterborne illness cluster to District Health Officer.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'RWA Secretary'
        }
      ],
      shortTerm: [
        {
          id: 'step-4',
          text: 'Request emergency potable water tanker deployment via Municipal Corporation Helpline (1969 / Swachhata Portal).',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Community Representative'
        },
        {
          id: 'step-5',
          text: 'Collect and seal cold tap water samples in sterilized glass bottles with date and unit numbers for independent laboratory testing.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Resident Volunteer'
        }
      ],
      coordination: [
        {
          id: 'step-6',
          text: 'Log an official public health complaint with State Pollution Control Board and Municipal Public Health Department.',
          timeframe: 'follow_up',
          priority: 3,
          targetRole: 'Legal / Civic Advocate'
        }
      ]
    },
    unknownOrUnverified: [
      'Specific microbiological pathogens present (e.g. Vibrio cholerae, E. coli, Rotavirus) or heavy metals.',
      'Exact location of underground sewer cross-connection.',
      'Total number of adult residents currently experiencing milder gastrointestinal symptoms.'
    ],
    verifiedResources: [
      VERIFIED_RESOURCES_INDIA[1], // NPIC AIIMS
      VERIFIED_RESOURCES_INDIA[8], // Swachhata 1969
      VERIFIED_RESOURCES_INDIA[0], // 108 Ambulance
      VERIFIED_RESOURCES_INDIA[3]  // 112 ERSS
    ],
    isDemoData: true,
    modelUsed: 'Demo Dataset (Configure GEMINI_API_KEY in .env for Live Gemini 3.5 Flash)',
    region: 'india'
  }
};
