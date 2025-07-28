
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const ProfilePage: React.FC = () => {
  const { user, logout, getTranslation } = useAppContext();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="p-4">
      <div className="text-center pt-8 pb-6">
        <img src={user.avatar} alt="User Avatar" className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-primary-DEFAULT" />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark capitalize">{user.role}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">{getTranslation('parentalControls')}</h3>
          <div className="flex justify-between items-center">
            <span>Enable Restrictions</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-DEFAULT"></div>
            </label>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full bg-secondary-DEFAULT text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-dark transition-colors duration-300"
        >
          {getTranslation('logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
