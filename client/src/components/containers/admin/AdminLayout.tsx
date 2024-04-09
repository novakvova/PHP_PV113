import Sidebar from "../../Sidebar.tsx";
import Footer from "../../Footer.tsx";
import {Outlet} from 'react-router-dom';

const AdminLayout = () => {
    return (
      <>
          <div className="flex min-h-screen flex-col font-body">
              <Sidebar />
              <div className="flex flex-grow flex-col justify-between px-6 md:ml-64">
                  <div className={"px-3 py-6"}>
                      <div className={"container max-w-full items-center md:pl-10 md:pr-8"}>
                        <Outlet/>
                      </div>
                  </div>
                  <Footer />
              </div>
          </div>
      </>
    );
}

export default AdminLayout;