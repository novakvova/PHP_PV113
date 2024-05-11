// import './App.css'
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminLayout from "./components/containers/admin/AdminLayout.tsx";
import Login from "./pages/login";

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path="login" element={<Login />} />
                    {/*<Route path="users" element={<UsersTasks />} />*/}
                    {/*<Route path="tasks" element={<TasksPage />} />*/}
                </Route>
                {/*<Route path={"/news"} element={<NewsPage/>}/>*/}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default App
