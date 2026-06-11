
const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#101011]">

            <div className=" p-4 sm:ml-64">
                {children}
            </div>

        </div>
    );
};

export default DashboardLayout;