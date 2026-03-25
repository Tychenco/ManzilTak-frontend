### Game 1: "Quantum Circuit"

**Career Focus:**  
Quantum Algorithm Designer  

**Abstract Tech Mechanic:**  
Manipulate quantum circuits by adjusting qubits in a grid-based system. Use probability gates to balance entanglement and interference states across the grid. Solve puzzles by achieving target probability distributions for specific qubit states.

**The Game Loop:**  
1. Start with an empty grid of qubits.
2. Add probability gates (e.g., Hadamard, CNOT) to create quantum circuits.
3. Use touch/drag controls to adjust gate parameters in real-time.
4. Observe interference patterns and entanglement metrics as the circuit evolves.
5. Score is based on how closely final probabilities match target distribution.

**Psychometric Mapping:**  
- **Problem Solving Under Uncertainty**: Ability to manage probabilistic outcomes while balancing multiple variables.
- **Attention to Detail**: Precision in gate placement and parameter adjustments.
- **Strategic Planning**: Capacity to visualize long-term circuit evolution.  

**JSON State Tracker Schema:**  
```json
{
  "qubitGrid": [
    { "id": number, "state": string, "entanglement": number },
    ...
  ],
  "probabilityGates": [
    { "type": string, "parameters": { ... } },
    ...
  ],
  "currentScore": number,
  "movesMade": number,
  "timeElapsed": number
}
```

### Game 2: "LedgerFlow"

**Career Focus:**  
Supply Chain Forensic Auditor  

**Abstract Tech Mechanic:**  
Trace discrepancies in a global supply chain ledger by balancing value flows across interconnected nodes. Use discrepancy triangulation to identify and correct anomalies in real-time.

**The Game Loop:**  
1. Start with a network of interconnected supply chain nodes.
2. Monitor node values (e.g., inventory, transactions) in real-time.
3. Identify discrepancies using a heat map overlay.
4. Use touch/keyboard controls to audit specific nodes or adjust flow parameters.
5. Score based on how quickly and accurately discrepancies are resolved.

**Psychometric Mapping:**  
- **Analytical Skills**: Ability to identify patterns in complex systems under time pressure.
- **Pattern Recognition**: Capacity to detect subtle anomalies among numerous variables.
- **Attention to Detail**: Precision in tracing value flows across interconnected nodes.  

**JSON State Tracker Schema:**  
```json
{
  "nodeNetwork": [
    { "id": number, "value": number, "connections": [number] },
    ...
  ],
  "discrepanciesFound": number,
  "timeElapsed": number,
  "movesMade": number,
  "score": number
}
```

### Game 3: "NeuroSync"

**Career Focus:**  
Neuro-prosthetics Calibrator  

**Abstract Tech Mechanic:**  
Calibrate neural signal filters in real-time by balancing frequency, amplitude, and timing parameters across a grid of synaptic connections.

**The Game Loop:**  
1. Start with a baseline grid of neural signals.
2. Use touch/keyboard controls to adjust filter settings.
3. Monitor output metrics (e.g., signal-to-noise ratio).
4. Solve puzzles by achieving target output states within time limits.
5. Score based on how closely outputs match targets.

**Psychometric Mapping:**  
- **Precision Under Pressure**: Ability to make fine adjustments while managing multiple variables simultaneously.
- **Adaptability**: Capacity to adjust strategies in response to changing signal patterns.
- **Multitasking Skills**: Simultaneously manage frequency, amplitude, and timing parameters.  

**JSON State Tracker Schema:**  
```json
{
  "signalGrid": [
    { "id": number, "frequency": number, "amplitude": number },
    ...
  ],
  "filterSettings": {
    "frequencyRange": [number, number],
    "amplitudeThreshold": number,
    "timingWindow": number
  },
  "currentScore": number,
  "movesMade": number,
  "timeElapsed": number
}
```