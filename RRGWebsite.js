import React from 'react';

const RRGWebsite = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="/api/placeholder/100/100" alt="RRG Logo" className="w-16 h-16" />
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-cyan-200">Home</a></li>
              <li><a href="#" className="hover:text-cyan-200">About</a></li>
              <li><a href="#" className="hover:text-cyan-200">Research</a></li>
              <li><a href="#" className="hover:text-cyan-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">R·R·G</h1>
          <h2 className="text-2xl mb-2">REVIVAL RESEARCH GROUP</h2>
          <p className="text-cyan-400 text-xl">Building an Archive for Exploring the Journey to Cryostasis Revival</p>
        </section>
        
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>We are committed to creating a comprehensive library of data mapping the entire journey to reversing "death". Our focus is on monitoring the evolving list of technologies, companies, and individuals critical to cryostasis revival. We're leveraging AI to organize this information into a 'tech tree', ensuring that we remain on track toward our ultimate goal.</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Latest Research</h3>
            <p>Explore our latest efforts in tracking cutting-edge developments in AI, nanotechnology, and life extension. Stay informed on the progress towards making cryostasis revival a reality.</p>
          </div>
        </section>
        
        <section className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-lg mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Get Involved</h3>
          <p>Whether you're an expert in AI, cryonics, or simply passionate about pushing the boundaries of human longevity, there's a place for you in our mission. Join our community and help us in our journey towards achieving immortality.</p>
        </section>
      </main>
      
      <footer className="mt-12 bg-gradient-to-r from-cyan-800 to-blue-800 p-4">
        <div className="container mx-auto text-center">
          <p>For all inquiries or to join our mailing list, email:</p>
          <p className="text-cyan-300 font-bold">admin@researchrevivalgroup.org</p>
          <p className="mt-2">Our Website: <a href="http://researchrevivalgroup.org" className="text-cyan-300 hover:underline">researchrevivalgroup.org</a></p>
        </div>
      </footer>
    </div>
  );
};

export default RRGWebsite;
