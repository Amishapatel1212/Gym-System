'use client';

import React, { useState } from 'react';

export default function Chart({ data, title }) {
  const [dataType, setDataType] = useState('members');

  const maxValue = Math.max(...data.map(d => d[dataType]));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setDataType('members')}
            className={`px-3 py-1 rounded text-sm transition ${
              dataType === 'members'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setDataType('revenue')}
            className={`px-3 py-1 rounded text-sm transition ${
              dataType === 'revenue'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between h-64 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group">
            <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition cursor-pointer relative"
              style={{ height: `${(item[dataType] / maxValue) * 100}%` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {item[dataType]}
              </div>
            </div>
            <p className="text-sm font-semibold mt-2">{item.month}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
