const ProfilePage = () => {
    return (
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-900 text-white p-4">
          <h2>Profile</h2>
          <ul>
            <li>Personal Info</li>
            <li>Meal History</li>
          </ul>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1>My Profile</h1>
          <p>Update your details, preferences, and meal history.</p>
        </main>
      </div>
    );
  };
  