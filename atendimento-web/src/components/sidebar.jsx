import React from 'react';
import { MessageSquare, Users, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-16 bg-slate-900 h-full flex flex-col justify-between items-center py-6">
            <div className="flex flex-col gap-8">
                {/* Logo da INFORCHAT */}
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">
                    IC
                </div>

                <nav className="flex flex-col gap-4">
                    <MenuIcon icon={<MessageSquare size={20} />} active />
                    <MenuIcon icon={<Users size={20} />} />
                    <MenuIcon icon={<BarChart3 size={20} />} />
                </nav>
            </div>

            <Settings className="text-slate-400 hover:text-white cursor-pointer" />
        </aside>
    );
};

const MenuIcon = ({ icon, active }) => (
    <div className={`p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}>
        {icon}
    </div>
);

export default Sidebar;