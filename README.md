# 🎒 0/1 Knapsack Problem Solver using Dynamic Programming

## DAA College Project - React Implementation

---

## 📋 Project Overview

This is an interactive visualization tool for the **0/1 Knapsack Problem** solved using **Dynamic Programming**. The project demonstrates step-by-step how the DP algorithm builds the solution table and makes optimal decisions.

**Created for:** Design and Analysis of Algorithms (DAA) Course  
**Technology:** React.js  
**Algorithm:** Dynamic Programming (Tabulation Method)

---

## ✨ Features

- ✅ **Interactive Input:** Add multiple items with custom weights and values
- ✅ **Step-by-Step Visualization:** See how DP table is built cell by cell
- ✅ **Decision Highlights:** Visual indication of include/exclude decisions
- ✅ **Final Result:** Shows maximum value and selected items
- ✅ **Complexity Analysis:** Displays time and space complexity
- ✅ **Beautiful UI:** Clean, professional, and responsive design
- ✅ **Educational:** Perfect for learning and demonstration

---

## 🚀 How to Run

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Extract the project folder** (if zipped)

2. **Open Terminal/Command Prompt** in the project folder

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Open in Browser:**
   - Automatically opens at `http://localhost:3000`
   - If not, manually open this URL

---

## 📖 How to Use

1. **Enter Knapsack Capacity:** Set the maximum weight the knapsack can hold

2. **Add Items:**
   - Enter weight and value for each item
   - Click "➕ Add Item"
   - Add multiple items

3. **Solve:**
   - Click "🚀 Solve Knapsack" button
   - Watch the step-by-step visualization

4. **Navigate Steps:**
   - Use "⬅️ Previous" and "Next ➡️" buttons
   - See how each cell is calculated

5. **View Result:**
   - Final step shows maximum value
   - Lists which items were selected
   - Shows total weight used

---

## 🎯 Example Test Cases

### Test Case 1: Basic Example
```
Capacity: 50
Items:
  - Item 1: Weight=10, Value=60
  - Item 2: Weight=20, Value=100
  - Item 3: Weight=30, Value=120

Expected Result: 220 (Items 2 & 3)
```

### Test Case 2: Classic Example
```
Capacity: 7
Items:
  - Item 1: Weight=1, Value=1
  - Item 2: Weight=3, Value=4
  - Item 3: Weight=4, Value=5
  - Item 4: Weight=5, Value=7

Expected Result: 9 (Items 2 & 3)
```

### Test Case 3: All Items Fit
```
Capacity: 100
Items:
  - Item 1: Weight=10, Value=20
  - Item 2: Weight=15, Value=30
  - Item 3: Weight=20, Value=40

Expected Result: 90 (All items)
```

---

## 🧮 Algorithm Explanation

### The 0/1 Knapsack Problem

Given a set of items, each with a weight and value, determine which items to include in a knapsack so that:
- Total weight ≤ capacity
- Total value is maximized
- Each item can be taken (1) or not taken (0)

### Dynamic Programming Approach

**DP Table:** `dp[i][w]`
- `i` = items considered (0 to n)
- `w` = current capacity (0 to W)
- Value = maximum value achievable

**Recurrence Relation:**
```
If weight[i] > w:
    dp[i][w] = dp[i-1][w]  // Can't include (too heavy)

Else:
    dp[i][w] = max(
        dp[i-1][w],                         // Exclude item
        value[i] + dp[i-1][w-weight[i]]     // Include item
    )
```

**Base Case:**
```
dp[0][w] = 0  // No items, value = 0
dp[i][0] = 0  // No capacity, value = 0
```

### Complexity Analysis

- **Time Complexity:** O(n × W)
  - n = number of items
  - W = knapsack capacity
  - We fill each cell once

- **Space Complexity:** O(n × W)
  - Size of DP table

---

## 🎤 Presentation Points for Examiner

### Opening (1 minute)
"Good morning sir. My project is a **0/1 Knapsack Problem Solver using Dynamic Programming**, built with React.js. The 0/1 Knapsack is a classic optimization problem where we select items to maximize value without exceeding weight capacity."

### Key Points to Explain (3-4 minutes)

1. **Problem Statement:**
   - Items with weight and value
   - Knapsack with capacity limit
   - Goal: Maximize value

2. **Why Dynamic Programming?:**
   - Brute force: O(2^n) - exponential
   - DP: O(n×W) - polynomial
   - Avoids redundant calculations

3. **How it Works:**
   - Build DP table row by row
   - Each cell: decide include/exclude
   - Take maximum value

4. **Live Demo:**
   - Enter example data
   - Show step-by-step solving
   - Highlight decisions
   - Display result

### Questions You Might Get

**Q: Difference between 0/1 and Fractional Knapsack?**
- 0/1: Take whole item or nothing (DP)
- Fractional: Can take fractions (Greedy)

**Q: Time complexity?**
- O(n × W) where n=items, W=capacity

**Q: Can we optimize space?**
- Yes! Use 1D array, O(W) space
- Trade-off: Can't trace which items

**Q: Real-world applications?**
- Resource allocation
- Budget planning
- Cargo loading
- Portfolio optimization

---

## 📁 Project Structure

```
knapsack-visualizer/
│
├── public/
│   └── index.html              # HTML template
│
├── src/
│   ├── App.js                  # Main component with logic
│   ├── App.css                 # Styling
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
│
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling and animations
- **HTML5** - Structure

### React Concepts Implemented
- Functional Components
- useState Hook
- Event Handling
- Conditional Rendering
- Array Mapping
- CSS Styling

---

## 🌟 Future Enhancements

- Add more algorithm visualizations (Fractional Knapsack, Unbounded Knapsack)
- Export results as PDF
- Compare DP vs Brute Force
- Add preset test cases
- Animation speed control
- Dark mode theme

---

## 📚 Learning Resources

- [GeeksforGeeks - 0/1 Knapsack](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/)
- [YouTube - Dynamic Programming](https://www.youtube.com/results?search_query=0+1+knapsack+dynamic+programming)
- [React Documentation](https://react.dev/)

---

## 👨‍💻 Author

**Your Name**  
DAA College Project  
Department of Computer Science

---

## 📄 License

This project is created for educational purposes as part of college coursework.

---

## 🎓 Acknowledgments

- Course: Design and Analysis of Algorithms
- Instructor: [Your Professor's Name]
- Institution: [Your College Name]

---

## 📞 Contact

For any questions or feedback about this project, please contact:
- Email: your.email@example.com
- GitHub: [Your GitHub Profile]

---

## ⭐ Final Notes

This project demonstrates:
- Strong understanding of Dynamic Programming
- Practical implementation skills
- Clean code practices
- User-friendly design

**Perfect for academic presentations and learning!**

---

**Good Luck with Your Presentation! 🚀**