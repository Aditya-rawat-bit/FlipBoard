
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer } from 'lucide-react';

const ProjectQA = () => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl print:px-0">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Button 
            variant="ghost" 
            className="hover:bg-flipboard-soft-purple"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} className="mr-1" />
            Back
          </Button>
          
          <div className="flex space-x-2">
            <Button onClick={handlePrint} className="flex items-center">
              <Printer size={18} className="mr-1" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} className="bg-flipboard-purple hover:bg-flipboard-dark-purple flex items-center">
              <Download size={18} className="mr-1" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border print:shadow-none print:border-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Flipboard Notes Project</h1>
            <p className="text-lg text-gray-600">Comprehensive Q&A Document</p>
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">1. Project Concept & Purpose</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What was the main motivation behind creating this Notes application?</h3>
                <p className="text-gray-700">
                  The main motivation behind creating Flipboard Notes was to develop a comprehensive, user-friendly digital note-taking system that organizes information by subjects. Unlike traditional sticky notes applications, this platform aims to provide students and professionals with a structured way to capture, organize, and retrieve information. The hierarchical organization (subjects → notes → tasks) mirrors how people naturally categorize information in academic and professional environments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How does this application differ from existing note-taking apps like Google Keep or Evernote?</h3>
                <p className="text-gray-700">
                  Flipboard Notes differentiates itself through its education-focused design with a subject-based organization system. Unlike more general note applications:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>It uses a hierarchical system specifically designed for educational content (Subjects → Notes → Tasks)</li>
                  <li>It offers integrated task management directly within notes</li>
                  <li>It provides AI assistance for note enhancement (a unique feature not commonly found in basic note apps)</li>
                  <li>The UI is specifically designed for studying with color-coding for easy visual organization</li>
                  <li>It's lightweight and browser-based, requiring no installation or account setup (using localStorage)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Who is the target audience for this application?</h3>
                <p className="text-gray-700">
                  The target audience for Flipboard Notes includes:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Students who need to organize notes by subjects/classes</li>
                  <li>Educators who want to create and share structured educational content</li>
                  <li>Researchers who need to organize findings and related tasks</li>
                  <li>Professionals who manage projects with multiple related components</li>
                  <li>Anyone who prefers a visually organized, hierarchical system for information management</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">2. Technical Implementation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Why did you choose React with TypeScript for this application?</h3>
                <p className="text-gray-700">
                  React with TypeScript was chosen for several compelling reasons:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Component-based architecture allows for reusable UI elements (like notes, cards, forms)</li>
                  <li>TypeScript adds type safety, reducing runtime errors and improving developer experience</li>
                  <li>React's virtual DOM provides efficient rendering for the dynamic note-taking interface</li>
                  <li>The ecosystem offers robust libraries like shadcn/ui for consistent UI components</li>
                  <li>React Router enables seamless navigation between subjects and notes views</li>
                  <li>TypeScript interfaces ensure data consistency across the application</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Explain the responsive design approach for different screen sizes.</h3>
                <p className="text-gray-700">
                  The application implements a comprehensive responsive design using these techniques:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Tailwind CSS utility classes for responsive layouts (sm:, md:, lg: breakpoints)</li>
                  <li>Mobile-first approach with column layouts that expand to multi-column grids on larger screens</li>
                  <li>Adaptive navigation with collapsible menus on small screens</li>
                  <li>Responsive font sizes and spacing using Tailwind's scaling utilities</li>
                  <li>Flexible card components that maintain readability across devices</li>
                  <li>Modal interfaces (like note creation forms) that adapt to screen dimensions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How does the color-coding system for notes work technically?</h3>
                <p className="text-gray-700">
                  The color-coding system is implemented through a combination of Tailwind CSS classes and React state management:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Each note stores a color property in its data model (e.g., "bg-flipboard-soft-purple")</li>
                  <li>When creating/editing notes, users select from predefined color options</li>
                  <li>The selected color is stored with the note data in localStorage</li>
                  <li>When rendering notes, the stored color class is dynamically applied to the note card component</li>
                  <li>Default colors are assigned if a note doesn't have a specified color</li>
                  <li>The system uses consistent color variables defined in the Tailwind configuration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">If using localStorage, what are its limitations and how would you scale this to a database?</h3>
                <p className="text-gray-700">
                  <strong>localStorage Limitations:</strong>
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Storage capacity limited to ~5MB per domain</li>
                  <li>Data is restricted to the browser/device used</li>
                  <li>No synchronization across devices</li>
                  <li>No backup or recovery mechanisms</li>
                  <li>Limited querying capabilities (no complex searches)</li>
                  <li>Poor performance with large datasets</li>
                </ul>
                
                <p className="text-gray-700 mt-4">
                  <strong>Scaling to a Database Approach:</strong>
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Implement a backend API using Node.js/Express or similar framework</li>
                  <li>Migrate to a NoSQL database like MongoDB (ideal for the document structure of notes)</li>
                  <li>Create proper data models with relationships between subjects, notes, and tasks</li>
                  <li>Implement user authentication and authorization</li>
                  <li>Add API endpoints for CRUD operations on notes and subjects</li>
                  <li>Use React Query for efficient server state management</li>
                  <li>Add offline functionality with service workers for data syncing</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">3. Features & Functionality</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Explain the implementation of the Todo list functionality within notes.</h3>
                <p className="text-gray-700">
                  The Todo list functionality is implemented through several interconnected components:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>Data Structure:</strong> Each note can contain an array of todo items with properties for id, text, and completion status</li>
                  <li><strong>TodoItem Component:</strong> Handles individual task rendering, editing, deletion, and completion toggling</li>
                  <li><strong>TodoList Component:</strong> Manages the collection of TodoItems, including adding new tasks</li>
                  <li><strong>State Management:</strong> Uses React state and props to maintain and update todo data</li>
                  <li><strong>User Interface:</strong> Implemented with Tailwind CSS and shadcn/ui components for consistent styling</li>
                  <li><strong>Progress Tracking:</strong> Calculates and displays completion progress in the note cards</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you add features like note categorization/tagging?</h3>
                <p className="text-gray-700">
                  To implement note tagging/categorization:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Extend the note data model to include a tags array property</li>
                  <li>Create a TagInput component for selecting/creating tags</li>
                  <li>Add a tag selection interface to the NoteForm component</li>
                  <li>Implement tag filtering on the NotesPage</li>
                  <li>Add visual representations of tags on NoteCard components</li>
                  <li>Create a dedicated Tags management interface</li>
                  <li>Add localStorage persistence for user-created tags</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Explain the AI assistant feature in the application.</h3>
                <p className="text-gray-700">
                  The AI assistant feature enhances note-taking through:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Integration with an AI service via API calls</li>
                  <li>Context-aware analysis of the current note's content</li>
                  <li>Ability to generate summaries, explanations, or related content</li>
                  <li>User-friendly interface for requesting different types of AI assistance</li>
                  <li>Option to insert AI-generated content directly into notes</li>
                  <li>Error handling for API limitations or connectivity issues</li>
                  <li>Loading states to provide feedback during processing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How does the note media input functionality work?</h3>
                <p className="text-gray-700">
                  The note media input functionality allows users to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Upload and embed images in notes through file input</li>
                  <li>Convert images to base64 format for localStorage persistence</li>
                  <li>Add voice input through the Web Speech API (when supported by the browser)</li>
                  <li>Toggle between recording modes with visual feedback</li>
                  <li>Transcribe spoken content into text for note content</li>
                  <li>Handle browser compatibility issues for speech recognition</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">4. User Experience (UX)</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What UX principles did you apply in the design?</h3>
                <p className="text-gray-700">
                  Several UX principles were incorporated into the design:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>Consistency:</strong> Uniform color schemes, component styles, and interaction patterns</li>
                  <li><strong>Feedback:</strong> Toast notifications for user actions like saving or deleting notes</li>
                  <li><strong>Progressive Disclosure:</strong> Complex features (like AI assistance) hidden until needed</li>
                  <li><strong>Recognition over Recall:</strong> Visual color-coding and card layouts to identify note categories</li>
                  <li><strong>User Control:</strong> Easy editing, deletion, and organization of notes and tasks</li>
                  <li><strong>Error Prevention:</strong> Confirmation dialogs for destructive actions</li>
                  <li><strong>Hierarchy:</strong> Clear visual hierarchy from subjects to notes to tasks</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How did you ensure accessibility in your design?</h3>
                <p className="text-gray-700">
                  Accessibility considerations include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Using semantic HTML elements (proper heading levels, button elements, etc.)</li>
                  <li>Ensuring sufficient color contrast for text and interactive elements</li>
                  <li>Providing text alternatives for visual elements</li>
                  <li>Implementing ARIA attributes where appropriate</li>
                  <li>Ensuring keyboard navigability for all interactive components</li>
                  <li>Using the shadcn/ui component library, which has built-in accessibility features</li>
                  <li>Maintaining a logical tab order for form elements</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Why did you choose the color scheme and layout for the notes grid?</h3>
                <p className="text-gray-700">
                  The color scheme and layout were chosen to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Use soft, pastel colors that reduce eye strain during extended study sessions</li>
                  <li>Provide visual differentiation between different types of notes</li>
                  <li>Create a responsive grid that adapts from 1 column on mobile to 3 columns on large screens</li>
                  <li>Ensure sufficient whitespace between cards for visual separation</li>
                  <li>Maintain consistent card heights while accommodating variable content lengths</li>
                  <li>Use a color palette that feels modern yet academically appropriate</li>
                  <li>Provide subtle hover effects for interactive feedback</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">5. Challenges & Solutions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What were the biggest challenges you faced while building this project?</h3>
                <p className="text-gray-700">
                  Key challenges in the development process included:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>Data Persistence:</strong> Managing complex nested data structures in localStorage</li>
                  <li><strong>Component Architecture:</strong> Creating a flexible yet consistent component hierarchy</li>
                  <li><strong>Browser Compatibility:</strong> Making the Web Speech API work across different browsers</li>
                  <li><strong>State Management:</strong> Handling complex state flows between parent and child components</li>
                  <li><strong>UI Responsiveness:</strong> Ensuring smooth performance with potentially large note collections</li>
                  <li><strong>AI Integration:</strong> Implementing error handling and fallbacks for AI functionality</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How did you debug issues with localStorage or dynamic content rendering?</h3>
                <p className="text-gray-700">
                  The debugging approach included:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Using extensive console logging to track state changes and localStorage operations</li>
                  <li>Implementing browser devtools to inspect storage and component state</li>
                  <li>Creating data validation functions to ensure consistent data structure</li>
                  <li>Using React's strict mode to identify potential rendering issues</li>
                  <li>Testing edge cases like empty states and large datasets</li>
                  <li>Implementing TypeScript interfaces to catch type-related errors early</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What were the challenges with implementing the todo list functionality?</h3>
                <p className="text-gray-700">
                  Implementing todos presented these challenges:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Managing nested state updates (todos within notes)</li>
                  <li>Creating a smooth inline editing experience for todo items</li>
                  <li>Maintaining proper state synchronization with localStorage</li>
                  <li>Calculating and displaying completion progress accurately</li>
                  <li>Handling batch operations (adding/deleting multiple todos)</li>
                  <li>Creating an intuitive UX for todo management within notes</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">6. Testing & Validation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How did you test the application's functionality?</h3>
                <p className="text-gray-700">
                  The testing methodology included:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Manual testing of all CRUD operations for subjects, notes, and todos</li>
                  <li>Cross-browser testing on Chrome, Firefox, and Safari</li>
                  <li>Device testing on desktop, tablet, and mobile viewports</li>
                  <li>Form validation testing for user inputs</li>
                  <li>Edge case testing (empty states, large content, special characters)</li>
                  <li>LocalStorage persistence verification</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What edge cases did you consider?</h3>
                <p className="text-gray-700">
                  Important edge cases that were considered:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Empty states (no subjects, no notes, empty todos)</li>
                  <li>Very long note titles or content</li>
                  <li>Image handling in notes (failed uploads, large images)</li>
                  <li>Browser storage limits being reached</li>
                  <li>Speech recognition errors or unavailability</li>
                  <li>AI service connectivity issues</li>
                  <li>Form submissions with invalid or unexpected data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you implement unit tests for this project?</h3>
                <p className="text-gray-700">
                  A comprehensive testing approach would include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Jest and React Testing Library for component testing</li>
                  <li>Unit tests for utility functions and hooks</li>
                  <li>Component tests for rendering and interaction</li>
                  <li>Mock implementations for localStorage and Web Speech API</li>
                  <li>Integration tests for complex workflows</li>
                  <li>Snapshot testing for UI consistency</li>
                  <li>Test coverage reporting to identify untested code</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">7. Security & Data Privacy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How is user data protected in the current implementation?</h3>
                <p className="text-gray-700">
                  The current data protection measures include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Client-side only storage, avoiding server-side data exposure</li>
                  <li>Same-origin policy protection of localStorage</li>
                  <li>Input validation to prevent injection attacks</li>
                  <li>Sanitization of content before rendering to prevent XSS</li>
                  <li>Basic authentication state management</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  However, the localStorage approach has inherent limitations as data is stored unencrypted on the user's device.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">If you were to add authentication, how would you securely store passwords?</h3>
                <p className="text-gray-700">
                  A secure authentication system would:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Never store passwords in plaintext</li>
                  <li>Use bcrypt or Argon2 for password hashing with appropriate cost factors</li>
                  <li>Implement salting to protect against rainbow table attacks</li>
                  <li>Store hashed passwords in a secure database, not in client storage</li>
                  <li>Use HTTPS for all data transmission</li>
                  <li>Implement proper session management with secure cookies</li>
                  <li>Add features like rate limiting and account lockouts to prevent brute force attacks</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What are the security risks of using localStorage, and how would you mitigate them?</h3>
                <p className="text-gray-700">
                  Key risks and mitigations include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>XSS Vulnerability:</strong> Sanitize all user input and implement Content Security Policy</li>
                  <li><strong>No Expiration:</strong> Implement manual data cleanup routines</li>
                  <li><strong>Accessible to JavaScript:</strong> Minimize use for sensitive data; consider encrypting critical information</li>
                  <li><strong>Size Limitations:</strong> Implement data rotation or cleanup for older, unused data</li>
                  <li><strong>Shared in Same-Origin:</strong> Use specific keys with application prefixes to avoid collisions</li>
                  <li><strong>No Access Control:</strong> Move to a server-side database with proper authentication for multi-user scenarios</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">8. Scalability & Extensions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you extend this to a multi-user system with a backend?</h3>
                <p className="text-gray-700">
                  Extending to a multi-user architecture would require:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Implementing a Node.js/Express backend API</li>
                  <li>Creating user authentication with JWT or session-based auth</li>
                  <li>Migrating from localStorage to a proper database</li>
                  <li>Adding user accounts with profiles and settings</li>
                  <li>Implementing access control for note sharing/collaboration</li>
                  <li>Adding API endpoints for all CRUD operations</li>
                  <li>Using React Query for efficient server state management</li>
                  <li>Implementing offline capabilities with service workers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What database would you choose for storing notes, and why?</h3>
                <p className="text-gray-700">
                  For this application, MongoDB would be an ideal choice because:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>The document-oriented structure matches the nested nature of subjects, notes, and todos</li>
                  <li>Schema flexibility allows for easy extension of note features</li>
                  <li>Good performance for read-heavy operations (most users read notes more than write)</li>
                  <li>Horizontal scaling capabilities for growing user bases</li>
                  <li>Rich query capabilities for implementing search and filtering</li>
                  <li>Good support for text search and indexing</li>
                  <li>Ability to store binary data (for images) or references to cloud storage</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you implement real-time updates if multiple users edit the same note?</h3>
                <p className="text-gray-700">
                  Real-time collaboration could be implemented using:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>WebSockets for real-time communication (Socket.io)</li>
                  <li>Operational Transformation or CRDT algorithms for conflict resolution</li>
                  <li>User presence indicators to show who is currently editing</li>
                  <li>Per-paragraph locking to allow simultaneous editing of different sections</li>
                  <li>Change highlighting to show recent updates by other users</li>
                  <li>Versioning system to track and merge changes</li>
                  <li>Fallback to polling for environments where WebSockets aren't available</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">9. Performance Optimization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How do you optimize the loading speed of the notes grid?</h3>
                <p className="text-gray-700">
                  Performance optimizations for the notes grid include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>React memo to prevent unnecessary re-renders of note cards</li>
                  <li>Virtualized lists for displaying large numbers of notes</li>
                  <li>Lazy loading images within notes</li>
                  <li>Pagination or infinite scrolling for large collections</li>
                  <li>Optimized state updates to minimize render cycles</li>
                  <li>Efficient filtering and sorting algorithms</li>
                  <li>Caching frequently accessed data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What techniques would you use to reduce reflows/repaints during animations?</h3>
                <p className="text-gray-700">
                  Animation performance techniques include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Using CSS transform and opacity for animations instead of position or dimensions</li>
                  <li>Applying will-change CSS property for elements that will animate</li>
                  <li>Utilizing requestAnimationFrame for JavaScript animations</li>
                  <li>Promoting elements to their own compositor layer when appropriate</li>
                  <li>Debouncing window resize events that trigger layout calculations</li>
                  <li>Avoiding forced synchronous layouts in JavaScript</li>
                  <li>Using efficient CSS selectors to minimize style recalculation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you lazy-load resources if the app grows larger?</h3>
                <p className="text-gray-700">
                  Lazy loading approaches would include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Code splitting with React.lazy and Suspense to load components on demand</li>
                  <li>Route-based code splitting to load code specific to current view</li>
                  <li>Dynamic imports for less frequently used functionality</li>
                  <li>Intersection Observer API to load images as they enter viewport</li>
                  <li>Service Worker to prefetch and cache critical resources</li>
                  <li>Implementing a skeleton UI for content that's loading</li>
                  <li>Prioritizing loading of critical path content</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">10. Deployment</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you deploy this application to a live server?</h3>
                <p className="text-gray-700">
                  The deployment process would involve:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Building the application with production optimizations</li>
                  <li>Minification and bundling of assets</li>
                  <li>Implementing caching strategies for static assets</li>
                  <li>Setting up proper environment variables</li>
                  <li>Configuring proper CORS and CSP headers</li>
                  <li>Setting up monitoring and error logging</li>
                  <li>Implementing CDN for global content delivery</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What hosting service would you recommend, and why?</h3>
                <p className="text-gray-700">
                  For this application, suitable hosting options include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>Vercel or Netlify:</strong> Excellent for React SPAs with simple deployment workflows</li>
                  <li><strong>Firebase Hosting:</strong> Good integration with other Firebase services if needed later</li>
                  <li><strong>AWS Amplify:</strong> Scalable with easy integration to other AWS services</li>
                  <li><strong>GitHub Pages:</strong> Free and simple for static content deployment</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Vercel or Netlify would be particularly well-suited due to their seamless integration with React applications, built-in CI/CD, and global CDN.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How would you set up CI/CD pipelines for this project?</h3>
                <p className="text-gray-700">
                  A comprehensive CI/CD pipeline would include:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>GitHub Actions or GitLab CI for automated build processes</li>
                  <li>Automated testing on every pull request</li>
                  <li>TypeScript and linting checks to ensure code quality</li>
                  <li>Automated dependency vulnerability scanning</li>
                  <li>Staging environment deployments for review before production</li>
                  <li>Automated production deployments on main branch updates</li>
                  <li>Performance and accessibility testing as part of the pipeline</li>
                  <li>Post-deployment smoke tests to verify functionality</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">11. Learning Outcomes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What new skills or technologies were learned while building this project?</h3>
                <p className="text-gray-700">
                  Building this project provided experience with:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>React with TypeScript for type-safe development</li>
                  <li>Component-based architecture for reusable UI elements</li>
                  <li>Web Speech API for voice input</li>
                  <li>Local storage for client-side data persistence</li>
                  <li>Tailwind CSS for utility-first styling</li>
                  <li>shadcn/ui for accessible component development</li>
                  <li>State management patterns in React</li>
                  <li>Responsive design techniques</li>
                  <li>Form handling and validation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">If you were to rebuild this, what would you do differently?</h3>
                <p className="text-gray-700">
                  Potential improvements for a future version:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>Implement a proper backend with database storage</li>
                  <li>Use a state management library like Redux Toolkit or Zustand for complex state</li>
                  <li>Add comprehensive test coverage from the beginning</li>
                  <li>Implement collaborative editing capabilities</li>
                  <li>Add offline-first functionality with service workers</li>
                  <li>Create a more comprehensive tagging and categorization system</li>
                  <li>Implement advanced search with natural language processing</li>
                  <li>Add more AI-powered features for automatic organization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How does this project demonstrate your understanding of core web development concepts?</h3>
                <p className="text-gray-700">
                  This project demonstrates proficiency in:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li><strong>Modern JavaScript/TypeScript:</strong> Using current language features and type safety</li>
                  <li><strong>Component Architecture:</strong> Building reusable, modular UI components</li>
                  <li><strong>State Management:</strong> Handling complex application state</li>
                  <li><strong>Responsive Design:</strong> Creating layouts that work across devices</li>
                  <li><strong>Data Persistence:</strong> Implementing client-side storage solutions</li>
                  <li><strong>Form Handling:</strong> Creating intuitive user input experiences</li>
                  <li><strong>Routing:</strong> Implementing navigation between application views</li>
                  <li><strong>API Integration:</strong> Working with browser APIs and external services</li>
                  <li><strong>Performance Considerations:</strong> Optimizing for user experience</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-flipboard-purple border-b pb-2">12. Scenario-Based Solutions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">"A user reports that their notes disappear after closing the browser. How would you debug this?"</h3>
                <p className="text-gray-700">
                  To debug disappearing notes, I would:
                </p>
                <ol className="list-decimal pl-6 mt-2 text-gray-700">
                  <li>Verify localStorage is properly implemented for note persistence</li>
                  <li>Check if the user's browser has localStorage enabled or if they're in incognito mode</li>
                  <li>Examine the save routine to confirm notes are being properly serialized to JSON</li>
                  <li>Add logging to track when notes are saved and retrieved</li>
                  <li>Verify that localStorage isn't being cleared elsewhere in the code</li>
                  <li>Check for quota limits if the user has many large notes</li>
                  <li>Test in the user's specific browser and environment</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">"How would you add a dark mode feature to this application?"</h3>
                <p className="text-gray-700">
                  Implementing dark mode would involve:
                </p>
                <ol className="list-decimal pl-6 mt-2 text-gray-700">
                  <li>Adding a theme context/provider using React Context API</li>
                  <li>Creating a toggle component in the application header</li>
                  <li>Defining dark theme color variables in Tailwind configuration</li>
                  <li>Using Tailwind's dark mode utility classes with the "class" strategy</li>
                  <li>Storing user preference in localStorage</li>
                  <li>Adding system preference detection with matchMedia API</li>
                  <li>Ensuring sufficient contrast in all UI elements in both modes</li>
                  <li>Adding smooth transitions between themes</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">"Explain how you would implement undo/redo functionality for note edits."</h3>
                <p className="text-gray-700">
                  Implementing undo/redo functionality would require:
                </p>
                <ol className="list-decimal pl-6 mt-2 text-gray-700">
                  <li>Creating a command pattern to encapsulate state changes</li>
                  <li>Maintaining two stacks: one for undo operations and one for redo</li>
                  <li>Implementing a history manager service to track state changes</li>
                  <li>Capturing note state before each edit operation</li>
                  <li>Adding keyboard shortcuts (Ctrl+Z/Cmd+Z for undo, Ctrl+Y/Cmd+Y for redo)</li>
                  <li>Providing visual feedback for undo/redo actions</li>
                  <li>Implementing limits on history size to prevent memory issues</li>
                  <li>Clearing redo stack when a new edit is made after undoing</li>
                </ol>
              </div>
            </div>
          </section>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>Flipboard Notes Project Documentation • {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectQA;
