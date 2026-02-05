import React, { useState } from 'react';
import './App.css';

function App() {
  const [capacity, setCapacity] = useState('');
  const [items, setItems] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [dpTable, setDpTable] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSolving, setIsSolving] = useState(false);
    console.log(dpTable);


  // Add Item to List
  const addItem = () => {
    const weight = parseInt(currentWeight);
    const value = parseInt(currentValue);

    if (isNaN(weight) || isNaN(value) || weight <= 0 || value <= 0) {
      alert('Please enter valid positive numbers for weight and value');
      return;
    }

    setItems([...items, { id: Date.now(), weight, value }]);
    setCurrentWeight('');
    setCurrentValue('');
  };

  // Remove Item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Main Knapsack DP Algorithm with Step-by-Step Visualization
  const solveKnapsack = () => {
    const W = parseInt(capacity);
    
    if (isNaN(W) || W <= 0) {
      alert('Please enter valid capacity');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    setIsSolving(true);
    const n = items.length;
    const weights = items.map(item => item.weight);
    const values = items.map(item => item.value);

    // Initialize DP table
    const dp = Array(n + 1).fill(null).map(() => Array(W + 1).fill(0));
    const stepsList = [];

    // Initial state
    stepsList.push({
      stepNumber: 0,
      description: `Starting 0/1 Knapsack: ${n} items, capacity ${W}`,
      dpTable: JSON.parse(JSON.stringify(dp)),
      currentCell: null,
      decision: null,
      highlight: 'start'
    });

    // Fill DP table with steps
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        const itemIndex = i - 1;
        const itemWeight = weights[itemIndex];
        const itemValue = values[itemIndex];

        if (itemWeight > w) {
          // Item too heavy, can't include
          dp[i][w] = dp[i - 1][w];
          stepsList.push({
            stepNumber: stepsList.length,
            description: `Item ${i} (w=${itemWeight}, v=${itemValue}): Too heavy for capacity ${w} → Skip`,
            dpTable: JSON.parse(JSON.stringify(dp)),
            currentCell: { i, w },
            decision: 'exclude',
            highlight: 'too-heavy',
            calculation: `dp[${i}][${w}] = dp[${i-1}][${w}] = ${dp[i][w]}`
          });
        } else {
          // Can include item, choose max
          const exclude = dp[i - 1][w];
          const include = itemValue + dp[i - 1][w - itemWeight];

          if (include > exclude) {
            dp[i][w] = include;
            stepsList.push({
              stepNumber: stepsList.length,
              description: `Item ${i} (w=${itemWeight}, v=${itemValue}): Include (${include} > ${exclude})`,
              dpTable: JSON.parse(JSON.stringify(dp)),
              currentCell: { i, w },
              decision: 'include',
              highlight: 'include',
              calculation: `dp[${i}][${w}] = max(${exclude}, ${itemValue} + ${dp[i-1][w-itemWeight]}) = ${include}`
            });
          } else {
            dp[i][w] = exclude;
            stepsList.push({
              stepNumber: stepsList.length,
              description: `Item ${i} (w=${itemWeight}, v=${itemValue}): Exclude (${exclude} >= ${include})`,
              dpTable: JSON.parse(JSON.stringify(dp)),
              currentCell: { i, w },
              decision: 'exclude',
              highlight: 'exclude',
              calculation: `dp[${i}][${w}] = max(${exclude}, ${include}) = ${exclude}`
            });
          }
        }
      }
    }

    // Final result
    const maxValue = dp[n][W];

    // Backtrack to find selected items
    const selected = [];
    let w = W;
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(i - 1); // Item index
        w -= weights[i - 1];
      }
    }

    stepsList.push({
      stepNumber: stepsList.length,
      description: `✓ Solution Found: Maximum Value = ${maxValue}`,
      dpTable: JSON.parse(JSON.stringify(dp)),
      currentCell: { i: n, w: W },
      decision: 'final',
      highlight: 'final',
      calculation: `Answer: ${maxValue}`
    });

    setDpTable(dp);
    setSteps(stepsList);
    setCurrentStep(0);
    setResult(maxValue);
    setSelectedItems(selected.reverse());
    setIsSolving(false);
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAll = () => {
    setCapacity('');
    setItems([]);
    setCurrentWeight('');
    setCurrentValue('');
    setDpTable([]);
    setSteps([]);
    setCurrentStep(0);
    setResult(null);
    setSelectedItems([]);
  };

  const resetSolution = () => {
    setDpTable([]);
    setSteps([]);
    setCurrentStep(0);
    setResult(null);
    setSelectedItems([]);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>🎒 0/1 Knapsack Problem Solver</h1>
        <p className="subtitle">Dynamic Programming Visualization - DAA College Project</p>
      </header>

      <div className="container">
        {/* Input Section */}
        <div className="section input-section">
          <h2>📝 Problem Input</h2>
          
          <div className="capacity-input">
            <label>Knapsack Capacity (W):</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter maximum weight (e.g., 50)"
              min="1"
            />
          </div>

          <div className="item-input">
            <h3>Add Items:</h3>
            <div className="input-row">
              <div className="input-group">
                <label>Weight:</label>
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="Weight"
                  min="1"
                />
              </div>
              <div className="input-group">
                <label>Value:</label>
                <input
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="Value"
                  min="1"
                />
              </div>
              <button className="add-btn" onClick={addItem}>
                ➕ Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="items-list">
              <h3>Items Added: ({items.length})</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item #</th>
                    <th>Weight</th>
                    <th>Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td>Item {index + 1}</td>
                      <td>{item.weight} kg</td>
                      <td>₹{item.value}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="solve-btn"
              onClick={solveKnapsack}
              disabled={isSolving || items.length === 0 || !capacity}
            >
              {isSolving ? '⏳ Solving...' : '🚀 Solve Knapsack'}
            </button>
            <button className="reset-btn" onClick={resetAll}>
              🔄 Reset All
            </button>
          </div>
        </div>

        {/* Visualization Section */}
        {steps.length > 0 && (
          <>
            <div className="section visualization-section">
              <h2>📊 Step-by-Step Visualization</h2>

              {/* Step Info */}
              <div className="step-info">
                <div className="step-header">
                  <h3>Step {currentStep + 1} of {steps.length}</h3>
                  <div className="complexity-badges">
                    <span className="badge time">⏱️ Time: O(n×W)</span>
                    <span className="badge space">💾 Space: O(n×W)</span>
                  </div>
                </div>
                <p className="step-description">{steps[currentStep].description}</p>
                {steps[currentStep].calculation && (
                  <p className="step-calculation">
                    <strong>Calculation:</strong> {steps[currentStep].calculation}
                  </p>
                )}
              </div>

              {/* DP Table */}
              <div className="dp-table-container">
                <h3>Dynamic Programming Table:</h3>
                <div className="table-wrapper">
                  <table className="dp-table">
                    <thead>
                      <tr>
                        <th>Items \ Capacity</th>
                        {steps[currentStep].dpTable[0].map((_, w) => (
                          <th key={w}>{w}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {steps[currentStep].dpTable.map((row, i) => (
                        <tr key={i}>
                          <td className="row-header">
                            {i === 0 ? 'Base' : `Item ${i}`}
                          </td>
                          {row.map((cell, w) => {
                            const isCurrent =
                              steps[currentStep].currentCell &&
                              steps[currentStep].currentCell.i === i &&
                              steps[currentStep].currentCell.w === w;
                            
                            return (
                              <td
                                key={w}
                                className={`cell ${isCurrent ? 'current-cell' : ''} ${
                                  isCurrent ? steps[currentStep].highlight : ''
                                }`}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="navigation-controls">
                <button
                  className="nav-btn"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  ⬅️ Previous
                </button>
                <span className="step-counter">
                  {currentStep + 1} / {steps.length}
                </span>
                <button
                  className="nav-btn"
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                >
                  Next ➡️
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result !== null && currentStep === steps.length - 1 && (
              <div className="section result-section">
                <h2>🎯 Final Result</h2>
                <div className="result-box">
                  <div className="result-value">
                    <h3>Maximum Value:</h3>
                    <p className="max-value">₹{result}</p>
                  </div>

                  <div className="selected-items">
                    <h3>Selected Items:</h3>
                    {selectedItems.length > 0 ? (
                      <ul>
                        {selectedItems.map((index) => (
                          <li key={index}>
                            <strong>Item {index + 1}</strong>: Weight = {items[index].weight} kg, 
                            Value = ₹{items[index].value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No items selected</p>
                    )}
                    <p className="total-weight">
                      <strong>Total Weight:</strong>{' '}
                      {selectedItems.reduce((sum, index) => sum + items[index].weight, 0)} kg
                      {' '} / {capacity} kg
                    </p>
                  </div>

                  <div className="complexity-info">
                    <h3>Algorithm Complexity:</h3>
                    <p><strong>Time Complexity:</strong> O(n × W) = O({items.length} × {capacity}) = {items.length * parseInt(capacity)} operations</p>
                    <p><strong>Space Complexity:</strong> O(n × W) = O({items.length + 1} × {parseInt(capacity) + 1}) = {(items.length + 1) * (parseInt(capacity) + 1)} cells</p>
                  </div>
                </div>

                <button className="reset-solution-btn" onClick={resetSolution}>
                  🔄 Solve Again
                </button>
              </div>
            )}
          </>
        )}

        {/* Information Section */}
        <div className="section info-section">
          <h2>ℹ️ About 0/1 Knapsack Problem</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>📖 Problem Definition</h3>
              <p>
                Given a set of items, each with a weight and value, determine which items to 
                include in a knapsack so that the total weight is less than or equal to a given 
                limit and the total value is maximized.
              </p>
            </div>

            <div className="info-card">
              <h3>🔑 Key Concepts</h3>
              <ul>
                <li><strong>0/1 Constraint:</strong> Each item can be taken (1) or left (0), not fractional</li>
                <li><strong>Optimal Substructure:</strong> Solution contains optimal solutions to subproblems</li>
                <li><strong>Overlapping Subproblems:</strong> Same subproblems solved multiple times</li>
                <li><strong>DP Table:</strong> Stores solutions to avoid recomputation</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>📐 Recurrence Relation</h3>
              <div className="formula">
                <code>
                  dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])
                </code>
                <p className="formula-explain">
                  For each item, choose maximum of: excluding it OR including it
                </p>
              </div>
            </div>

            <div className="info-card">
              <h3>🌍 Real-World Applications</h3>
              <ul>
                <li>Resource allocation in project management</li>
                <li>Portfolio optimization in finance</li>
                <li>Cargo loading in logistics</li>
                <li>Memory allocation in operating systems</li>
                <li>Budget-constrained decision making</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>🎓 DAA College Project | Built with React.js | Dynamic Programming Implementation</p>
      </footer>
    </div>
  );
}

export default App;
