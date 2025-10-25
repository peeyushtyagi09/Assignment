import React, { useState } from 'react'

const navContent = {
  "About Me": {
    paragraph1: `Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome company for 3 years now.`,
    paragraph2: `I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM.`
  },

  "Experiences": {
    paragraph1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro maiores aliquid molestias reprehenderit obcaecati natus?`,
    paragraph2: `Minus quam architecto dolorum dolore nam! Iusto, quam quasi illum molestias laudantium animi. Voluptatum, dicta.`
  },

  "Recommended": {
    paragraph1: `Recommended reads and courses:`,
    paragraph2: `- "Salesforce Advanced CRM Tactics"
- "Harvard Selling Essentials"
- "Closing Bigger Deals" by Keith Rosen`
  }
};

const galleryImages = [
  [
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714491/QmZSc8gYXn5zQ8Bu1S9ouaPLqzVkEJBVc5J2a2BkNp31t4_xfco2k.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714449/Qmd1M7FM9mMSxQXMRNfmitBjUZk4AFqBHsjkxrWu1c3xUq_dt3p7l.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714427/QmXR1Jrsk2c6F4HRr9XUtZJL2bxQCoH8iu35dGrWYDbnRv_xzmhgf.avif'
  ],
  [
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714491/QmZSc8gYXn5zQ8Bu1S9ouaPLqzVkEJBVc5J2a2BkNp31t4_xfco2k.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714449/Qmd1M7FM9mMSxQXMRNfmitBjUZk4AFqBHsjkxrWu1c3xUq_dt3p7l.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714427/QmXR1Jrsk2c6F4HRr9XUtZJL2bxQCoH8iu35dGrWYDbnRv_xzmhgf.avif'
  ],
  [
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714491/QmZSc8gYXn5zQ8Bu1S9ouaPLqzVkEJBVc5J2a2BkNp31t4_xfco2k.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714449/Qmd1M7FM9mMSxQXMRNfmitBjUZk4AFqBHsjkxrWu1c3xUq_dt3p7l.avif',
    'https://res.cloudinary.com/djlcf4ix9/image/upload/v1756714427/QmXR1Jrsk2c6F4HRr9XUtZJL2bxQCoH8iu35dGrWYDbnRv_xzmhgf.avif'
  ]
];

const App = () => {
  const [activeTab, setActiveTab] = useState('About Me')
  const [currentImageSet, setCurrentImageSet] = useState(0);

  const handlePrevious = () => {
    setCurrentImageSet((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageSet((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className='h-screen w-screen bg-gray-800 justify-center flex items-center overflow-hidden'>
      <div className='h-[95%] w-[95%]  rounded-4xl justify-around flex items-center'>
        <div className='left h-[95%] w-[40%] bg-gray-700 rounded-4xl hidden lg:flex'>

        </div>
        <div className='right h-[95%] lg:w-[55%] w-[95%] bg-gray-700 rounded-4xl justify-around flex flex-col items-center'>
          <div className='up h-[47%] w-[95%] bg-gray-700 rounded-4xl justify-around flex flex-col items-center'>
          <div className='nav h-[20%] min-h-[50px] w-full bg-black rounded-xl sm:rounded-2xl flex justify-around items-center relative p-1 sm:p-2'>
                {/* Sliding Background Indicator */}
                <div 
                  className='absolute h-[80%] bg-gray-700 rounded-xl transition-all duration-500 ease-in-out'
                  style={{
                    width: `${100 / Object.keys(navContent).length}%`,
                    left: `${(Object.keys(navContent).indexOf(activeTab) * 95) / Object.keys(navContent).length}%`,
                    transform: 'translateX(4%)',
                  }}
                />
                
                {/* Navigation Buttons */}
                {Object.keys(navContent).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)} 
                    className={`
                      relative z-10
                      px-3 sm:px-4 md:px-6 lg:px-8
                      py-2 sm:py-2.5 md:py-3
                      text-xs sm:text-sm md:text-base lg:text-lg
                      font-medium
                      ${activeTab === tab ? 'text-white' : 'text-gray-400'}
                      rounded-xl
                      hover:text-white hover:scale-105
                      active:scale-110
                      transition-all duration-300
                      whitespace-nowrap
                      texts-center
                      justify-center
                      flex
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            <div className='up-contant h-[70%] w-[97%] bg-gray-600  rounded-4xl  text-[2rem] font-semibold font-serif text-gray-700 overflow-hidden'>
            <div  style={{ padding: window.innerWidth < 640 ? '8px':
                                    window.innerWidth < 768 ? '12px':
                                    window.innerWidth < 1024 ? '16px': '20px'
                        }}key={activeTab} className='animate-fadeIn'>
                <p style={{ marginBottom: '12px', paddingTop: '8px'}} className='text-xs sm:text-sm md:text-base lg:text-md leading-relaxed text-gray-800'>
                  {navContent[activeTab]?.paragraph1 || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit a tempore id doloremque esse fugiat at molestiae mollitia perferendis laborum sapiente, ullam dolorum enim ipsa exercitationem nesciunt delectus ex eos.'}
                </p>
                <p className='text-xs sm:text-sm md:text-base lg:text-md leading-relaxed text-gray-800'>
                  {navContent[activeTab]?.paragraph2 || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit a tempore id doloremque esse fugiat at molestiae mollitia perferendis laborum sapiente, ullam dolorum enim ipsa exercitationem nesciunt delectus ex eos.'}
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px', paddingBottom: '4px'}} className='bottom h-[48%] w-[95%] bg-gray-700 rounded-4xl justify-between flex flex-col'>
          <div className='bottomtop flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[17%] min-h-[60px] rounded-2xl' style={{ gap: '12px' }}>
                {/* Gallery Title */}
                <div 
                  style={{ padding: '10px 25px' }}  
                  className='bottomtop_left w-fit text-base sm:text-lg md:text-xl lg:text-[1.3rem] text-white bg-black rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300 '
                >
                  Gallery
                </div>
                
                {/* Action Buttons */}
                <div className='flex flex-row flex-wrap sm:flex-nowrap w-full sm:w-auto justify-start sm:justify-end' style={{ gap: '10px' }}> 
                  {/* Add Image Button */}
                  <button 
                    style={{ padding: '10px 20px' }} 
                    className='w-fit text-sm sm:text-base md:text-lg lg:text-[1.3rem] text-white bg-black rounded-xl sm:rounded-2xl font-medium shadow-lg hover:bg-gray-800  active:scale-80 transition-all duration-300 flex items-center'
                  >
                    <svg className='w-4 h-4 sm:w-5 sm:h-5' style={{ marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    ADD Image
                  </button>
                  
                  {/* Left Arrow Button */}
                  <button 
                   onClick={handlePrevious}
                    style={{ padding: '10px 15px' }} 
                    className='w-fit text-sm sm:text-base md:text-lg lg:text-[1.3rem] text-white bg-black rounded-xl sm:rounded-2xl font-medium shadow-lg hover:bg-gray-800  active:scale-80 transition-all duration-300 flex items-center justify-center'
                    aria-label="Previous"
                  >
                    <svg className='w-5 h-5 sm:w-6 sm:h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Right Arrow Button */}
                  <button 
                   onClick={handleNext}
                    style={{ padding: '10px 15px' }} 
                    className='w-fit text-sm sm:text-base md:text-lg lg:text-[1.3rem] text-white bg-black rounded-xl sm:rounded-2xl font-medium shadow-lg hover:bg-gray-800  active:scale-80 transition-all duration-300 flex items-center justify-center'
                    aria-label="Next"
                  >
                    <svg className='w-5 h-5 sm:w-6 sm:h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='bottomdown h-[75%] bg-gray-600 rounded-3xl overflow-hidden  ' style={{ padding: '16px', paddingTop: '10px', }}>
              
              <div className='w-full h-[85%] flex items-center justify-center  overflow-hidden' style={{ gap: '12px', paddingTop: '8px' }}>
                {galleryImages[currentImageSet].map((image, index) => (
                  <div 
                    key={`${currentImageSet}-${index}`}
                    className='relative h-full flex-1 bg-gray-700 rounded-2xl  shadow-xl hover:scale-110 hover:rotate-10   transition-all duration-500 ease-in-out group cursor-pointer gallery-image-animate overflow-hidden'
                    style={{ 
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <img  
                      src={image} 
                      alt={`Gallery ${currentImageSet + 1}-${index + 1}`}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0  transition-all duration-500"
                      onError={(e) => {
                        console.error(`Image ${index} failed to load:`, image);
                        e.target.src = 'https://via.placeholder.com/400x300/444/fff?text=Image+Not+Found';
                      }}
                    />
                    {/* Overlay on hover */}
                    {/* <div className='absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center'>
                      <svg 
                        className='w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100' 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div> */}
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className='flex  justify-center items-center ' style={{ marginTop: '24px', gap: '8px', marginBottom: '10px',  }}> 
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageSet(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentImageSet === index ? 'w-10 bg-white' : 'w-3 bg-gray-400 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    style={{ 
                      boxShadow: currentImageSet === index ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
