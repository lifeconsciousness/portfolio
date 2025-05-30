**Lamastream** is an early-stage startup creating interactive Twitch extensions that allow streamers to sell "splashes" - digital triggers that viewers can purchase during livestreams to engage or prank the streamer in real time. These splashes are connected to physical machines that the streamer sets up beforehand, creating a fun and immersive experience for the audience. 

The product is already in use by active clients.
I was responsible for developing the **frontend**, working within a **Scrum-based Agile team** throughout the development process.


### 💡 What I Built

- **Viewer Extension UI**: Lightweight React component displayed directly in the Twitch stream.
- **Streamer Configuration Panel**: A full-featured React interface for adding and managing products.
- **State Management & Twitch API Integration**: Communicated between frontend and Twitch backend securely.


## 🖼️ Screenshots

**Viewer Extension Interface**  

[![ext.gif](https://i.postimg.cc/XvmR80d0/ext.gif)](https://postimg.cc/06GXkFVt)

**Streamer extension configuration**  

[![configless.gif](https://i.postimg.cc/cJ0gLVr0/configless.gif)](https://postimg.cc/4Y2N826S)

When a streamer sets up a product through the config panel, the details are stored and linked to their Twitch stream. When a viewer makes a purchase, the streamer gets a splash notification in real time, and the configuration is sent to a connected backend device.

## 🛠️ Tech Stack

- **Frontend**: React, SCSS
- **Integration**: Twitch Extension API
- **State Handling**: React Context + local state

The project taught me a lot about building tightly scoped UIs for embedded environments and integrating with third-party APIs like Twitch. It also challenged me to think about UX under tight screen constraints and real-time feedback.
