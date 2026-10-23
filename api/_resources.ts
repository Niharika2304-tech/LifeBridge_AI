import type { VerifiedResource } from './_types.js';

export const VERIFIED_RESOURCES_INDIA: VerifiedResource[] = [
  // Health Resources (India)
  {
    name: 'National Emergency Ambulance Service',
    agency: 'Ministry of Health and Family Welfare, Govt. of India',
    category: 'health',
    contact: '108 (Emergency) / 102 (Maternal & Infant)',
    contactType: 'phone',
    url: 'https://www.nhp.gov.in/',
    note: 'Free 24x7 emergency medical transport and on-board paramedic triage across all Indian states and UTs.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'National Poison Information Centre (NPIC)',
    agency: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    category: 'health',
    contact: '1800-116-117 (Toll Free) / 011-26589391',
    contactType: 'phone',
    url: 'https://www.aiims.edu/',
    note: '24x7 specialized toxicological guidance for accidental ingestions, snakebites, chemical poisoning, and pesticide exposure in India.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'Tele-MANAS Mental Health Assistance',
    agency: 'Ministry of Health & Family Welfare, Govt. of India',
    category: 'health',
    contact: '14416 / 1800-891-4416',
    contactType: 'phone',
    url: 'https://telemanas.mohfw.gov.in/',
    note: '24/7 free national mental health counseling and crisis intervention available in multiple regional Indian languages.',
    verifiedBadge: true,
    region: 'india'
  },

  // Public Safety Resources (India)
  {
    name: 'National Emergency Response Support System (ERSS)',
    agency: 'Ministry of Home Affairs, Govt. of India',
    category: 'public_safety',
    contact: '112 (Single All-India Emergency Number)',
    contactType: 'phone',
    url: 'https://112.gov.in/',
    note: 'Unified 24x7 national emergency line connecting Police, Fire, Ambulance, and Disaster Management across India with real-time GPS dispatch.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'National Power Outage & Electrical Hazard Emergency',
    agency: 'Ministry of Power & State DISCOMs',
    category: 'public_safety',
    contact: '1912 (All-India Electricity Emergency)',
    contactType: 'phone',
    url: 'https://powermin.gov.in/',
    note: 'Dedicated 24x7 hotline for reporting downed live wires, sparking transformers, electrocution risks, and grid collapses.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'National Women Helpline',
    agency: 'Ministry of Women and Child Development, Govt. of India',
    category: 'public_safety',
    contact: '1091 (Police) / 181 (Women in Distress)',
    contactType: 'phone',
    url: 'https://wcd.nic.in/',
    note: 'Toll-free 24/7 emergency response, immediate police intervention, and legal assistance for women in distress.',
    verifiedBadge: true,
    region: 'india'
  },

  // Weather & Disaster Emergency (India)
  {
    name: 'India Meteorological Department (IMD)',
    agency: 'Ministry of Earth Sciences, Govt. of India',
    category: 'weather_emergency',
    contact: 'mausam.imd.gov.in',
    contactType: 'website',
    url: 'https://mausam.imd.gov.in/',
    note: 'Authoritative official source for real-time nowcasts, cyclone tracks, heavy rainfall warnings, and thunderstorm alerts across India.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'NDMA SACHET National Disaster Alert Portal',
    agency: 'National Disaster Management Authority (NDMA)',
    category: 'weather_emergency',
    contact: 'sachet.ndma.gov.in',
    contactType: 'website',
    url: 'https://sachet.ndma.gov.in/',
    note: 'Official pan-India early warning and disaster alert platform providing geo-targeted warnings for floods, landslides, cyclones, and heatwaves.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'National Disaster Response Force (NDRF) Control Room',
    agency: 'NDRF HQ / Ministry of Home Affairs',
    category: 'weather_emergency',
    contact: '011-24363260 / 1078 (Disaster Helpline)',
    contactType: 'phone',
    url: 'https://www.ndrf.gov.in/',
    note: 'India specialized disaster force for swift-water flood rescue, building collapse extraction, and cyclone response deployment.',
    verifiedBadge: true,
    region: 'india'
  },

  // Community Issue Resources (India)
  {
    name: 'National Swachhata & Civic Grievance Helpline',
    agency: 'Ministry of Housing and Urban Affairs, Govt. of India',
    category: 'community_issue',
    contact: '1969 / Swachhata Official App',
    contactType: 'phone',
    url: 'https://swachhbharaturban.gov.in/',
    note: 'Civic redressal channel for reporting contaminated municipal tap water, sewage overflows, open chemical dumping, and sanitation failures.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'Childline India / Mission Vatsalya',
    agency: 'Ministry of Women and Child Development, Govt. of India',
    category: 'community_issue',
    contact: '1098 (Toll Free 24/7)',
    contactType: 'phone',
    url: 'https://childlineindia.org/',
    note: 'Nationwide 24-hour emergency phone outreach service for children facing abandonment, lack of medical care, or malnutrition.',
    verifiedBadge: true,
    region: 'india'
  },
  {
    name: 'Senior Citizen National Helpline (Elderline)',
    agency: 'Ministry of Social Justice and Empowerment, Govt. of India',
    category: 'community_issue',
    contact: '14567 (Toll Free)',
    contactType: 'phone',
    url: 'https://socialjustice.gov.in/',
    note: 'Free helpline for elderly citizens requiring welfare checks, emotional support, rescue from neglect, and emergency civic assistance.',
    verifiedBadge: true,
    region: 'india'
  }
];

export const VERIFIED_RESOURCES_INTERNATIONAL: VerifiedResource[] = [
  // Health Resources (US/International)
  {
    name: 'Poison Help Hotline',
    agency: 'American Association of Poison Control Centers',
    category: 'health',
    contact: '1-800-222-1222',
    contactType: 'phone',
    url: 'https://www.poison.org',
    note: 'Free, confidential medical advice from toxicologists 24/7/365 for accidental ingestion, chemical exposure, or overdose.',
    verifiedBadge: true,
    region: 'international'
  },
  {
    name: '988 Suicide & Crisis Lifeline',
    agency: 'Substance Abuse and Mental Health Services Administration (SAMHSA)',
    category: 'health',
    contact: '988 (Call or Text)',
    contactType: 'phone',
    url: 'https://988lifeline.org',
    note: 'National 24/7 free support for emotional distress, mental health emergencies, or substance crises.',
    verifiedBadge: true,
    region: 'international'
  },
  {
    name: 'CDC Public Health Information',
    agency: 'Centers for Disease Control and Prevention',
    category: 'health',
    contact: '1-800-CDC-INFO (1-800-232-4636)',
    contactType: 'phone',
    url: 'https://www.cdc.gov',
    note: 'Official guidance on communicable outbreaks, heat illness symptoms, waterborne pathogens, and public health directives.',
    verifiedBadge: true,
    region: 'international'
  },

  // Public Safety Resources (US/International)
  {
    name: 'Non-Emergency Dispatch / Municipal Services',
    agency: 'Local Municipality & Police Non-Emergency',
    category: 'public_safety',
    contact: '311 (or local municipality directory)',
    contactType: 'phone',
    url: 'https://www.usa.gov/local-governments',
    note: 'For hazardous road conditions, non-injury property incidents, or public infrastructure hazards that do NOT present immediate threat to life.',
    verifiedBadge: true,
    region: 'international'
  },

  // Weather Emergency Resources (US/International)
  {
    name: 'National Weather Service (NWS)',
    agency: 'National Oceanic and Atmospheric Administration (NOAA)',
    category: 'weather_emergency',
    contact: 'weather.gov',
    contactType: 'website',
    url: 'https://www.weather.gov',
    note: 'Official real-time warnings, flash flood advisories, tornado tracks, and localized meteorological warnings.',
    verifiedBadge: true,
    region: 'international'
  },
  {
    name: 'FEMA / Ready.gov Disaster Assistance',
    agency: 'Federal Emergency Management Agency',
    category: 'weather_emergency',
    contact: 'Ready.gov / 1-800-621-3362',
    contactType: 'website',
    url: 'https://www.ready.gov',
    note: 'Authoritative preparedness checklists, shelter locators, and federal disaster recovery resources.',
    verifiedBadge: true,
    region: 'international'
  },
  {
    name: 'American Red Cross Disaster Services',
    agency: 'American Red Cross',
    category: 'weather_emergency',
    contact: '1-800-RED-CROSS (1-800-733-2767)',
    contactType: 'phone',
    url: 'https://www.redcross.org',
    note: 'Emergency shelter finder, disaster supply distribution, food relief, and family reunification support.',
    verifiedBadge: true,
    region: 'international'
  },

  // Community Issue Resources (US/International)
  {
    name: '211 Essential Community Services',
    agency: 'United Way Worldwide',
    category: 'community_issue',
    contact: '211 (Call or text 211.org)',
    contactType: 'phone',
    url: 'https://www.211.org',
    note: 'Confidential directory connecting residents to local food banks, warming/cooling centers, housing assistance, and utility relief.',
    verifiedBadge: true,
    region: 'international'
  }
];

export function getLocalizedResources(region: 'india' | 'international' | 'auto', category?: string): VerifiedResource[] {
  const list = region === 'international' ? VERIFIED_RESOURCES_INTERNATIONAL : VERIFIED_RESOURCES_INDIA;
  if (category && category !== 'auto') {
    const filtered = list.filter(r => r.category === category || r.category === 'general');
    if (filtered.length > 0) return filtered;
  }
  return list.slice(0, 4);
}
