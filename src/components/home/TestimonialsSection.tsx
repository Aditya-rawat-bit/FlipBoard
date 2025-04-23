
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Flipboard has transformed how I prepare for exams. The AI features help me understand complex topics quickly!",
      author: "Sarah L.",
      role: "Computer Science Student"
    },
    {
      quote: "I use Flipboard daily to organize my research. The subject categorization has been a game-changer for me.",
      author: "Michael T.",
      role: "Ph.D. Candidate"
    },
    {
      quote: "The ability to export notes as PDFs makes sharing lecture notes with classmates incredibly easy.",
      author: "Alex K.",
      role: "Medical Student"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students and professionals who love using Flipboard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover-lift"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
