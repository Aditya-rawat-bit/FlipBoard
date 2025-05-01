
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  subjectId?: string;
  createdAt: string;
  updatedAt: string;
  todos?: Todo[];
}

export const downloadNotePdf = (note: Note, subjectTitle?: string) => {
  // Initialize jsPDF
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: note.title,
    subject: subjectTitle || 'Flipboard Note',
    author: 'Flipboard App',
    creator: 'Flipboard App'
  });
  
  // Add title
  doc.setFontSize(24);
  doc.setTextColor(88, 28, 135); // Purple color
  doc.text(note.title, 20, 20);
  
  // Add metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100); // Gray color
  if (subjectTitle) {
    doc.text(`Subject: ${subjectTitle}`, 20, 30);
  }
  doc.text(`Last updated: ${formatDate(note.updatedAt)}`, 20, subjectTitle ? 36 : 30);
  
  // Add content
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Black color
  
  // Process content
  const contentLines = note.content.split('\n');
  let yPosition = subjectTitle ? 46 : 40;
  
  contentLines.forEach((line) => {
    // Check if line is an image
    if (line.startsWith('![image]')) {
      const imageUrl = line.match(/\((.*?)\)/)?.[1];
      if (imageUrl) {
        try {
          // Add some space before the image
          yPosition += 10;
          
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          // Add image to PDF (with fixed dimensions)
          doc.addImage(imageUrl, 'JPEG', 20, yPosition, 160, 80);
          yPosition += 90; // Move position after image
        } catch (e) {
          console.error('Error adding image to PDF:', e);
          doc.text('(Image could not be loaded)', 20, yPosition);
          yPosition += 10;
        }
      }
    } else if (line.trim() !== '') {
      // Check if we need a new page
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Split line into chunks that fit the page width
      const textLines = doc.splitTextToSize(line, 170);
      doc.text(textLines, 20, yPosition);
      yPosition += 6 * textLines.length;
    } else {
      // Empty line
      yPosition += 4;
    }
  });
  
  // Add todos if they exist
  if (note.todos && note.todos.length > 0) {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    } else {
      yPosition += 10;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(88, 28, 135); // Purple color
    doc.text('Tasks', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Create todo table
    const todoData = note.todos.map(todo => [
      todo.isCompleted ? '☑' : '☐',
      todo.text
    ]);
    
    (doc as any).autoTable({
      startY: yPosition,
      head: [['Status', 'Task']],
      body: todoData,
      theme: 'grid',
      headStyles: {
        fillColor: [226, 217, 245], // Light purple
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 'auto' }
      }
    });
  }
  
  // Download PDF
  doc.save(`${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
