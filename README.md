# Portfolio Website

A modern, colorful resume portfolio website with the ability to add/remove skills, experience, and contact information. All data is saved to your browser's local storage.

## Features

✨ **Modern Design** - Vibrant gradient colors and smooth animations
📝 **Edit Mode** - Toggle to add, edit, or remove skills, experience, and contact info
�️ **Profile Picture** - Upload and display your profile image
💾 **Local Storage** - Your data persists between sessions
📱 **Responsive** - Works great on desktop and mobile devices
🎨 **Colorful & Vibrant** - Eye-catching gradient colors throughout
🔒 **Secure Editing** - Edit mode only works on localhost (read-only on public URLs)

## Project Structure

```
portfolio/
├── index.html       # Main HTML file
├── style.css        # Styling and layout
├── script.js        # Functionality and data management
└── README.md        # This file
```

## How to Use

### Option 1: Using Python (Built-in on most systems)

1. Navigate to the portfolio folder:
   ```bash
   cd portfolio
   ```

2. Start a local server:
   - **Python 3.x:**
     ```bash
     python -m http.server 8000
     ```
   - **Python 2.x:**
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. Open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js

If you have Node.js installed, you can use `http-server`:

```bash
npm install -g http-server
cd portfolio
http-server
```

Then open: `http://localhost:8080`

### Option 3: Direct File Opening

Simply double-click `index.html` to open it in your browser. This works but won't auto-refresh if you make changes.

## Using the Portfolio

1. **Click the "✏️ Edit Mode" button** to enable editing (only works on localhost)
2. **Upload Your Profile Picture:**
   - Click on the profile picture area or use the "Choose Picture" button in the contact form
   - Select an image from your computer
   - Your picture is saved automatically

3. **Update Your Contact Information:**
   - Fill in your name, email, phone, and location
   - Click "Save Contact"

4. **Add Skills:**
   - Type a skill name and click "Add Skill"
   - Press Enter as a shortcut
   - Remove skills by hovering and clicking the ✕ button

5. **Add Work Experience:**
   - Fill in Job Title, Company, Duration, and Description
   - Click "Add Experience"
   - Remove experience by clicking the "Remove" button

6. **Toggle Edit Mode Off** when you're done editing

All your changes are automatically saved to your browser's local storage!

### Edit Mode Restrictions

- **Localhost (http://localhost:8000)**: Full edit mode available ✓
- **Other URLs**: Read-only mode (view only, cannot edit) 🔒

This ensures your portfolio data is secure and can only be modified locally.

## Customization

### Colors
Edit the CSS custom properties in `style.css` (lines 8-15):

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --accent-color: #14b8a6;
    /* ... more colors ... */
}
```

### Default Data
Modify the `DEFAULT_DATA` object in `script.js` to change initial values.

### Fonts
Change the font-family in `style.css`:
```css
font-family: 'Your Font Name', sans-serif;
```

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Notes

- Data is stored in browser local storage, so it persists only in that browser/device
- If you need to share your portfolio online, you can host it on:
  - GitHub Pages (free)
  - Netlify (free)
  - Vercel (free)
  - Any web hosting service

## Reset Data

To reset all data to defaults, open the browser console (F12) and run:
```javascript
resetToDefaults()
```

## Future Enhancements

- Export portfolio as PDF
- Dark mode toggle
- Multiple theme options
- Cloud backup/sync
- Deployment to GitHub Pages

Enjoy building your portfolio! 🚀
