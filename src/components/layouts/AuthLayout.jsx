import React from 'react';
import { LuBookOpen, LuClock4 } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f5f0] font-serif text-[#3b322c]">
      {/* Left Section */}
      <div className="w-full md:w-[60vw] px-12 pt-12 pb-12 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wider italic">TigerStudy</h1>
        <p className="text-sm text-[#6e625a] mb-6 italic">
          “Study without desire spoils the memory, and it retains nothing that it takes in.” – Leonardo da Vinci
        </p>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-[40vw] h-full bg-[#eae4dc] flex-col justify-center items-center border-l border-[#d8cfc4]">
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-[#d5c8bb] w-72">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-[#cab89f] rounded-full flex items-center justify-center text-white text-2xl shadow-inner">
              <LuBookOpen />
            </div>
          </div>
          <h3 className="text-center text-lg font-semibold text-[#4b413a]">Track Your Progress</h3>
          <p className="text-xs text-center text-[#7a6e66] mt-1">
            Join other students optimizing their study hours with TigerStudy.
          </p>
        </div>
        <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-[#d9cfc2] w-72 mt-4">
          <div className="flex items-center gap-3 mb-2">
            <LuClock4 className="text-[#a58e78]" />
            <span className="text-sm font-medium">Log Study Time</span>
          </div>
          <p className="text-xs text-[#6e5c53] pl-7">
            Track how long and where you study to build smart habits.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;