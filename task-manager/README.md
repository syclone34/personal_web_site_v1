# 📝 Task Manager App

A clean and intuitive task management application with drag-and-drop functionality, priority levels, and persistent storage.

![Task Manager](https://img.shields.io/badge/Status-Active-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## 🎯 Features

### Core Functionality
- ✅ **Add Tasks** - Quick task entry with enter key support
- ✅ **Priority Levels** - Organize tasks as High, Medium, or Low priority
- ✅ **Due Dates** - Set deadlines and see overdue warnings
- ✅ **Mark Complete** - Check off finished tasks
- ✅ **Delete Tasks** - Remove unwanted tasks
- ✅ **Filter Views** - View All, Active, or Completed tasks

### Advanced Features
- 🎨 **Drag & Drop** - Move tasks between priority levels
- 💾 **Local Storage** - Tasks persist between sessions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⏰ **Smart Dates** - Shows "Today", "Tomorrow", or specific dates
- 🎭 **Smooth Animations** - Polished UI transitions
- 📊 **Live Counts** - Real-time task statistics

## 🚀 Quick Start

### Option 1: Open Directly
```powershell
# Open in your default browser
start c:\Users\syclo\personal_web_site_v1\task-manager\index.html
```

### Option 2: Use Live Server (Recommended)
1. Install VS Code extension: "Live Server"
2. Right-click `index.html` → "Open with Live Server"
3. App opens at `http://localhost:5500`

## 📁 Project Structure

```
task-manager/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Task management logic
└── README.md          # This file
```

## 💡 How to Use

### Adding a Task
1. Type your task in the input field
2. Select priority level (High, Medium, Low)
3. Optionally set a due date
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox next to a task
- **Delete**: Click the trash icon
- **Change Priority**: Drag the task to a different priority section
- **Filter**: Use the filter buttons to view All, Active, or Completed tasks
- **Clear Completed**: Remove all completed tasks at once

### Priority Levels
- 🔴 **High Priority**: Urgent tasks that need immediate attention
- 🟠 **Medium Priority**: Important tasks to complete soon
- 🟢 **Low Priority**: Tasks that can wait

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;     /* Main theme color */
    --danger-color: #ef4444;      /* High priority color */
    --warning-color: #f59e0b;     /* Medium priority color */
    --success-color: #10b981;     /* Low priority color */
}
```

### Modify Priority Levels
Add or change priorities in `script.js` and update the HTML sections accordingly.

## 🌐 Deployment

### Deploy to GitHub Pages
```powershell
# Create a new repository on GitHub
git init
git add .
git commit -m "Initial commit - Task Manager App"
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git push -u origin main

# Enable GitHub Pages
# Go to Settings → Pages → Source: main branch → Save
# Your app will be live at: https://YOUR_USERNAME.github.io/task-manager
```

### Deploy to Netlify
1. Drag and drop the `task-manager` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your app is live instantly!

### Deploy to Vercel
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
cd task-manager
vercel
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Grid layout, Flexbox, animations
- **JavaScript (ES6+)** - Classes, arrow functions, template literals
- **LocalStorage API** - Persistent data storage
- **Drag and Drop API** - Interactive task reordering

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Key Features Implementation
- **Data Persistence**: Uses `localStorage` to save tasks
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **Date Handling**: JavaScript Date object with smart formatting
- **Responsive**: CSS Grid with mobile-first design

## 📊 Future Enhancements

Potential features to add:
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Task notes/descriptions
- [ ] Recurring tasks
- [ ] Export/import tasks (JSON)
- [ ] Dark mode toggle
- [ ] Task statistics dashboard
- [ ] Keyboard shortcuts
- [ ] Subtasks
- [ ] Cloud sync

## 🐛 Known Issues

None currently! Report issues to [crfuller34@gmail.com](mailto:crfuller34@gmail.com)

## 📝 License

MIT License - feel free to use this project for your portfolio or modify it as needed.

## 👤 Author

**Cole Fuller**
- Email: crfuller34@gmail.com
- Location: Minneapolis, MN
- GitHub: [@syclone34](https://github.com/syclone34)

## 🎓 Learning Resources

Built this app while learning:
- JavaScript DOM manipulation
- Local Storage API
- Drag and Drop API
- CSS Grid and Flexbox
- Responsive design principles

---

Built with ❤️ by Cole Fuller
