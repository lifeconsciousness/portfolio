


Web-application that calculates the approximate max legal price of any residential property in the Netherlands. By entering a Dutch address, users can instantly view detailed property information and receive a calculated rent cap based on the **housing points system (woningwaarderingsstelsel)**. The app gathers and analyzes data from multiple official sources to offer a single tool for rent price assessment.

### [🔗 Live Version](https://rentcalculator.onrender.com)

## ⚙️ Key Features

- 🧮 **Accurate Rent Price Calculation**  
  Uses official scoring metrics based on surface area, WOZ value, energy label, amenities, and building age.

- 🏠 **Property Data Lookup**  
  Automatically displays relevant property details like:
  - Living space (m²)
  - Year of construction
  - WOZ value
  - Energy label or index
  - Monument status

- 🗂 **Request History**  
  Stores and displays all previous queries for easy reference.

- 📊 **Data-Driven Interface**  
  Results are visual, clear, and aligned with Dutch rental regulation standards.

## 🎯 Purpose

This project was built to solve a real-world problem: the lack of accessible, centralized tools for estimating the legally allowed rent in the Netherlands. It’s also a demonstration of my ability to combine **scraping**, **API integration**, and **frontend development** into a cohesive, user-friendly tool.



## 🖼️ Screenshots

**Main input form**  
[![screenshot1.png](https://i.postimg.cc/fb4jHN5j/screenshot1.png)](https://postimg.cc/Xr8CJtRp)

**Calculated result display**  
[![screenshot2.png](https://i.postimg.cc/K8RSFnPv/screenshot2.png)](https://postimg.cc/NKqPk2CW)

**History of previous requests**  
[![screenshot3.png](https://i.postimg.cc/xTGBK9QH/screenshot3.png)](https://postimg.cc/2V6HYRV8)


## 🔍 How It Works

- A **Node.js + Express** backend handles API calls and scrapes structured data from various public sources.
- The backend communicates with a custom calculator.
- A **React-based frontend** provides a smooth user experience with real-time feedback, loading states, and result displays.


## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Scraping / APIs**: Puppeteer, public housing databases


