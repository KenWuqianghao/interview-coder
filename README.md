# Interview Coder

Interview Coder is a desktop application designed to help users with technical coding interviews. It allows users to take screenshots of coding problems, process them using AI, and get solutions.

## Modified Version - No Authentication Required

This is a modified version of the Interview Coder application with the authentication and subscription requirements removed. You can run the application directly without needing to sign in or subscribe.

## Features

- Take screenshots of coding problems
- Process screenshots to extract problem statements
- Generate solutions in your preferred programming language
- View time and space complexity analysis
- Toggle window visibility with keyboard shortcuts
- Move the window around the screen with keyboard shortcuts

## Keyboard Shortcuts

- **Cmd/Ctrl + B**: Toggle window visibility
- **Cmd/Ctrl + Q**: Quit the application
- **Cmd/Ctrl + Shift + S**: Take a screenshot
- **Cmd/Ctrl + Shift + P**: Process screenshots
- **Arrow keys with Cmd/Ctrl**: Move window around the screen

## Running the Application

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interview-coder.git
   cd interview-coder
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Set up your Gemini API key:
   - Create a `.env` file in the root directory
   - Add your Gemini API key: `GEMINI_API_KEY=your_api_key_here`
   - You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)

4. Run the application in development mode:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Build the application for production:
   ```
   npm run build
   # or
   yarn build
   ```

## API Integration

This version of the application uses Google's Gemini API (gemini-2.0-flash model) to process screenshots and generate solutions. You must provide your own Gemini API key in the `.env` file for the application to work properly.

## Disclaimer

This modified version is for educational purposes only. The original Interview Coder application is a commercial product with subscription requirements.

## License

This project is licensed under the ISC License.
