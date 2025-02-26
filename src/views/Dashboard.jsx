import React from 'react'
import Poll from '../components/poll';

export const Dashboard = () => {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum voluptatum sunt itaque quaerat cum iure architecto ea, beatae fugiat aliquid blanditiis maxime consequatur commodi quas, officia deserunt ad quia provident.
        </div>
      </header>
      <Poll />
    </div>
  )
}
export default Dashboard;