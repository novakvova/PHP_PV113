import './App.css'
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const App = () => {

  return (
    <>
        <div className="font-body">
            <Sidebar />
            <div className="md:ml-64">
                <Routes>
                    <Route path="/">
                        <Route index element={<CategoryListPage />} />
                        {/*<Route path="users" element={<UsersTasks />} />*/}
                        {/*<Route path="tasks" element={<TasksPage />} />*/}
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </div>
    </>
  )
}

export default App
