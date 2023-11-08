import {createBrowserRouter} from 'react-router-dom'
import MainWebsite from '../layout/MainWebsite';
import Home from '../pages/Home';
import AddBlog from '../pages/AddBlog';
import AllBlog from '../pages/AllBlog';
import FeaturedBlogs from '../pages/FeaturedBlogs';
import MyWishlist from '../pages/MyWishlist';
import Error from '../pages/Error';
import ViewBlogDetails from '../pages/ViewBlogDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainWebsite />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/add-blog',
                element:  <PrivateRoute><AddBlog /></PrivateRoute>
            },
            {
                path: "/all-blogs",
                element: <AllBlog />,
                loader: ()=> fetch('https://daily-blog-server.vercel.app/totalBlogs')
            },
            {
                path: "/featured-blogs",
                element: <FeaturedBlogs />
            },
            {
                path: "/my-wishlist",
                element:  <PrivateRoute><MyWishlist /></PrivateRoute>
            },
            {
                path: "/view-blog-details/:id",
                element: <PrivateRoute><ViewBlogDetails /></PrivateRoute>
            }
        ]
    },
    {
        path: "/*",
        element: <Error />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])
export default router;