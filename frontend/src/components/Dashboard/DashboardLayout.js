const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 md:w-1/5 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Meal Scheduler</h2>
        <nav>
          <ul className="space-y-6">
            <li>
              <Link to="/dashboard" className="hover:text-gray-300 transition-all duration-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/calendar" className="hover:text-gray-300 transition-all duration-300">Calendar</Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-gray-300 transition-all duration-300">Meals</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
};
