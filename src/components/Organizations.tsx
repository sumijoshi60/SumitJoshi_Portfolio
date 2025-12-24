import React, { useEffect, useRef } from 'react';

export const Organizations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // List of organizations extracted from the projects
  const organizations = [
    {
      "name": "Asian Development Bank",
      "logo": "https://www.adb.org/themes/custom/adb_2022/img/adb.svg",
      "alt": "Asian Development Bank logo"
    },
    {
      "name": "Foundation for Development Management",
      "logo": "https://static.wixstatic.com/media/7cea5b_b1bb132194e14f24a0cbc6c0b2fd95b4~mv2.png/v1/fill/w_142,h_92,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/FDMlogo.png",
      "alt": "Foundation for Development Management logo"
    },
    {
      "name": "STAAR Facility",
      "logo": "https://media.licdn.com/dms/image/v2/C560BAQH2n3XO8xefPg/company-logo_200_200/company-logo_200_200/0/1660750172251/staar_facility_logo?e=2147483647&v=beta&t=JUoHOlT9v2Cv5fw5Ye2UYUb1-s-ZXmIkwNgcu3tl1cM",
      "alt": "STAAR Facility logo"
    },
    {
      "name": "ICIMOD",
      "logo": "https://www.icimod.org/wp-content/uploads/2019/11/logo.svg",
      "alt": "International Centre for Integrated Mountain Development logo"
    },
    {
      "name": "UNICEF",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/UNICEF_Logo.png/1200px-UNICEF_Logo.png",
      "alt": "UNICEF logo"
    },
    {
      "name": "Save the Children",
      "logo": "https://www.savethechildren.net/themes/custom/sci_theme/images/sci-logo.svg",
      "alt": "Save the Children logo"
    }
  ];

  // Automatic scrolling animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!scrollContainer) return;

      const scrollWidth = scrollContainer.scrollWidth / 2; // Half because we duplicated the content
      const clientWidth = scrollContainer.clientWidth;

      // When we reach the halfway point (end of first set), reset to beginning
      if (scrollPosition >= scrollWidth) {
        // Jump back to start without animation
        scrollContainer.scrollLeft = 0;
        scrollPosition = 0;
      } else {
        scrollPosition += 0.7; // Adjust scroll speed
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start scrolling after a delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 1500);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-12 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Organizations worked with
          </h2>
        </div>

        <div className="relative overflow-hidden">
          {/* Left fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-stone-50 to-transparent"></div>

          {/* Right fade effect */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-stone-50 to-transparent"></div>

          {/* Scrolling container */}
          <div
            ref={scrollRef}
            className="flex gap-10 py-6 overflow-x-auto scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none', /* IE and Edge */
              scrollbarWidth: 'none', /* Firefox */
            }}
          >
            {/* Double the logos for infinite scroll effect */}
            {[...organizations, ...organizations].map((org, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-sm h-24 w-40 flex items-center justify-center">
                  <img
                    src={org.logo}
                    alt={org.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="mt-2 text-sm text-stone-600 font-medium">{org.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}; 
