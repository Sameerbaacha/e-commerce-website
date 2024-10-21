import { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Mycontext } from '../../../context/data/Mycontext';
import DashboardTab from './DashboardTab';

function Dashboard() {
    const context = useContext(Mycontext);
    const { mode } = context;

    return (
        <div>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'text-black'}`}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>10</h2>
                                <p className={`text-yellow-600 font-bold ${mode === 'dark' ? 'text-white' : ''}`}>Total Products</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'text-black'}`}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>10</h2>
                                <p className={`text-yellow-600 font-bold ${mode === 'dark' ? 'text-white' : ''}`}>Total Orders</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'text-black'}`}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>20</h2>
                                <p className={`text-yellow-600 font-bold ${mode === 'dark' ? 'text-white' : ''}`}>Total Users</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'text-black'}`}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>20</h2>
                                <p className={`text-yellow-600 font-bold ${mode === 'dark' ? 'text-white' : ''}`}>Total Products</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </div>
    );
}

export default Dashboard;
