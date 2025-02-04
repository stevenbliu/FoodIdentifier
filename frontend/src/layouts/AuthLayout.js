const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;
  