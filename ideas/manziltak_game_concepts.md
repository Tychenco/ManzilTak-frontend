### Game 1: EcoSphere Guardians (Marine Biologist)

**Career Focus:** Marine Biologist  
**Core Tech Mechanic:** Players interact with an ecosystem grid by adding/removing species, adjusting resource levels, and monitoring for imbalances.  
**The Game Loop:** The objective is to maintain a healthy marine ecosystem over time. Players must balance species populations and resources (e.g., oxygen, food) while preventing disasters like algal blooms or overpopulation. Each turn, the player can add/remove species or adjust resources, with feedback on population health. Success is measured by long-term ecosystem stability.  
**Psychometric Mapping:**  
- **Strategic Thinking**: Measured by resource allocation and anticipation of disasters (e.g., adding plankton before a fish population spike).  
- **Adaptive Problem-Solving**: Assessed by the ability to respond to environmental changes, like sudden resource shortages or invasive species.  
- **Risk Management**: Evaluated through balancing resources without causing collapses; tracked via ecosystem health metrics.  

---

### Game 2: CyberSentinel (Ethical Hacker)

**Career Focus:** Ethical Hacker  
**Core Tech Mechanic:** Players defend a network by setting up firewalls, allocating resources to critical systems, and detecting vulnerabilities using logic gates.  
**The Game Loop:** The objective is to prevent hacking attempts on a secure system. Players use logic gates (AND, OR, NOT) to create firewalls, allocate energy/budget to defenses, and detect threats before they breach the system. Each turn, players see incoming attacks and must adjust defenses accordingly. Success is measured by preventing breaches while minimizing resource usage.  
**Psychometric Mapping:**  
- **Analytical Reasoning**: Tested by correctly identifying vulnerabilities and setting up effective firewalls (e.g., using OR gates to cover multiple attack vectors).  
- **Strategic Planning**: Assessed by efficiently allocating resources to critical systems without overspending.  
- **Decision-Making Under Pressure**: Evaluated through the ability to quickly identify threats and respond in real-time; tracked via breach frequency and resource usage.  

---

### Game 3: CityScape Architects (Urban Planner)

**Career Focus:** Urban Planner  
**Core Tech Mechanic:** Players design a city layout on a grid, allocating zones (residential, commercial, industrial) and managing infrastructure like roads and public transport.  
**The Game Loop:** The objective is to create a sustainable, thriving city that meets the needs of its inhabitants. Players must balance resource allocation (e.g., water, electricity), manage traffic flow, and address challenges like population growth or pollution. Each turn, players see feedback on city metrics (e.g., happiness, pollution levels) and adjust their plans accordingly. Success is measured by achieving a high quality of life while maintaining sustainability.  
**Psychometric Mapping:**  
- **Problem-Solving**: Tested by addressing challenges like traffic congestion or pollution through zoning decisions.  
- **Spatial Reasoning**: Assessed by effectively planning the city layout to optimize resource distribution and minimize negative externalities (e.g., placing industrial zones away from residential areas).  
- **Resource Management**: Evaluated through balancing infrastructure needs without overspending resources; tracked via city metrics and population growth trends.  

---

### JSON State Tracker Fields for Each Game:

#### EcoSphere Guardians:
```json
{
  "strategicThinking": number, // Resource allocation effectiveness (0-1)
  "adaptiveProblemSolving": number, // Success rate in addressing environmental changes (0-1)
  "riskManagement": number, // Ecosystem stability over time (0-1)
  "speciesInteractions": array, // History of species added/removed
  "resourceAdjustments": array, // History of resource changes
  "anticipationOfDisasters": number // Number of successful disaster preventions
}
```

#### CyberSentinel:
```json
{
  "analyticalReasoning": number, // Accuracy in setting up firewalls (0-1)
  "strategicPlanning": number, // Resource allocation efficiency (0-1)
  "decisionMakingUnderPressure": number, // Breach prevention success rate (0-1)
  "firewallSetup": array, // History of logic gates used
  "resourceAllocation": array, // History of energy/budget distribution
  "threatDetection": number // Number of threats detected before breaches
}
```

#### CityScape Architects:
```json
{
  "problemSolving": number, // Success in addressing challenges (0-1)
  "spatialReasoning": number, // Effectiveness of city layout planning (0-1)
  "resourceManagement": number, // Sustainability metrics over time (0-1)
  "zoneAllocation": array, // History of zone placements
  "infrastructurePlanning": array, // History of infrastructure decisions
  "challengeResponses": number // Number of challenges successfully addressed
}
```