import { useState, useEffect } from 'react';

const SLIDES = [
  { text: 'Flat 10% off on 3 or more canvas paintings', highlight: '10% off' },
  { text: 'Free Delivery Pan India on all original artworks', highlight: 'Free Delivery' },
  { text: 'Global Shipping Available — We deliver worldwide', highlight: 'Global Shipping' },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="announcement-bar">
      <div
        key={current}
        style={{ animation: 'fadeIn 0.5s ease' }}
      >
        {slide.text.split(slide.highlight).map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <span>{slide.highlight}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
