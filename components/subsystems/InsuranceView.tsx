
import React from 'react';
import { ChevronLeft, ShieldCheck, TrendingUp, FileText, Check, AlertCircle } from 'lucide-react';
import { INSURANCE_DETAILS } from '../../constants';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface InsuranceViewProps {
  onBack: () => void;
}

const InsuranceView: React.FC<InsuranceViewProps> = ({ onBack }) => {
  const { policy, projectedAnnualSavings, currentDiscount, savingsHistory } = INSURANCE_DETAILS;

  return (
    <div className="min-h-screen bg-ios-bg pb-24 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-ios-blue flex items-center active:opacity-50">
          <ChevronLeft size={24} />
          <span className="font-medium text-lg">Home</span>
        </button>
        <h1 className="font-bold text-lg text-black absolute left-1/2 transform -translate-x-1/2">Smart Insurance</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center space-x-2 mb-2 opacity-80">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Dynamic Pricing Active</span>
               </div>
               <h2 className="text-3xl font-bold mb-1">{currentDiscount}% Discount</h2>
               <p className="text-sm opacity-90">Projected Annual Savings: <span className="font-bold text-yellow-300">${projectedAnnualSavings} HKD</span></p>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>

        {/* Savings Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 mb-4 flex items-center">
             <TrendingUp size={18} className="mr-2 text-green-500" /> Savings Trend
           </h3>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={savingsHistory}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip 
                       contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                       formatter={(value: number) => [`$${value}`, 'Savings']}
                    />
                    <Area type="monotone" dataKey="savedAmount" stroke="#34C759" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={3} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Policy Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center">
                 <FileText size={20} className="mr-2 text-gray-500" /> My Policy
              </h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Active</span>
           </div>
           
           <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                 <span className="text-gray-500">Policy Number</span>
                 <span className="font-mono font-medium text-gray-900">{policy.policyNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                 <span className="text-gray-500">Provider</span>
                 <span className="font-medium text-gray-900">{policy.provider}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                 <span className="text-gray-500">Renewal Date</span>
                 <span className="font-medium text-gray-900">{policy.renewalDate}</span>
              </div>
           </div>
           
           <button className="w-full mt-5 bg-gray-50 text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
              View Full Contract
           </button>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
           <AlertCircle size={18} className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
           <p className="text-xs text-yellow-800 leading-relaxed">
             <strong>Note:</strong> Your Safety Score is updated daily based on driving behavior, but your Insurance Premium Discount is recalculated and applied on the 1st of every month.
           </p>
        </div>

      </div>
    </div>
  );
};

export default InsuranceView;
